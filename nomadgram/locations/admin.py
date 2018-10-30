from django.contrib import admin
from . import models #. means same folder

# Register your models here.

@admin.register(models.Station)
class StationAdmin(admin.ModelAdmin):
    list_display_links = (
        'station_cd',
    )
    search_fields = (
        'station_nm',
        'line_num'
    )

    list_filter = (
        'station_nm',
        'line_num'
    )
    list_display = (
        'station_cd',
        'station_nm',
        'line_num',
        'fr_code'
    )

@admin.register(models.Location)
class LocationAdmin(admin.ModelAdmin):
    list_display_links = (
        'name',
    )
    search_fields = (
        'name',
        'station'
    )

    list_filter = (
        'name',
        'station'
    )
    list_display = (
        'name',
        'station',
        'starpoint_avg'
    )

@admin.register(models.Starpoint)
class LocationAdmin(admin.ModelAdmin):
    list_display = (
        'location', 
        'creator', 
        'points', 
    )
    
