from django.urls import path
from .views import SignupView, LoginView, TransactionCreateView, TransactionListView,get_user_profile,SavingStatsView,TransactionStatsView,BalanceStatsView,UserStateView
from .views import UpdateProfileView,TransactionUpdateView,TransactionDeleteView,LoanCreateView,ActiveLoanListView,LoanUpdateView,SavingCreateView,SavingListView,SavingUpdateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('user-state/', UserStateView.as_view(), name='user-state'),


    path('transactions/', TransactionCreateView.as_view(), name='transactions'),
    path('transactions/state/', TransactionStatsView.as_view(), name='transactions-state'),
    path('transactions/list/', TransactionListView.as_view(), name='transaction-list'),  
    path('update-transaction/<int:pk>/', TransactionUpdateView.as_view(), name='update-transaction'),
    path('delete-transaction/<int:pk>/', TransactionDeleteView.as_view(), name='delete_transaction'),



    path('loans/', LoanCreateView.as_view(), name='loan-create'),
    path('loans/list', ActiveLoanListView.as_view(), name='list-loans'),
    path('loans/<int:loan_id>/update/', LoanUpdateView.as_view(), name='loan-update'),


    path('savings/', SavingCreateView.as_view(), name='saving-create'),
    path('savings/list/', SavingListView.as_view(), name='saving-list'),
    path('savings/<int:saving_id>/update/', SavingUpdateView.as_view(), name='saving-update'),
    path('savings/stats/', SavingStatsView.as_view(), name='saving-stats'),

    path('balance/state/', BalanceStatsView.as_view(), name='balance-stats'),



    path('get-user-profile/', get_user_profile, name='user-profile'),
    path('update-profile/', UpdateProfileView.as_view(), name='update_profile'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)