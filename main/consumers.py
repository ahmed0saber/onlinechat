import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import message


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = "global"  # self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = "global"  # 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_text = text_data_json['message']
        user = self.scope["user"]
        new_message = message.objects.create(content=message_text, user=user)
        new_message.save()

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message_text,
                'user': user.username
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        username = event['user']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message,
            'user':username
        }))

