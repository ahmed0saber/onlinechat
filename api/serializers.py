from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from main.models import message

class messageSerializer(ModelSerializer):
    class Meta:
        model = message
        fields = ["content", "username"]