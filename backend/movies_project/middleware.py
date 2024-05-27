from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.authentication import JWTAuthentication

class JWTAuthMiddleware(MiddlewareMixin):
    def resolve(self, next, root, info, **kwargs):
        request = info.context
        auth = request.META.get('HTTP_AUTHORIZATION')
        if auth:
            auth = auth.split(' ')[1]
            user_auth_tuple = JWTAuthentication().authenticate(request)
            if user_auth_tuple is not None:
                request.user = user_auth_tuple[0]
        return next(root, info, **kwargs)


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