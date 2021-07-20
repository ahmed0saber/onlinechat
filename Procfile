release: python manage.py migrate
web: daphne online_chat.asgi:application --port $PORT
chatworker: python manage.py runworker --settings=online_chat.settings