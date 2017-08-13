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
        # print(request.data.get('audio_url')
        print(request.data)
        user_array = []
        if isinstance(request.data.get('usernames'),str):
            user_array = request.data.get('usernames')[1:-1].split(',')
        else:
            user_array = request.data.get('usernames')
        users = User.objects.filter(username__in=user_array)
        transcription_result = {}
        transcription_result['audio_url'] = request.data.get('audio_url')
        transcription_result['title'] = request.data.get('title')
        transcription_result['transcription'] = transcribe(request.data.get('audio_url'),request.data.get('title'))
        transcription_result['created_time'] = timezone.now().time()
        transcription_result['created_date'] = timezone.now().date()
        transcription_result['usernames'] = user_array
        transcription_result['description'] = request.data.get('description')
        serializer = TranscriptionSerializer(data=transcription_result)
        if serializer.is_valid():
            serializer.save()
            transcription = Transcription.objects.get(pk=serializer.data['pk'])
            transcription.users.add(*users)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    #can keep on updating users
    def update(self,request,pk=None):
        #editing title
        users = {}
        if isinstance(request.data.get('users'),str):
            users = json.loads(request.data.get('users'))
        else:
            users = request.data.get('users')
        old_transcription = Transcription.objects.get(pk=pk)
        if request.data.get('title'):
            old_transcription.title = request.data.get('title')
        if request.data.get('description'):
            old_transcription.description = request.data.get('description')
        new_transcriptions = []
        #going through transcription block by block
        if users:
            for string_block in old_transcription.transcription:
                transcript_block = json.loads(string_block)
                #add check if speaker was not updated
                if (str(transcript_block['speaker']) in users):
                    if (int(users[str(transcript_block['speaker'])]) != 0):
                        transcript_block['speaker'] = users[str(transcript_block['speaker'])]
                new_transcriptions.append(json.dumps(transcript_block))
            old_transcription.transcription = new_transcriptions
        old_transcription.save()
        return Response(request.data, status=status.HTTP_201_CREATED)
