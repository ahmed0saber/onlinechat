release: python3 manage.py migrate
web: daphne  online_chat.asgi:application --port $PORT --bind 0.0.0.0 -v2
worker: python3 manage.py runworker channel_layer --settings=online_chat.settings -v2