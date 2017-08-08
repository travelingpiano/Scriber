from django.contrib.auth.models import User
from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.
class Transcription(models.Model):
    audio_url = models.TextField()
    title = models.CharField(max_length = 50)
    transcription = models.TextField(blank = True)

class TranscriptionUsers(models.Model):
    transcription_key = models.ForeignKey(Transcription)
    user_key = models.ForeignKey(User)

def validate_for_fs(value):
    if len(value) < 6:
        raise ValidationError(u'Password must be 6 characters or longer')

for field in [f for f in User._meta.fields if f.name in ['password']]:
    field.validators.append(validate_for_fs)

# def create(self, validated_data):
#     obj = Transcription.objects.create(**validated_data)
#     print(obj)
#     obj.save()
#     return obj
