from django.db import models
from .models import*
from django.db.models import Sum
from decimal import Decimal
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    role = models.CharField(max_length=40, default='general', blank=True, null=True)
    profile_picture = models.ImageField(upload_to='image/', blank=True, null=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.pk: 
            if self.is_superuser:
                self.role = 'superuser'
            elif not self.role:
                self.role = 'general'
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
    

