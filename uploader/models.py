from django.db import models


class RawData(models.Model):
    data = models.TextField()
    filename = models.TextField(blank=True)
    timestamp = models.DateTimeField(blank=True,null=True)
    processed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.data}"

    @staticmethod
    def process(self):
        batch = RawData.objects.filter(processed=False)[:50]
