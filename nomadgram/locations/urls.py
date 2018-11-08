from django.conf.urls import url
from . import views

app_name = "locations"

urlpatterns = [

    url(
        regex=r'^station/(?P<station_name>\w+)/$',
        view=views.StationImages.as_view(),
        name='station_images'
    ),
    url(
        regex=r'^station/(?P<station_name>\w+)/lines/$',
        view=views.StationLines.as_view(),
        name='station_lines'
    ),
    url(
        regex=r'^(?P<location_id>[0-9]+)/$',
        view=views.LocationImages.as_view(),
        name='location_images'
    ),
    url(
        regex=r'^(?P<location_id>[0-9]+)/info/$',
        view=views.LocationInfo.as_view(),
        name='location_info'
    ),
]
"""    """
"""
urlpatterns = [
    url(
        regex=r'^all/$',
        view=views.ListAllImages.as_view(),
        name='all_images'
    ),
    url(
        regex=r'^comments/$',
        view=views.ListAllComments.as_view(),
        name='all_comments'
    ),
    url(
        regex=r'^likes/$',
        view=views.ListAllLikes.as_view(),
        name='all_likews'
    )
]
"""