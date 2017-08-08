from django.shortcuts import render
from rest_framework import permissions, routers, viewsets, authentication, status
from django.contrib.auth.models import User
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from scriber.serializers import UserSerializer
from scriber.models import Transcription
from scriber.serializers import TranscriptionSerializer
from rest_framework.response import Response
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    # permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TranscriptionViewSet(viewsets.ModelViewSet):
    queryset = Transcription.objects.all()
    serializer_class = TranscriptionSerializer

    def create(self, request):
        print(request.data.get('audio_url'))
        serializer = TranscriptionSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer)
            # print(self)
            # obj = Transcription.objects.create(**request)
            # print(obj)
            # obj.save()
            # return self
            # serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
