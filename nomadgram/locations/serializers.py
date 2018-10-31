from rest_framework import routers, serializers, viewsets
from . import models
from nomadgram.users import models as user_models
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer


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
            line_set = list(models.Station.objects.filter(station_nm = obj.station_nm).values('line_num'))
            return line_set
        except models.Station.DoesNotExist :
            return None

class LocationSerializer(serializers.ModelSerializer):
    
    station = StationSerializer(read_only= True);

    class Meta:
        model = models.Location
        fields = ('id','station', 'name',  'starpoint_avg')

