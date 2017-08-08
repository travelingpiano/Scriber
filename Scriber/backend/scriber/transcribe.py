from watson_developer_cloud import SpeechToTextV1
import urllib.request
import json

# https://aacapps.com/lamp/sound/emma.mp3
def transcribe(url):
    url = 'http://www.freeinfosociety.com/media/sounds/2518.mp3'
    stt = SpeechToTextV1(username='88d9cb01-7ecb-4089-9d2c-a13828e3494e', password='1Wxsmr4kdBhp')
    audio_file = urllib.request.urlopen(url)
    # print(json.dumps(stt.recognize(audio_file, content_type="audio/mp3")))
    audio2 = open('./scriber/2518.mp3','rb')
    print(json.dumps(stt.recognize(audio2, content_type="audio/mp3", timestamps=True,speaker_labels=True),indent=2))
