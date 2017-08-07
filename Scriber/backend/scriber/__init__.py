from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

def validate_for_fs(value):
    if len(value) < 6:
        raise ValidationError(u'Password must be 6 characters or longer')

for field in [f for f in User._meta.fields if f.name in ['password']]:
    field.validators.append(validate_for_fs)
