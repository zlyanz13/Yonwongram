from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers

class Notifications(APIView):

    def get(self, request, format =None):

        user =request.user
        
        notification = models.Notification.objects.filter(to = user)

        serializer = serializers.NotificationSerializer(notification, many = True, context={"request": request})

        return Response(data = serializer.data, status = status.HTTP_200_OK)