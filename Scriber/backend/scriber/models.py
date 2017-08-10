from django.contrib.auth.models import User
from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class Transcription(models.Model):
    audio_url = models.TextField()
    title = models.CharField(max_length = 50, unique=True)
    transcription = ArrayField(models.TextField())
    created_time = models.TimeField()
    created_date = models.DateField()
    users = models.ManyToManyField(User,blank=True)

def validate_for_fs(value):
    if len(value) < 6:
        raise ValidationError(u'Password must be 6 characters or longer')

for field in [f for f in User._meta.fields if f.name in ['password']]:
    field.validators.append(validate_for_fs)
