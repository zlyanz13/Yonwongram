from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from nomadgram.users import models as user_models #to prevent Conflicts Using 'as'
from nomadgram.locations import models as location_models #to prevent Conflicts Using 'as'
from taggit.managers import TaggableManager
from django.contrib.humanize.templatetags.humanize import naturaltime
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.

@python_2_unicode_compatible
class TimeStampedModel(models.Model):

    """Image Model"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True

@python_2_unicode_compatible
class Image(TimeStampedModel):
    
    """Comment Model"""

    file = models.ImageField()
    location = models.ForeignKey(location_models.Location, on_delete =models.PROTECT)
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete =models.SET_NULL, null = True,  related_name='images')
    stars = models.IntegerField(default = 0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    tags = TaggableManager()

    @property
    def like_count(self):
        return self.likes.all().count()

    @property
    def comment_count(self):
        return self.comments.all().count()

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    @property
    def is_vertical(self):
        if self.file.width < self.file.height :
            return True
        else :
            return False

    def __str__(self):
        return '{} - {}'.format(self.location, self.caption)

    def save(self, *args, **kwargs):
        location_models.Starpoint.objects.create(
            points=self.stars, 
            creator=self.creator, 
            location=self.location)
        super(Image, self).save(*args, **kwargs)

    class Meta:
        ordering = ['-created_at']

@python_2_unicode_compatible
class Comment(TimeStampedModel):

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null = True)
    image = models.ForeignKey(Image, on_delete=models.SET_NULL, null = True, related_name = 'comments')

    def __str__(self):
        return self.message

@python_2_unicode_compatible
class Like(TimeStampedModel) :
    
    """ Like Model """

    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null = True)
    image = models.ForeignKey(Image, on_delete=models.SET_NULL, null = True, related_name = 'likes')

    def __str__(self):
        return 'User : {} - Image : {}'.format(self.creator.username, self.image.id)
        