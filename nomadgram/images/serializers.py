from rest_framework import routers, serializers, viewsets
from . import models
from nomadgram.users import models as user_models
from nomadgram.locations import models as location_models
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer
from nomadgram.locations import serializers as location_serializers

class CountImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'like_count',
            'comment_count',
        )


class FeedUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = user_models.User
        fields = (
            'username',
            'profile_image'
        )


class CommentSerializer(serializers.ModelSerializer):
    
    creator = FeedUserSerializer(read_only= True);

    class Meta:
        model = models.Comment
        fields = (
            'id',
            'message',
            'creator'
        )

class LikeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Like
        fields = '__all__'


class ImageSerializer(TaggitSerializer ,serializers.ModelSerializer):

    tags = TagListSerializerField()
    comments = CommentSerializer(many = True)
    creator = FeedUserSerializer()
    is_liked = serializers.SerializerMethodField()
    location = location_serializers.LocationSerializer()

    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'location',
            'caption',
            'comments',
            'like_count',
            'creator',
            'tags',
            'natural_time',
            'is_liked',
            'stars'
        )
          
    def get_is_liked(self, obj) :
        if  'request' in self.context:
            request = self.context['request']
            try :
                models.Like.objects.get(
                    creator__id = request.user.id, image__id = obj.id)
                return True
            except models.Like.DoesNotExist:
                return False
        return False

class SmallImageSerializer(serializers.ModelSerializer):
    """used for notification"""
    class Meta :
        model = models.Image
        fields = (
            'file',
        )

class InputImageSerializer(serializers.ModelSerializer):   

    class Meta :
        model = models.Image
        fields = (
            'file',
            'location',
            'caption',            
        )

class LocationProfileSerializer(serializers.ModelSerializer):   

    class Meta :
        model = models.Image
        fields = (
            'id', 'file',          
        )