from watson_developer_cloud import SpeechToTextV1
import urllib.request
import json
from pydub import AudioSegment
import requests

# https://aacapps.com/lamp/sound/emma.mp3
def transcribe(url, title):
    # url = 'http://www.freeinfosociety.com/media/sounds/2518.mp3'
    url = 'http://www.freeinfosociety.com/media/sounds/3828.mp3'
    stt = SpeechToTextV1(username='88d9cb01-7ecb-4089-9d2c-a13828e3494e', password='1Wxsmr4kdBhp')
    audio_file = urllib.request.urlopen(url)
    r = requests.get(url)
    print(r.content)
    # print(json.dumps(stt.recognize(audio_file, content_type="audio/mp3")))
    # url = urllib.request.urlopen(url)
    # print(url.read())
    # f = open('./scriber/test.mp3','wb')
    # f.write(url.read(1024))
    # audio2 = open('./scriber/2518.mp3','rb')
    # print(audio2)
    # print(audio_file.read(8192))
    # audio2 = url.read()
    with open('./scriber/test.mp3','wb') as f:
        f.write(r.content)
    sound = AudioSegment.from_file('./scriber/test.mp3')
    output_json = json.loads(json.dumps(stt.recognize(r.content, content_type="audio/mp3", timestamps=True,speaker_labels=True),indent=2))
    formatted_json = []
    counter = 0

    # print(output_json)
    for key in output_json['results']:
        new_json = {}
        new_json['text'] = key['alternatives'][0]['transcript']
        new_json['timestamps']  = [0,0]
        new_json['timestamps'][0] = key['alternatives'][0]['timestamps'][0][1]
        word_length = len(key['alternatives'][0]['timestamps'])
        new_json['timestamps'][1] = key['alternatives'][0]['timestamps'][word_length-1][2]
        new_json['speaker'] = output_json['speaker_labels'][counter]['speaker']
        #sound slicing done below
        partial_sound = sound[new_json['timestamps'][0]*1000-200:new_json['timestamps'][1]*1000+200]
        filename = f"./scriber/{title}{counter}.mp3"
        partial_sound.export(filename, format="mp3")

        counter += word_length
        formatted_json.append(json.dumps(new_json))
    return formatted_json
