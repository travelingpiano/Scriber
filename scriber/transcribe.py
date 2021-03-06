from watson_developer_cloud import SpeechToTextV1
import urllib.request
import json
from pydub import AudioSegment
import requests
import boto
import boto.s3
import sys
from boto.s3.key import Key
import boto.s3.connection
import os

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')

AudioSegment.converter = 'ffmpeg'

def transcribe(url, title):
    conn = boto.s3.connect_to_region('us-west-2',
       aws_access_key_id=AWS_ACCESS_KEY_ID,
       aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
       is_secure=False,               # uncomment if you are not using ssl
       calling_format = boto.s3.connection.OrdinaryCallingFormat(),
    )
    bucket = conn.get_bucket('scriberflexproject')
    bucket_list = bucket.list()

    stt = SpeechToTextV1(username='88d9cb01-7ecb-4089-9d2c-a13828e3494e', password='1Wxsmr4kdBhp')
    sound_aac = AudioSegment.from_file(f"{url}/test.aac")
    #error causing statement
    sound_aac.export(f"{url}/test.mp3", format='mp3')
    # sound = AudioSegment.from_file('./scriber/test.mp3')
    sound = AudioSegment.from_file(f"{url}/test.mp3")
    output_json = json.loads(json.dumps(stt.recognize(open(f"{url}/test.mp3",'rb'), content_type="audio/mp3", timestamps=True,speaker_labels=True),indent=2))
    formatted_json = []
    counter = 0
    for key in output_json['results']:
        new_json = {}
        new_json['text'] = key['alternatives'][0]['transcript']

        new_json['timestamps']  = [0,0]
        new_json['timestamps'][0] = key['alternatives'][0]['timestamps'][0][1]
        word_length = len(key['alternatives'][0]['timestamps'])
        new_json['timestamps'][1] = key['alternatives'][0]['timestamps'][word_length-1][2]
        new_json['speaker'] = output_json['speaker_labels'][counter]['speaker']
        #sound slicing done below
        partial_sound = sound[new_json['timestamps'][0]*1000:new_json['timestamps'][1]*1000+200]
        filename = f"{url}/{title}{counter}.mp3"
        #error causing statement
        partial_sound.export(filename, format="mp3")
        os.system(f"ffmpeg -i {filename} -c:a aac -b:a 160k {url}/{title}{counter}.aac")
        #AWS upload
        AWSkey = Key(bucket)
        AWSkey.key = f"{title}{counter}.aac"
        AWSkey.set_contents_from_filename(filename)
        new_json['filename'] = AWSkey.key
        counter += word_length
        formatted_json.append(json.dumps(new_json))
    print('json output after segmenting')
    print(formatted_json)
    return formatted_json
