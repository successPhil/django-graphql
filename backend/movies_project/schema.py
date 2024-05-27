import graphene
from graphene_django import DjangoObjectType
from random import choice

from movies.models import Movies


class MoviesType(DjangoObjectType):
    class Meta:
        model = Movies
        fields = '__all__'

class Query(graphene.ObjectType):
    all_movies = graphene.List(MoviesType)
    movie_by_id = graphene.Field(MoviesType, id=graphene.Int(required=True))
    random_movie = graphene.Field(MoviesType)
    
    def resolve_all_movies(root, info):
        return Movies.objects.all()
    
    def resolve_movie_by_id(root, info, id):
        try:
            return Movies.objects.get(pk=id)
        except Movies.DoesNotExist:
            return None
    
    def resolve_random_movie(root, info):
        all_movies = list(Movies.objects.all())
        if all_movies:
            return choice(all_movies)
        return None
    
class CreateMovie(graphene.Mutation):
    movie = graphene.Field(MoviesType)

    class Arguments:
        Title = graphene.String(required=True)
        Year = graphene.Int(required=True)
        Rank = graphene.Int(required=True)
        Length = graphene.String(required=True)
        Rating = graphene.String(required=True)

    def mutate(self, info, Title, Year, Rank, Length, Rating):
        movie = Movies(Title=Title, Year=Year, Rank=Rank, Length=Length, Rating=Rating)
        movie.save()
        return CreateMovie(movie=movie)

class Mutation(graphene.ObjectType):
    create_movie = CreateMovie.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)

    