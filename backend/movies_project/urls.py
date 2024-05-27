from django.contrib import admin
from django.urls import path, include
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt

from .middleware import JWTAuthMiddleware

class CustomGraphQLView(GraphQLView):
    def get_context(self, request):
        context = super().get_context(request)
        context.user = request.user
        return context

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path("graphql/", csrf_exempt(CustomGraphQLView.as_view(graphiql=True))),
]
