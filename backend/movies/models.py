from django.db import models

# Create your models here.
class Movies(models.Model):
    Rank = models.IntegerField()
    Title = models.CharField()
    Year = models.IntegerField()
    Length = models.CharField()
    Rating = models.CharField()
