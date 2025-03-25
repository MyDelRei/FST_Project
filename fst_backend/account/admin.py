from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User,Transaction,Balance,Loan,Saving

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email', 'date_joined', 'picture')
    search_fields = ('username', 'email')
    list_filter = ('is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal Info', {'fields': ('picture',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'picture')}
        ),
    )

admin.site.register(User, CustomUserAdmin)

admin.site.register(Balance)

admin.site.register(Loan)

admin.site.register(Saving)



@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'description', 'type', 'date', 'status', 'amount')
    list_filter = ('type', 'status')
    search_fields = ('description', 'user__username')