from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    ced = models.CharField(max_length=8)
    sex = models.CharField(max_length=1)
    phone_number = models.CharField(max_length=11)
    address = models.CharField(max_length=160)
    # profile_img = models.ImageField(upload_to='profile_photo/', default='profile_photo/None/no-img.jpg')


class Post(models.Model):
    user = models.ForeignKey(User, related_name = 'user', on_delete = models.CASCADE)
    title = models.TextField()
    description = models.TextField()
    price = models.IntegerField()
    image = models.ImageField(upload_to='pictures', blank=True, null=True)
    pay_type = models.CharField(max_length=20)
