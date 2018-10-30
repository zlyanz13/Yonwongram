from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from nomadgram.users import models as user_models
from nomadgram.users import serializers as user_serializers
        
# Create your views here.



"""
def get_key(image):
    return image.created_at


class ListAllImages(APIView):

    def get(self, request, format=None):

        all_images = models.Image.objects.all()

        serializer =  serializers.ImageSerializer(all_images, many = True)
        
        return Response(data = serializer.data)

class ListAllComments(APIView):
    def get(self, request, format = None):
        
        user_id = request.user.id

        all_comments = models.Comment.objects.filter(creator = user_id)

        serializer = serializers.CommentSerializer(all_comments, many = True)

        return Response(data = serializer.data)

class ListAllLikes(APIView):
    def get(self, request, format = None):
        
        all_likes = models.Like.objects.all()

        serializer = serializers.LikeSerializer(all_likes, many = True)

        return Response(data = serializer.data)
"""