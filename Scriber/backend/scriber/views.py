from django.shortcuts import render
from rest_framework import permissions, routers, viewsets, authentication, status
from django.contrib.auth.models import User
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from scriber.serializers import UserSerializer
from scriber.models import Transcription
from scriber.serializers import TranscriptionSerializer, TranscriptionIndexSerializer
from rest_framework.response import Response
from scriber.transcribe import transcribe
from django.utils import timezone
import json
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
    # serializer_class = TranscriptionSerializer
    def get_serializer_class(self):
        if self.action == 'list':
            return TranscriptionIndexSerializer
        else:
            return TranscriptionSerializer
    def create(self, request):
        # print(request.data.get('audio_url'))
        user_array = []
        if isinstance(request.data.get('users'),str):
            user_array = request.data.get('users')[1:-1].split(',')
        else:
            user_array = request.data.get('users')
        users = User.objects.filter(pk__in=user_array)
        transcription_result = {}
        transcription_result['audio_url'] = request.data.get('audio_url')
        transcription_result['title'] = request.data.get('title')
        transcription_result['transcription'] = transcribe(request.data.get('audio_url'),request.data.get('title'))
        transcription_result['created_time'] = timezone.now().time()
        transcription_result['created_date'] = timezone.now().date()
        serializer = TranscriptionSerializer(data=transcription_result)
        if serializer.is_valid():
            serializer.save()
            transcription = Transcription.objects.get(title=request.data.get('title'))
            transcription.users.add(*users)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self,request,pk=None):
        print(request.data.get('users'))
        users = request.data.get('users')
        old_transcription = Transcription.objects.get(pk=pk)
        print(old_transcription.transcription)
        new_transcription = {}
        new_transcription['title'] = old_transcription.title
        new_transcription['audio_url'] = old_transcription.audio_url
        new_transcription['pk'] = old_transcription.pk
        new_transcription['created_date'] = old_transcription.created_date
        new_transcription['created_time'] = old_transcription.created_time
        new_transcription['users'] = old_transcription.users
        new_transcriptions = []
        for string_block in old_transcription.transcription:
            transcript_block = json.loads(string_block)
            print(transcript_block)
            transcript_block['speaker'] = users[transcript_block['speaker']]
            new_transcriptions.append(json.dumps(transcript_block))
        new_transcription['transcription'] = new_transcriptions
        serializer = TranscriptionSerializer(data=new_transcription)
        print(serializer.is_valid())
        print(serializer.errors)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
