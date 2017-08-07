from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Transcription(models.Model):
    audio_url = models.CharField()
    transcription = models.TextField()

class TranscriptionUsers(models.Model):
    transcription_key = models.ForeignKey(Transcription)
    user_key = models.ForeignKey(User)
