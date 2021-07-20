release: python manage.py migrate
web: gunicorn online_chat.wsgi --log-file -
web: daphne core.asgi:application --port $PORT --bind 0.0.0.0 -v2
worker: python manage.py runworker channels --settings=online_chat.settings -v2