
from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('ws/algo/', consumers.MyConsumer.as_asgi())
]