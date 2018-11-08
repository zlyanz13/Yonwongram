from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from nomadgram.users import models as user_models #to prevent Conflicts Using 'as'
from taggit.managers import TaggableManager
from django.contrib.humanize.templatetags.humanize import naturaltime
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models import Avg
from django.db.models import Func

# Create your models here.

class Round(Func):
    function = 'ROUND'
    template='%(function)s(%(expressions)s, 2)'

@python_2_unicode_compatible
class Station(models.Model):
    
    """Comment Model"""
    line_num = models.CharField(max_length= 5)
    station_cd = models.CharField(max_length=40)  
    station_nm = models.CharField(max_length=40)      
    fr_code = models.CharField(max_length = 10)

    class Meta:
        ordering = ['station_nm']
    def __str__(self):
        
        """line_set = list(Station.objects.filter(station_nm = self.station_nm).order_by('line_num').values('line_num'))
        dd =[]
        dd = [dd['line_num'] for dd in line_set]"""
        return '{} - Line : {}'.format(self.station_nm, self.line_num)

@python_2_unicode_compatible
class Location(models.Model):

    name = models.CharField(max_length= 140)
    station = models.ForeignKey(Station, on_delete=models.PROTECT)

    @property
    def starpoint_avg(self):
        p = self.starpoints.all().aggregate(Avg('points')).get('points__avg')
        return round(p,2) if p else 0

    @property
    def starpoint_count(self):
        return self.starpoints.all().count()

    def __str__(self):
        return '{} : {}역 - Line {}'.format(self.name, self.station.station_nm, self.station.line_num)

    def getStationName(self):
        return self.station.station_nm

    def save(self, *args, **kwargs):
        try :
            obj=Location.objects.get(station__station_nm__contains=self.getStationName(), name=self.name)
            if obj:
                return;
        except Location.DoesNotExist : 
            super(Location, self).save(*args, **kwargs)


@python_2_unicode_compatible
class Starpoint(models.Model):
    
    points = models.IntegerField(default = 0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null = True)
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null = True, related_name = 'starpoints')
    
    def save(self, *args, **kwargs):
        try :
            obj=Starpoint.objects.get(creator=self.creator, location=self.location)
            if obj:
                Starpoint.objects.filter(pk=obj.pk).update(points=self.points)
                return;
        except Starpoint.DoesNotExist : 
            super(Starpoint, self).save(*args, **kwargs)

    def __str__(self):
        return 'User : {} - Location : {}'.format(self.creator.username, self.location.name)