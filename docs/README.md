# Scriber Flex-Project Proposal

## Background and Overview

Transcription of interviews or meetings is a process which usually involves recording the full audio of the encounter, and then paying a service to transcribe it. We intend to design an app to create fast transcriptions of interviews and meetings, and allow users to view their transcriptions.

The app is broken down into a few parts:
- Recording the audio of the conversation
- Sending the data to the backend to be processed
- Implementing a speech-to-text API for automatic processing
- Writing the processed data into the database
- Developing an app to capture audio, and retrieve/display processed conversations

## Functionality and MVP

- [ ] React Native OAuth
- [ ] React Native App to display transcriptions
- [ ] Speech to text using IBM Watson API
- [ ] Django/MongoDB backend to store transcriptions and audio files
- [ ] App replays audio based on transcription timestamps

### Bonus

- [ ] Metadata analysis of transcriptions
- [ ] Posts/Comments on transcriptions

## Technologies and Technical Challenges

We are implementing MongoDB as our database to store users, transcriptions and audio files. Python Django will handle the communication between our app and MongoDB. Django will also handle using the Watson API to perform the speech-to-text. The app will be designed in React Native, and will record audio and display past transcriptions called up from the backend.

Some of the challenges we may face are:
- Learning the new technologies
- OAuth with React Native and Django
- Getting Django up and running
- Implementing the Watson API
- Differentiating between speakers in audio files

## Accomplished Over the Weekend

This weekend, we created a basic React Native interactive app for iOS. 

## Team Members and Work Breakdown

The team members are Ade Farquhar, Li Hsuan Lu, Spencer Chan, and Virginia Chen.

#### Day 1

#### Day 2

#### Day 3

#### Day 4

#### Day 5

#### Day 6

#### Day 7
