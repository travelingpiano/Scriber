from django.shortcuts import render
from rest_framework import permissions, routers, viewsets, authentication, status
from django.contrib.auth.models import User
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from scriber.serializers import UserSerializer
from scriber.models import Transcription
from scriber.serializers import TranscriptionSerializer
from rest_framework.response import Response
from scriber.transcribe import transcribe
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    # permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request):
        user, created = User.objects.get_or_create(username=request.data.get('username'))
        user.set_password(request.data.get('password'))
        user.save()
        serializer = UserSerializer(data=request.data)
        # print(serializer.is_valid())
        # if serializer.is_valid():
        #     print(serializer.data)
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(request.data, status=status.HTTP_201_CREATED)

class TranscriptionViewSet(viewsets.ModelViewSet):
    queryset = Transcription.objects.all()
    serializer_class = TranscriptionSerializer

    def create(self, request):
        # print(request.data.get('audio_url'))
        transcription_result = {}
        transcription_result['audio_url'] = request.data.get('audio_url')
        transcription_result['title'] = request.data.get('title')
        transcription_result['transcription'] = transcribe(request.data.get('audio_url'),request.data.get('title'))
        serializer = TranscriptionSerializer(data=transcription_result)
        print(serializer)
        serializer = TranscriptionSerializer(data=request.data)
        transcribe(request.data.get('audio_url'))
        transcription_result['transcription'] = transcribe(request.data.get('audio_url'))
        serializer = TranscriptionSerializer(data=transcription_result)
        print(serializer)
        if serializer.is_valid():
            # print(serializer)
            # print(self)
            # obj = Transcription.objects.create(**request)
            # print(obj)
            # obj.save()
            # return self
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
