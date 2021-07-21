release: python3 manage.py migrate
worker: python3 manage.py runworker channel_layer -v2
web: gunicorn online_chat.asgi --log -file -