from rest_framework import serializers
from .models import*
import json


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


 
    
class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        user = self.context['request'].user  # Get the logged-in user
        print(f"Stored password hash: {user.password}")  # Log the stored password hash

        print(f"User: {user.username}, Current Password: {data['current_password']}")
        if isinstance(data, str):
                data = json.loads(data)  
        # Ensure the user is authenticated before checking password
        if not user.is_authenticated:
                    raise serializers.ValidationError({"detail": "Authentication is required to change the password."})

                # Check if current password is correct
        if not user.check_password(data['current_password']):
                    raise serializers.ValidationError({"current_password": "Current password is incorrect."})

                # Ensure the new password is at least 6 characters long
        if len(data['new_password']) < 6:
                    raise serializers.ValidationError({"new_password": "New password must be at least 6 characters long."})

                # Ensure the new password is not the same as the current password
        if data['current_password'] == data['new_password']:
                    raise serializers.ValidationError({"new_password": "New password cannot be the same as the current password."})

        return data

    def save(self):
                user = self.context['request'].user  # Get the logged-in user
                user.set_password(self.validated_data['new_password'])  # Set the new password
                user.save()  # Save the user with the new password
                
                
        