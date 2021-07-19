from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from main.models import message
from .serializers import messageSerializer


# Create your views here.
@api_view(['GET'])
def main(request):
    all = message.objects.count()
    end = all - int(request.GET['counter'])
    if end == all:
        return Response({"message": "all messages were loaded"}, status=HTTP_404_NOT_FOUND)
    start = end - 100
    messages = message.objects.filter(Q(id__lt=end) & Q(id__gte=start))
    serializer = messageSerializer(messages, many=True)
    return Response(serializer.data, status=HTTP_200_OK)