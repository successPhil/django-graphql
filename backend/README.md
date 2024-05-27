# Initial SetUp

We are going to make use of a provided fixture, so that we can quickly seed data into our DB and focus on the setup of graphQL

We need to:
1. `cd` to the location we want to create our django project (typically backend/)
2. Create a virtual environment
3. Install Django
4. Install Graphene
5. Install psycopg
6. Create Django Project
7. Create Movie App
8. Dockerfile for DB
9. Update Django settings for DB
10. Create Movies model in movies app
11. Add fixtures/movies.json to movies app
12. Make Migrations
13. Load Fixture
14. Add middleware


- Installing django and graphene

```
pip install graphene-django
```

- Installing psycopg

```
pip install "psycopg[binary]"
```





- Creating Django Project

```
python -m django startproject movies_project .
```

- Creating movies app

```
python manage.py startapp movies
```




You do not need to necessarily use Docker, but if you insist on not using it, you need to make sure that you have a postgres database locally that you can run.

- Here is a example `docker-compose.yml` that you can use to create a postgres DB in a container:

```
version: '3'
services:
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=movies_db
    ports:
      - '5454:5432'
```



You should be able to run `docker compose up -d` and start your container

If you run `docker ps` and see that you have a postgres image running with port 5454 mapped to port 5432, then things are going good.



- Now go to your django settings, we need to update our `INSTALLED_APPS` and `DATABASES`:

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'movies_db',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': '5454'
    }
}
```


For installed apps, we need to add `graphene_django` and `movies` to our installed apps


* If you have correctly configured everything, you should be able to run your server, but do NOT migrate *



- You will want to migrate after you create the models you wish to use, in our case the Movies model:

```
from django.db import models

class Movies(models.Model):
    Rank = models.IntegerField()
    Title = models.CharField()
    Year = models.IntegerField()
    Length = models.CharField()
    Rating = models.CharField()

```


Now you can check that you are able to run the following:
`python manage.py makemigrations`
`python manage.py migrate`
`python manage.py loaddata movies`

If everything was successful, you should be see that 250 objects were loaded into the DB.



So at this point, we would typically use Django Rest Framework, and use our movie data in our DB to create a REST API.

Today however, we are going to consume this data from our DB and make it available at a graphQL endpoint.



# GraphQL setup

Double check that you have added `graphene_django` to `INSTALLED_APPS` in your django settings.

- Define the graphQL schema location in your SETTINGS.

```
GRAPHENE = {
    "SCHEMA": "movies_project.schema.schema"
}
```
We will need to create a `schema.py` file in our `movies_project`



- Example movies_project schema.py

```
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
```

A few things to take note of here:
`MoviesType` is a `TypeDef` that we are defining for graphQL
The naming convention is VariableNameType, to help signal that this is a special Type Object

Inside our `Query` class, we define queries that can be used in our graphQL API.
    Here we have defined a query `all_movies`. By default when we use the graphQL interface, the query will be converted to camel case.
    So we would expect to write a query like:

    ```
    Query {
        allMovies {
            id
            Title
            Rank
        }
    }
    ```

Another important thing to note, we named our query `all_movies`
We MUST name our resolver `resolve_all_movies` (resolve_query_name)


- Add graphql endpoint to urls.py in PROJECT urls.

```
from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('admin/', admin.site.urls),
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))),
]
```

If you have set everything up properly, you should be able to verify by running the server and going to `http://localhost:8000/graphql/`

Try using the query we built and verify you can modify the fields you would like to get back in the data easily.


- Add `middleware.py` to `movies_project`:

```
class CorsMiddleware:
	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		response = self.get_response(request)
		response['Access-Control-Allow-Origin'] = "*"
		response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
		response["Access-Control-Allow-Methods"] = "DELETE, POST, GET, PUT, OPTIONS"
		if request.method == "OPTIONS":
			response.status_code = 200
		return response
```

- Add `movies_project.middleware.CorsMiddleware` to your MIDDLEWARE in `settings.py`:

```
  'movies_project.middleware.CorsMiddleware',
```


# Checkpoint 1

Ok, at this point your django backend is built, and is configured to interact with a postgres DB and has a graphQL API endpoint available.

Before we get too carried away with all the fancy things we can do with this new tool. Its not a bad idea to go ahead and build our React Frontend and verify that we can request and recieve data from our graphQL endpoint.

The appropriate instructions to create a vite react project that uses ApolloClient (needed for graphQL) can be found in our frontend README








