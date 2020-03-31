from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import Client
from django.test import TestCase

from uploader.models import RawData


class TestHappyPath(TestCase):
    def test_file_upload(self):
        c = Client()
        file = SimpleUploadedFile(
            "file",
            b"S28800011AAK27GA0000DTS000100SH    0000619200Y\n"
        )
        self.assertEqual(RawData.objects.count(), 0)
        response = c.post('/api', {'file': file})
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual({'Add': 1}, response.json())
        self.assertEqual(RawData.objects.count(), 1)
        

class TestUnHappyPath(TestCase):
    def test_file_upload(self):
        c = Client()
        file = SimpleUploadedFile(
            "file",
            b"000000000000 NOT FORMATED CORRECTLY\n"
        )
        self.assertEqual(RawData.objects.count(), 0)
        response = c.post('/api', {'file': file})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(RawData.objects.count(), 0)
