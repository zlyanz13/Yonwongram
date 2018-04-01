from rest_framework import routers, serializers, viewsets
from . import models
from nomadgram.users import serializers as user_serializers

class NotificationSerializer(serializers.ModelSerializer):

    creator = user_serializers.ListUserSerializer()
    image = user_serializers.images_serializers.SmallImageSerializer()
    class Meta:
        model = models.Notification
        fields = '__all__'