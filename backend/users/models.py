from django.contrib.auth.models import User
from django.db import models
from movies.models import Movies

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorite_movies = models.ManyToManyField(Movies, related_name='favorited_by', blank=True)

    def __str__(self):
        return self.user.username
