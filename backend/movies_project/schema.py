import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from movies.models import Movies
from django.contrib.auth.models import User
from users.models import UserProfile

class UserType(DjangoObjectType):
    class Meta:
        model = User

class MoviesType(DjangoObjectType):
    class Meta:
        model = Movies
        fields = '__all__'

class UserProfileType(DjangoObjectType):
    class Meta:
        model = UserProfile

class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, username, password):
        user = User.objects.create_user(username=username, password=password)
        UserProfile.objects.create(user=user)
        return CreateUser(user=user)

class CreateMovie(graphene.Mutation):
    movie = graphene.Field(MoviesType)

    class Arguments:
        title = graphene.String(required=True)
        year = graphene.Int(required=True)
        rank = graphene.Int(required=True)
        length = graphene.String(required=True)
        rating = graphene.String(required=True)

    def mutate(self, info, title, year, rank, length, rating):
        movie = Movies.objects.create(title=title, year=year, rank=rank, length=length, rating=rating)
        return CreateMovie(movie=movie)

class AddToFavoriteMovies(graphene.Mutation):
    user_profile = graphene.Field(UserProfileType)

    class Arguments:
        movie_id = graphene.Int(required=True)

    def mutate(self, info, movie_id):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not logged in!")
        movie = Movies.objects.get(id=movie_id)
        user_profile = UserProfile.objects.get(user=user)
        user_profile.favorite_movies.add(movie)
        return AddToFavoriteMovies(user_profile=user_profile)
    
class ObtainJSONWebToken(graphene.Mutation):
    token = graphene.String()

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, username, password):
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return ObtainJSONWebToken(token=str(refresh.access_token))
        raise Exception('Invalid credentials')

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    create_movie = CreateMovie.Field()
    add_to_favorite_movies = AddToFavoriteMovies.Field()
    obtain_token = ObtainJSONWebToken.Field()

class Query(graphene.ObjectType):
    me = graphene.Field(UserType)
    all_movies = graphene.List(MoviesType)
    
    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not logged in!")
        return user
    
    def resolve_all_movies(root, info):
        return Movies.objects.all()
    

schema = graphene.Schema(query=Query, mutation=Mutation)

    