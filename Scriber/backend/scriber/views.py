from django.shortcuts import render
from rest_framework import permissions, routers, viewsets
from django.contrib.auth.models import User
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from scriber.serializers import UserSerializer
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = User.objects.all()
    serializer_class = UserSerializer
