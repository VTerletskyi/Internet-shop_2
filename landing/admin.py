from django.contrib import admin
from .models import *


class SubscribeAdmin(admin.ModelAdmin):
    #list_display = ["name", "email"]
    list_display = [field.name for field in Subscriber._meta.fields]
    #exclude = ["email"] # сховати поле
    list_filter = ["name",]# показати поле
    search_fields = ["name", "email"]# створює пошук по імені та емейлі
    fields = ["email"]

    class Meta:
        model = Subscriber


admin.site.register(Subscriber, SubscribeAdmin)
