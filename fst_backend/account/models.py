from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.db.models import Sum


class User(AbstractUser):
    picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True, default='profile_pics/default.jpg')

    def __str__(self):
        return self.username
    
    def get_picture_path(self):
        return str(self.picture) if self.picture else None


class UserState(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_state')
    is_locked = models.BooleanField(default=False)

    def __str__(self):
        return f"UserState for {self.user.username}"

class Balance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="balance")
    balance_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.user.username} - Balance: ${self.balance_amount}"
    

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('income', 'Income'),
        ('spending', 'Spending'),
        ('loans', 'Loans'),
        ('saving', 'Saving'),
    ]

    STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('completed', 'Completed'),
    ('failed', 'Failed'),
]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="transactions")
    description = models.TextField()
    type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.user.username} - {self.type} - ${self.amount}"
    
class Loan(models.Model):
    LOAN_STATUS_CHOICES = [
        ('pending', 'Pending'),        # Loan requested, not yet approved
        ('active', 'Active'),          # Loan approved and issued
        ('repaid', 'Repaid'),          # Loan fully repaid
        ('defaulted', 'Defaulted'),    # Loan overdue or unpayable
    ]

    LOAN_TYPE_CHOICES = [
        ('personal', 'Personal Loan'),    # For personal use
        ('business', 'Business Loan'),    # For business purposes
        ('custom', 'Custom Loan'),        # User-defined or special terms
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="loans")
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Initial loan amount
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)  # Annual interest rate
    status = models.CharField(max_length=10, choices=LOAN_STATUS_CHOICES, default='pending')
    loan_type = models.CharField(max_length=10, choices=LOAN_TYPE_CHOICES, default='personal')  # New field for loan type
    created_at = models.DateTimeField(auto_now_add=True)  # When loan was requested
    updated_at = models.DateTimeField(auto_now=True)      # Last status update
    due_date = models.DateTimeField(null=True, blank=True)  # When loan is due for repayment

    def __str__(self):
        return f"{self.user.username} - {self.loan_type} - ${self.amount} - {self.status}"

    def total_due(self):
        """Calculate total amount due including interest (simple interest for now)."""
        if self.status in ['active', 'defaulted']:
            # Simple interest: Principal * Rate * Time (assuming 1 year for simplicity)
            interest = self.amount * (self.interest_rate / 100)
            return self.amount + interest
        return self.amount
    
class Saving(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="savings")
    reason = models.CharField(max_length=255)  # User-input reason for saving
    goal = models.DecimalField(max_digits=10, decimal_places=2)    # User-input savings goal (e.g., "Buy a car")
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Target amount to save
    created_at = models.DateTimeField(auto_now_add=True)  # When the saving goal was created
    updated_at = models.DateTimeField(auto_now=True)      # Last updated

    def __str__(self):
        return f"{self.user.username} - {self.goal} - ${self.amount}"
