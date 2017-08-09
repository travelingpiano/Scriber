from rest_framework import serializers
from django.contrib.auth.models import User
from scriber.models import Transcription, TranscriptionUsers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email','password')

class TranscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transcription
        fields = ('audio_url', 'transcription', 'title', 'created_date','created_time', 'pk')
