web: gunicorn online_chat.wsgi --log-file -
web: daphne online_chat.asgi:application --port $PORT
chatworker: python manage.py runworker --settings=chat.settings