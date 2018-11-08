from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from nomadgram.users import models as user_models
from nomadgram.users import serializers as user_serializers
from nomadgram.images import serializers as image_serializers
from nomadgram.images import models as image_models

        
# Create your views here.

class LocationImages(APIView):

    def get(self, request, location_id, format=None):

        all_images = image_models.Image.objects.filter(location__id = location_id)

        serializer = image_serializers.ImageSerializer(all_images, many=True, context = {"request" : request})

        return Response(data =serializer.data, status= status.HTTP_200_OK)

class LocationInfo(APIView):
    
    def get(self, request, location_id, format=None):

        location = models.Location.objects.get(id = location_id)
        serializer = serializers.LocationSerializer(location,many=False, context = {"request" : request})

        return Response(data =serializer.data, status= status.HTTP_200_OK)

class StationImages(APIView) :
    def filterStation(self, station_name) :
        obj = models.Location.objects.filter(station__station_nm = station_name)
        return obj
 
    def get(self, request, station_name, format=None) :
        all_locations = self.filterStation(station_name)
        serializer = serializers.LocationSerializer(all_locations, many=True, context = {"request" : request})

        return Response(data =serializer.data, status= status.HTTP_200_OK)

class StationLines(APIView) :
    def filterStation(self, station_name) :
        obj = models.Station.objects.filter(station_nm = station_name).order_by('line_num')
        return obj
 
    def get(self, request, station_name, format=None) :
        lines = self.filterStation(station_name)
        serializer = serializers.LineSerializer(lines, many=True, context = {"request" : request})
        return Response(data=serializer.data, status= status.HTTP_200_OK)

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