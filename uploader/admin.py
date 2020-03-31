from django.contrib import admin

from uploader.models import RawData

class RawDataAdmin(admin.ModelAdmin):
    pass
admin.site.register(RawData, RawDataAdmin)
