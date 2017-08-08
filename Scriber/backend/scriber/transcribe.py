from watson_developer_cloud import SpeechToTextV1
import json

# https://aacapps.com/lamp/sound/emma.mp3
def transribe(url):
    url = 'https://aacapps.com/lamp/sound/emma.mp3'
    stt = SpeechToTextV1(username='88d9cb01-7ecb-4089-9d2c-a13828e3494e', password='1Wxsmr4kdBhp')
    audio_file = open(url, "rb")

    print json.dumps(stt.recognize(audio_file, content_type="audio/wav"), indent=2)
