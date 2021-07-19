python manage.py migrate
web: gunicorn online_chat.wsgi --log-file -
web: daphne online_chat.asgi:application --port $POR
chatworker: python manage.py runworker --settings=chat.settings