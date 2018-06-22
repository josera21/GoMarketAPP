from rest_framework import serializers
from django.contrib.auth.models import User
from django.db.models import Q
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('url','username','first_name','last_name','email', 'password')


class ProfileSerializer(serializers.ModelSerializer):
	# Get data from the UserSerializer
	user = UserSerializer(required = True)

	class Meta:
		model = Profile
		fields = ('url','user', 'ced','sex', 'phone_number','address')

	def create(self, validated_data):
		user_data = validated_data.pop('user')
		user = UserSerializer.create(UserSerializer(),validated_data=user_data)
		profile, created = Profile.objects.update_or_create(
			user = user,
			ced = validated_data.pop('ced'),
			sex = validated_data.pop('sex'),
			phone_number = validated_data.pop('phone_number'),
			address = validated_data.pop('address')
		)

		return profile

class UserLoginSerializer(serializers.ModelSerializer):
	token = serializers.CharField(allow_blank=True, read_only=True)
	username = serializers.CharField(required=False, allow_blank=True)
	email = serializers.EmailField(label='Email address', required=False, allow_blank=True)

	class Meta:
		model = User
		fields = [
			'id',
			'username',
			'email',
			'password',
			'token',
		]
		extra_kwargs = {"password":{"write_only": True}}

	def validate(self, data):
		user_obj = None
		email = data.get('email', None)
		username = data.get('username', None)
		password = data["password"]
		if not email and not username:
			raise serializers.ValidationError("A username or email is required to login.")

		user = User.objects.filter(
			Q(email=email) |
			Q(username=username)
		).distinct()
		# For exclude users that not has emails
		user = user.exclude(email__isnull=True).exclude(email__iexact='')

		if user.exists() and user.count() == 1:
			user_obj = user.first()
		else:
			raise serializers.ValidationError("This username/email is not valid.")
		
		if user_obj:
			print("password: ",user_obj.password)
			if not user_obj.password == password:
				raise serializers.ValidationError("Incorrect credentials please try again")

		data['token'] = "SOME RANDOM TOKEN"
		data['id'] = user_obj.id
		return data

class PostSerializer(serializers.ModelSerializer):
	class Meta:
		model = Post
		fields = ('id','url','user','title', 'description','price','pay_type')