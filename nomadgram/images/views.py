from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from nomadgram.users import models as user_models
from nomadgram.locations import models as location_models
from nomadgram.users import serializers as user_serializers
        
# Create your views here.

class Images(APIView):
    
    def get(self, request, format=None):

        user = request.user

        following_users = user.following.all()

        image_list = []

        for following_user in following_users:
            
            user_images = following_user.images.all()[:2]

            for image in user_images:
                
                image_list.append(image)

        my_images = user.images.all()[:2]

        for image in my_images:
            
            image_list.append(image)

        sorted_list = sorted(image_list,  key =lambda image: image.created_at, reverse= True)

        serializer = serializers.ImageSerializer(sorted_list, many = True, context={'request' : request})

        return Response(serializer.data)
    
    def post(self, request, format=None):
        user = request.user
        data = request.data
        print(data)
               
        station_nm = data.get("station")
        location = data.get("location")
        stars = int('0'+data.get("stars"))
        caption = data.get("caption")
        tags = data.get("tags")
        file = data.get("file")

        try : 
            found_location = location_models.Location.objects.get(
                station__station_nm = station_nm, 
                name=location)

            print('location fount',found_location)
        except location_models.Location.DoesNotExist: 
            station=location_models.Station.objects.filter(station_nm = station_nm).order_by('line_num')[0]
            new_location=location_models.Location.objects.create(
            name=location, 
            station = station)

        models.Image.objects.create(file= file,location = new_location, 
        stars=stars, tags=tags, caption=caption, creator=user)

        return Response(None, status= status.HTTP_201_CREATED)

        """user = request.user

        serializer = serializers.InputImageSerializer(data=request.data)

        if serializer.is_valid():
            
            serializer.save(creator = user)

            return Response(data = serializer.data, status= status.HTTP_201_CREATED)
        
        else :
            return Response(data = serializer.errors, status=status.HTTP_400_BAD_REQUEST)"""

class LikeImage(APIView):
    
    def get(self, request, image_id, format= None):
        
        likes = models.Like.objects.filter(image__id=image_id)

        like_creator_ids = likes.values('creator_id')

        users = user_models.User.objects.filter(id__in = like_creator_ids)#id__in mean search inside a Array

        serializer = user_serializers.ListUserSerializer(users, many=True, context={"request": request})

        return Response(data =serializer.data, status= status.HTTP_200_OK)
    
    def post(self, request, image_id, format = None):
        user = request.user
        
        try:
        
            found_image = models.Image.objects.get(id=image_id)

        except models.Image.DoesNotExist:
            return Response(status=404)
            

        try :
            preexisting_like = models.Like.objects.get(
                creator = user,
                image = found_image
            )

            return Response(status=status.HTTP_304_NOT_MODIFIED)

        except models.Like.DoesNotExist:

            new_like = models.Like.objects.create(
            creator = user,
            image = found_image
            )

            new_like.save()

        return Response(status = status.HTTP_200_OK)


class UnLikeImage(APIView):
    
    def delete(self, request, image_id, format = None) :
        
        user = request.user
        
        try:
            found_image = models.Image.objects.get(id=image_id)

        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
            

        try :
            preexisting_like = models.Like.objects.get(
                creator = user,
                image = found_image
            )

            preexisting_like.delete()

            return Response(status = status.HTTP_204_NO_CONTENT)

        except models.Like.DoesNotExist:

            return Response(status=status.HTTP_304_NOT_MODIFIED)

        

class CommentOnImage(APIView):
    
    def post(Self, request, image_id, format = None) :
        
        user = request.user

        try:
            found_image = models.Image.objects.get(id=image_id)

        except models.Image.DoesNotExist:
            return Response(status=404)
        
        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(creator=user, image = found_image)

            return Response(data=serializer.data, status =201)

        else:
            return Response(data = serializer.errors, status = 400)

class Comment(APIView):
    
    def delete(Self, request, comment_id, format = None):
        
        try:
            comment = models.Comment.objects.get(id=comment_id, creator=request.user)
            comment.delete()
            return Response(status=204)

        except models.Comment.DoesNotExist :
            return Response(status=404)

class Search(APIView):
    def get(self, request, format=None):

        hashtags = request.query_params.get('hashtags', None)

        if hashtags is not None : 
            hashtags = hashtags.split(",")

            images = models.Image.objects.filter(tags__name__in = hashtags).distinct()

            serializer = serializers.ImageSerializer(images, many=True, context={'request' : request})

            return Response(data = serializer.data, status= status.HTTP_200_OK)

        else :
            
            images = models.Image.objects.all()[:20]
            serializer = serializers.ImageSerializer(images, many=True, context={'request' : request})
            return Response(data = serializer.data, status= status.HTTP_200_OK)

class ModerateComment(APIView):
    def delete(self, request, image_id, comment_id, format=None):
        
        user = request.user      

        try :
            comment_to_delete = models.Comment.objects.get(id=comment_id, image__id = image_id, image__creator= user)

            comment_to_delete.delete()
        
        except models.Comment.DoesNotExist :
            return Response(status= status.HTTP_404_NOT_FOUND)

        return Response(status = status.HTTP_204_NO_CONTENT)

class ImageDetail(APIView):
    
    def find_own_image(self, image_id, user):
        try:
            image = models.Image.objects.get(id=image_id, creator = user)
            return image

        except models.Image.DoesNotExist :
            return None
    
    def get(self, request, image_id, format =None ):

        try :
            image = models.Image.objects.get(id=image_id)

        except models.DoesNotExist :
            return Response(status= status.HTTP_404_NOT_FOUND)

        serializer = serializers.ImageSerializer(image, context={'request' : request})

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, image_id, format = None):
        
        user = request.user

        image = self.find_own_image(image_id, user)

        if image is None :
            return Response(status= status.HTTP_400_BAD_REQUEST)

        serializer = serializers.InputImageSerializer(image, data = request.data, partial = True )

        if serializer.is_valid():
            
            serializer.save(creator = user)

            return Response(data = serializer.data, status= status.HTTP_204_NO_CONTENT)
        
        else :
            
            return Response(data = serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, image_id, format=None):
        
        user = request.user

        image = self.find_own_image(image_id, user)

        if image is None :
            return Response(status= status.HTTP_400_BAD_REQUEST)
        
        image.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)




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