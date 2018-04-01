from django.conf.urls import url
from . import views

app_name = "images"

urlpatterns = [
    url(
        regex=r'^$',
        view=views.Images.as_view(),
        name='images'
    ),
    url(
        regex=r'^(?P<image_id>[0-9]+)/$',
        view=views.ImageDetail.as_view(),
        name='image-detail'
    ),
    url(
        regex=r'^(?P<image_id>[0-9]+)/likes/$',
        view=views.LikeImage.as_view(),
        name='like-image'
    ),  
    url(
        regex=r'^(?P<image_id>[0-9]+)/unlikes/$',
        view=views.UnLikeImage.as_view(),
        name='unlike-image'
    ),
    url(
        regex=r'^(?P<image_id>[0-9]+)/comments/$',
        view=views.CommentOnImage.as_view(),
        name='comment-image'
    ),
    url(
        regex=r'^(?P<image_id>[0-9]+)/comments/(?P<comment_id>[0-9]+)/$',
        view= views.ModerateComment.as_view(),
        name='moderate-comment'
    ),
    url(
        regex=r'^comments/(?P<comment_id>[0-9]+)/$',
        view=views.Comment.as_view(),
        name='comment'
    ),
    url(
        regex = r'^search/$',
        view = views.Search.as_view(),
        name='search'
    ),
]
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