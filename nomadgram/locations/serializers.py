from rest_framework import routers, serializers, viewsets
from . import models
from nomadgram.users import models as user_models
from nomadgram.images import models as image_models
from nomadgram.images import serializers as image_serializers


class StationSerializer(serializers.ModelSerializer):
    lines = serializers.SerializerMethodField()

    class Meta:
        model = models.Station
        fields = (
            'id',
            'lines',
            'station_nm',
        )

    def get_lines(self, obj) :
        try : 
            line_set = list(models.Station.objects.filter(station_nm = obj.station_nm).order_by('line_num').values('line_num'))
            return line_set
        except models.Station.DoesNotExist :
            return None

class LocationSerializer(serializers.ModelSerializer):
    
    station = StationSerializer(read_only= True);
    image = serializers.SerializerMethodField()
    class Meta:
        model = models.Location
        fields = ('id','station', 'name',  'starpoint_avg', 'image', 'starpoint_count')
    
    def get_image(self, obj) : 
        try :
            request = self.context.get('request')
            profile = image_models.Image.objects.filter(location__id = obj.id)
            if profile : 
                prost = profile[0];
                photo_url = prost.file.url
                absPath = request.build_absolute_uri(photo_url)
                """profile = image_models.Image.objects.filter(location__id = obj.id).values_list("file", flat=True)[0]"""
                return absPath
                """profile = image_models.Image.objects.filter(location__id = obj.id)[0]
                return image_serializers.LocationProfileSerializer(profile)"""
            
            else :
                return None;
        except image_models.Image.DoesNotExist :
            return None

class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Station
        fields = ('id', 'line_num')


