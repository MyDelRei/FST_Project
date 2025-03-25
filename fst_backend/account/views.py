from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer, TransactionSerializer
from .models import Transaction, Balance, User, Loan,Saving,UserState
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Sum
from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404
from decimal import Decimal
from django.http import JsonResponse
import json
from django.utils import timezone
from django.db.models import Sum
from datetime import datetime, timedelta
import calendar



class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')

        # Validate input
        if not all([username, email, password, confirm_password]):
            return Response(
                {"error": "All fields are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if password != confirm_password:
            return Response(
                {"error": "Passwords do not match"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if username already exists
        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username is already taken"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Create the user
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return Response(
                {"message": "Signup successful", "token": access_token},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return Response(
                {"message": "Login successful", "token": access_token},
                status=status.HTTP_200_OK
            )
        
        return Response(
            {"message": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )


class TransactionCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        description = request.data['description']
        type = request.data['type']
        amount = request.data['amount']
        status = request.data['status']
        
        transaction = Transaction.objects.create(
            user=user,
            description=description,
            type=type,
            amount=amount,
            status=status
        )
        balance, created = Balance.objects.get_or_create(user=user)

        if type == "Income" and status == "Completed":
            balance.balance_amount += amount
        elif type == "Spending" and status == "Completed":
            balance.balance_amount -= amount
        
        balance.save()

        return Response({'message': 'Transaction created successfully', 'transaction': transaction.id})


class TransactionUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            transaction = Transaction.objects.get(id=pk, user=request.user)
        except Transaction.DoesNotExist:
            return Response({'detail': 'Transaction not found'}, status=status.HTTP_404_NOT_FOUND)

        # Fetch the old transaction details
        old_amount = Decimal(transaction.amount)
        old_type = transaction.type  # 'income' or 'spending'
        old_status = transaction.status  # 'pending', 'completed', 'failed'

        # Update fields with new data from the request, or keep old if not provided
        description = request.data.get('description', transaction.description)
        type = request.data.get('type', transaction.type)
        amount = request.data.get('amount', transaction.amount)
        status = request.data.get('status', transaction.status)

        # Convert the new amount to Decimal
        new_amount = Decimal(amount) if amount else old_amount
        
        # Save the updated transaction
        transaction.description = description
        transaction.type = type
        transaction.amount = new_amount
        transaction.status = status
        transaction.save()

        # Fetch the balance associated with the user
        balance = Balance.objects.get(user=transaction.user)

        # Reverse the previous transaction effect (only if it was 'completed')
        if old_status == "completed":
            if old_type == "income":
                # Previously added to balance, so subtract it now
                balance.balance_amount -= old_amount
            elif old_type == "spending":
                # Previously subtracted from balance, so add it back now
                balance.balance_amount += old_amount

        # Apply the new transaction effect (only if the status is 'completed')
        if status == "completed":  # Match model's lowercase
            if type == "income":
                # Add income to balance
                balance.balance_amount += new_amount
            elif type == "spending":
                # Subtract spending from balance
                balance.balance_amount -= new_amount

        # Save the updated balance
        balance.save()

        return Response({'message': 'Transaction updated successfully', 'transaction': TransactionSerializer(transaction).data})
    

class TransactionDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            # Fetch the transaction using the provided pk
            transaction = Transaction.objects.get(id=pk, user=request.user)

            balance = Balance.objects.get(user=transaction.user)

            if transaction.type == "Income" and transaction.status == "Completed":
                balance.balance_amount -= transaction.amount
            elif transaction.type == "Spending" and transaction.status == "Completed":
                balance.balance_amount += transaction.amount
            # Delete the transaction
            transaction.delete()

            balance.save()

            # Return a success message
            return Response({'message': 'Transaction deleted successfully'}, status=status.HTTP_200_OK)

        except Transaction.DoesNotExist:
            return Response({'error': 'Transaction not found or not authorized'}, status=status.HTTP_404_NOT_FOUND)

class TransactionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        transactions = Transaction.objects.filter(user=request.user).order_by('-date')
        transaction_data = [
            {
                'id': trans.id,
                'description': trans.description,
                'type': trans.type,
                'amount': str(trans.amount),
                'date': trans.date.strftime('%Y-%m-%d %H:%M:%S'),
                'status': trans.status,
            }
            for trans in transactions
        ]
        return JsonResponse(transaction_data, safe=False)
    
class TransactionStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the start of the current week (Monday)
        today = timezone.now().date()  # Current date (e.g., March 24, 2025)
        start_of_week = today - timedelta(days=today.weekday())  # Monday of this week
        end_of_week = start_of_week + timedelta(days=6)  # Sunday of this week

        # Array to store daily spending totals (Mon to Sun)
        weekly_spending = []
        days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

        # Calculate spending for each day
        for i in range(7):
            day_start = start_of_week + timedelta(days=i)
            day_end = day_start + timedelta(days=1) - timedelta(seconds=1)  # End of day
            total_spending = Transaction.objects.filter(
                user=request.user,
                type='spending',
                date__gte=day_start,
                date__lte=day_end,
                status='completed'
            ).aggregate(
                total=Sum('amount')
            )['total'] or 0.00
            weekly_spending.append(float(total_spending))  # Convert Decimal to float for JSON

        return JsonResponse({
            'weekly_spending': weekly_spending,
            'days': days,
        })

# account/views.py
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    total_expense = Transaction.objects.filter(user=user, type='spending').aggregate(total=Sum('amount'))['total'] or 0.00
    
    data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'picture': user.get_picture_path(),  # e.g., 'profile_pics/dima-kapralov-_SbVzarnLxE-unsplash.jpg'
        'total_expense': float(total_expense),
        'balance': float(user.balance.balance_amount) if hasattr(user, 'balance') else 0.00
    }
    print('User picture path:', data['picture'])
    return Response(data)

class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            username = request.data.get('username')
            email = request.data.get('email')
            balance_amount = request.data.get('balance_amount')
            picture = request.FILES.get('picture')
            
            if username:
                user.username = username
            if email:
                user.email = email
            if picture:
                if user.picture:
                    default_storage.delete(user.picture.path)
                user.picture = picture
            user.save()
            
            if balance_amount is not None:
                try:
                    balance, created = Balance.objects.get_or_create(user=user)
                    balance.balance_amount = float(balance_amount)
                    balance.save()
                except (ValueError, TypeError):
                    return Response(
                        {'error': 'Invalid balance amount'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            # Use full URL for picture
            picture_url = request.build_absolute_uri(user.picture.url) if user.picture else None
            
            response_data = {
                'username': user.username,
                'email': user.email,
                'picture': picture_url,
                'balance': float(user.balance.balance_amount) if hasattr(user, 'balance') else 0.00
            }
            
            return Response(
                {'message': 'Profile updated successfully', 'user': response_data},
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class LoanCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Extract data from the request
        data = request.data
        
        # Prepare loan data
        loan_data = {
            'user': request.user,  # Assign authenticated user directly
            'amount': Decimal(data.get('amount')),
            'interest_rate': Decimal(data.get('interest_rate', '0.00')),
            'loan_type': data.get('loan_type', 'personal'),
            'status': 'pending',  # Always pending on creation
            'due_date': data.get('due_date') or None,
        }

        # Create a new loan instance
        try:
            loan = Loan.objects.create(**loan_data)
            return Response(
                {'message': 'Loan created successfully', 'loan': {
                    'id': loan.id,
                    'amount': str(loan.amount),
                    'interest_rate': str(loan.interest_rate),
                    'loan_type': loan.loan_type,
                    'status': loan.status,
                    'due_date': loan.due_date,
                }},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {'message': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        
class ActiveLoanListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get active loans for the authenticated user
        active_loans =  Loan.objects.filter(user=request.user)


        # Prepare the data to return
        loan_data = []
        for loan in active_loans:
            loan_data.append({
                'id': loan.id,
                'user': loan.user.username,  # or loan.user.id if you prefer
                'amount': str(loan.amount),
                'interest_rate': str(loan.interest_rate),
                'loan_type': loan.get_loan_type_display(),  # Display the human-readable loan type
                'status': loan.get_status_display(),  # Display the human-readable loan status
                'due_date': loan.due_date.strftime('%Y-%m-%d') if loan.due_date else None,
            })

        # Return the data as JSON
        return JsonResponse(loan_data, safe=False)




class LoanUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, loan_id):  # Changed to PUT to match frontend axios.put
        try:
            # Fetch the loan for the authenticated user
            loan = Loan.objects.get(id=loan_id, user=request.user)
        except Loan.DoesNotExist:
            return JsonResponse(
                {'message': 'Loan not found or you do not have permission to update it'},
                status=404
            )

        # Parse the request data
        try:
            data = json.loads(request.body) if request.body else {}
        except json.JSONDecodeError:
            return JsonResponse(
                {'message': 'Invalid JSON data'},
                status=400
            )

        # Get repayment amount from request
        repayment_amount_str = data.get('repayment_amount')
        if not repayment_amount_str:
            return JsonResponse(
                {'message': 'Repayment amount is required'},
                status=400
            )

        try:
            repayment_amount = Decimal(repayment_amount_str)
            if repayment_amount <= 0:
                raise ValueError("Repayment amount must be positive")
        except (ValueError, TypeError):
            return JsonResponse(
                {'message': 'Invalid repayment amount'},
                status=400
            )

        # Fetch or create user's balance
        balance, created = Balance.objects.get_or_create(user=request.user, defaults={'balance_amount': Decimal('0.00')})

        # Check if balance is sufficient
        if balance.balance_amount < repayment_amount:
            return JsonResponse(
                {'message': 'Insufficient balance for repayment'},
                status=400
            )

        # Deduct repayment amount from balance
        balance.balance_amount -= repayment_amount
        balance.save()

        # Reduce loan amount
        if repayment_amount > loan.amount:
            return JsonResponse(
                {'message': 'Repayment amount exceeds remaining loan balance'},
                status=400
            )
        
        loan.amount -= repayment_amount
        
        # Update loan status: 'active' on repayment, 'repaid' if fully paid
        if loan.amount <= 0:
            loan.amount = Decimal('0.00')
            loan.status = 'repaid'
        else:
            loan.status = 'active'  # Set to 'active' when repayment is made

        # Update other fields if provided
        if 'interest_rate' in data:
            try:
                loan.interest_rate = Decimal(data['interest_rate'])
            except (ValueError, TypeError):
                return JsonResponse({'message': 'Invalid interest_rate value'}, status=400)
        if 'loan_type' in data:
            loan.loan_type = data['loan_type']
        if 'status' in data and loan.amount > 0:  # Only allow manual status change if not fully repaid
            loan.status = data['status']
        if 'due_date' in data:
            loan.due_date = data['due_date'] or None

        # Save the updated loan
        loan.save()

        # Create a transaction for the repayment with type 'loans'
        transaction = Transaction.objects.create(
            user=request.user,
            description=f"Repayment for Loan #{loan.id}",
            type='loans',
            amount=repayment_amount,
            status='completed',
            date=timezone.now()
        )

        # Prepare response
        response_data = {
            'message': 'Loan repayment processed successfully',
            'loan': {
                'id': loan.id,
                'amount': str(loan.amount),
                'interest_rate': str(loan.interest_rate),
                'loan_type': loan.loan_type,
                'status': loan.status,
                'due_date': loan.due_date.strftime('%Y-%m-%d') if loan.due_date else None,
            },
            'balance': str(balance.balance_amount),
            'transaction': {
                'id': transaction.id,
                'description': transaction.description,
                'type': transaction.type,
                'amount': str(transaction.amount),
                'status': transaction.status,
                'date': transaction.date.strftime('%Y-%m-%d %H:%M:%S'),
            }
        }

        return JsonResponse(response_data, status=200)
    

class SavingCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = json.loads(request.body) if request.body else {}
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)

        reason = data.get('reason')
        goal_str = data.get('goal')
        amount_str = data.get('amount', '0.00')  # Default to 0.00 if not provided

        if not all([reason, goal_str]):
            return JsonResponse({'message': 'Reason and goal are required'}, status=400)

        try:
            goal = Decimal(goal_str)
            amount = Decimal(amount_str)
            if goal <= 0:
                raise ValueError("Goal must be positive")
            if amount < 0:
                raise ValueError("Amount cannot be negative")
        except (ValueError, TypeError):
            return JsonResponse({'message': 'Invalid goal or amount'}, status=400)

        saving = Saving.objects.create(
            user=request.user,
            reason=reason,
            goal=goal,
            amount=amount  # Progress starts at 0.00 or user-provided value
        )

        return JsonResponse(
            {
                'message': 'Saving goal created successfully',
                'saving': {
                    'id': saving.id,
                    'reason': saving.reason,
                    'goal': str(saving.goal),
                    'amount': str(saving.amount),
                    'created_at': saving.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                }
            },
            status=201
        )
    
class SavingListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        savings = Saving.objects.filter(user=request.user)
        saving_data = [
            {
                'id': saving.id,
                'reason': saving.reason,
                'goal': str(saving.goal),
                'amount': str(saving.amount),
                'created_at': saving.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            }
            for saving in savings
        ]
        return JsonResponse(saving_data, safe=False)
    
class SavingUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, saving_id):
        try:
            saving = Saving.objects.get(id=saving_id, user=request.user)
        except Saving.DoesNotExist:
            return JsonResponse(
                {'message': 'Saving not found or you do not have permission to update it'},
                status=404
            )

        try:
            data = json.loads(request.body) if request.body else {}
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)

        new_amount_str = data.get('amount')
        if new_amount_str is None:
            return JsonResponse({'message': 'New progress amount is required'}, status=400)

        try:
            new_amount = Decimal(new_amount_str)
            if new_amount <= 0:  # Changed to <= 0 since adding 0 is pointless
                raise ValueError("New amount must be positive")
        except (ValueError, TypeError):
            return JsonResponse({'message': 'Invalid new amount'}, status=400)

        # Fetch or create user's balance
        balance, created = Balance.objects.get_or_create(
            user=request.user, 
            defaults={'balance_amount': Decimal('0.00')}
        )

        # Check if balance is sufficient
        if balance.balance_amount < new_amount:
            return JsonResponse(
                {'message': 'Insufficient balance to add to savings'},
                status=400
            )

        # Calculate new total progress
        updated_amount = saving.amount + new_amount

        # Check if new total exceeds goal
        if updated_amount > saving.goal:
            return JsonResponse(
                {'message': 'New progress would exceed the saving goal'},
                status=400
            )

        # Deduct from balance
        balance.balance_amount -= new_amount
        balance.save()

        # Update saving progress
        saving.amount = updated_amount
        saving.save()

        # Create a transaction for the deduction
        transaction = Transaction.objects.create(
            user=request.user,
            description=f"Added to saving goal: {saving.reason}",
            type='saving',  # Money is leaving the balance
            amount=new_amount,
            status='completed',
            date=timezone.now()
        )

        return JsonResponse(
            {
                'message': 'Saving progress updated successfully',
                'saving': {
                    'id': saving.id,
                    'reason': saving.reason,
                    'goal': str(saving.goal),
                    'amount': str(saving.amount),
                    'created_at': saving.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                },
                'balance': str(balance.balance_amount),
                'transaction': {
                    'id': transaction.id,
                    'description': transaction.description,
                    'type': transaction.type,
                    'amount': str(transaction.amount),
                    'status': transaction.status,
                    'date': transaction.date.strftime('%Y-%m-%d %H:%M:%S'),
                }
            },
            status=200
        )



class SavingStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Total number of saving plans
        saving_plan_count = Saving.objects.filter(user=request.user).count()

        # Total amount saved (sum of all saving.amount)
        total_saving = Saving.objects.filter(user=request.user).aggregate(
            total=Sum('amount')
        )['total'] or 0.00

        # Monthly saving (sum of transactions for savings this month)
        current_month = timezone.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        monthly_saving = Transaction.objects.filter(
            user=request.user,
            type='saving',
            description__startswith='Added to saving goal',
            date__gte=current_month,
            status='completed'
        ).aggregate(
            total=Sum('amount')
        )['total'] or 0.00

        # Monthly savings data for chart (last 12 months, ending with current month: March 2025)
        today = timezone.now()  # March 24, 2025
        monthly_savings_data = []
        for i in range(8, -1, -1): 
            month_start = (today - timedelta(days=30 * i)).replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            month_end = month_start.replace(
                day=calendar.monthrange(month_start.year, month_start.month)[1],
                hour=23, minute=59, second=59, microsecond=999999
            )
            monthly_total = Transaction.objects.filter(
                user=request.user,
                type='saving',
                description__startswith='Added to saving goal',
                date__gte=month_start,
                date__lte=month_end,
                status='completed'
            ).aggregate(
                total=Sum('amount')
            )['total'] or 0.00
            monthly_savings_data.append({
                'month': month_start.strftime('%b'),  # e.g., 'Apr' (2024), ..., 'Mar' (2025)
                'amount': float(monthly_total)
            })

        return JsonResponse({
            'saving_plan_count': saving_plan_count,
            'monthly_saving': str(monthly_saving),
            'total_saving': str(total_saving),
            'monthly_savings_data': monthly_savings_data,
        })
    




class BalanceStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()  # Current date (e.g., March 25, 2025)
        monthly_balances = []
        months = []

        # Calculate the start date (6 months ago from the current month)
        start_month = today.replace(day=1)  # Start of current month
        for i in range(5, -1, -1):  # 5 months back to current month (6 total)
            # Go back i months
            year = start_month.year - (1 if start_month.month - i <= 0 else 0)
            month = start_month.month - i if start_month.month - i > 0 else 12 - (i - start_month.month)
            month_start = start_month.replace(year=year, month=month, day=1)

            # Convert to datetime for time components
            month_start_dt = datetime.combine(month_start, datetime.min.time())
            month_end_dt = month_start_dt.replace(
                day=calendar.monthrange(month_start.year, month_start.month)[1]
            ).replace(hour=23, minute=59, second=59, microsecond=999999)

            # Income total
            income_total = Transaction.objects.filter(
                user=request.user,
                type='income',
                date__gte=month_start_dt,
                date__lte=month_end_dt,
                status='completed'
            ).aggregate(total=Sum('amount'))['total'] or 0.00

            # Spending total
            spending_total = Transaction.objects.filter(
                user=request.user,
                type='spending',
                date__gte=month_start_dt,
                date__lte=month_end_dt,
                status='completed'
            ).aggregate(total=Sum('amount'))['total'] or 0.00

            # Loans total
            loans_total = Transaction.objects.filter(
                user=request.user,
                type='loans',
                date__gte=month_start_dt,
                date__lte=month_end_dt,
                status='completed'
            ).aggregate(total=Sum('amount'))['total'] or 0.00

            # Savings total
            savings_total = Transaction.objects.filter(
                user=request.user,
                type='saving',
                date__gte=month_start_dt,
                date__lte=month_end_dt,
                status='completed'
            ).aggregate(total=Sum('amount'))['total'] or 0.00

            # Convert all to float before arithmetic
            income_total = float(income_total) if income_total is not None else 0.0
            spending_total = float(spending_total) if spending_total is not None else 0.0
            loans_total = float(loans_total) if loans_total is not None else 0.0
            savings_total = float(savings_total) if savings_total is not None else 0.0

            # Net balance = income - (spending + loans + savings)
            balance = income_total - (spending_total + loans_total + savings_total)
            monthly_balances.append(balance)
            months.append(month_start.strftime('%b'))  # e.g., "Oct", "Nov", etc.

        return JsonResponse({
            'monthly_balances': monthly_balances,
            'months': months,
        })
    

class UserStateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user_state, created = UserState.objects.get_or_create(user=request.user)
            return Response({
                'is_locked': user_state.is_locked,
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            user_state, created = UserState.objects.get_or_create(user=request.user)
            is_locked = request.data.get('is_locked', user_state.is_locked)

            user_state.is_locked = is_locked
            user_state.save()

            return Response({
                'is_locked': user_state.is_locked,
                'message': 'User state updated successfully',
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)