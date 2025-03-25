from rest_framework import serializers
from .models import User, Transaction, Loan
from datetime import datetime


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
        }

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        if len(data["password"]) < 8:
            raise serializers.ValidationError({"password": "Password must be at least 8 characters long"})
        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'description', 'type', 'date', 'status', 'amount']
        read_only_fields = ['id', 'user', 'date']  # `user` is auto-assigned

    def validate(self, data):
        """Custom validation for transactions"""
        if data["amount"] <= 0:
            raise serializers.ValidationError({"amount": "Amount must be greater than 0"})
        if data["status"] not in ['complete', 'incomplete']:  # Assuming status is either 'complete' or 'incomplete'
            raise serializers.ValidationError({"status": "Invalid status value"})
        return data
    

    def create(self, validated_data):
        """Assign the logged-in user to the transaction and set date"""
        user = self.context['request'].user  # Get the authenticated user
        validated_data['user'] = user
        validated_data['date'] = datetime.now()  # Set current date if not provided
        return super().create(validated_data)
    

