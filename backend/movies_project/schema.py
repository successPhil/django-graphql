import graphene
from graphene_django import DjangoObjectType

from movies.models import Movies

class MoviesType(DjangoObjectType):
    class Meta:
        model = Movies
        fields = '__all__'

class Query(graphene.ObjectType):
    all_movies = graphene.List(MoviesType)
    
    def resolve_all_movies(root, info):
        return Movies.objects.all()
    

schema = graphene.Schema(query=Query)

    