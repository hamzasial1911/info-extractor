import json

import requests
from django.contrib.auth import authenticate, get_user_model, login
from django.contrib.auth.hashers import make_password

# api/views.py
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer


@api_view(["POST"])
def signup(request):
    """
    Create a new user account and return a token upon successful registration.

    Args:
        request (HttpRequest): The HTTP request object containing user data.

    Returns:
        Response: A JSON response containing user information and a token.

    """
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data["password"])
        user.save()
        token, _ = Token.objects.get_or_create(user=user)
        response = {
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "token":token.key,
        }
        return Response(response, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login_view(request):
    """
    Authenticate a user and return a token upon successful login.

    Args:
        request (HttpRequest): The HTTP request object containing user credentials.

    Returns:
        Response: A JSON response containing user information and a token.

    """
    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(request, username=email, password=password)

    if user is not None:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        response = {
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "token":token.key,
        }
        return Response(response, status=status.HTTP_200_OK)
    else:
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED,
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def google_auth(request):
    """
    Authenticate a user using a Google token and return a token upon successful authentication.

    Args:
        request (HttpRequest): The HTTP request object containing the Google token.

    Returns:
        Response: A JSON response containing user information and tokens.

    """
    payload = {"access_token": request.data.get("token")}  # validate the token
    r = requests.get(
        "https://www.googleapis.com/oauth2/v3/userinfo", params=payload
    )
    data = json.loads(r.text)
    if "error" in data:
        content = {
            "message": {
                "wrong google token / this google token is already expired."
            }
        }
        return Response(content, status=status.HTTP_404_NOT_FOUND)
    # create user if not exist
    User = get_user_model()
    try:
        user = User.objects.get(email=data["email"])
    except:
        user = User(
            email=data.get('email',''),
            first_name = data.get("given_name", ""),
            last_name = data.get("family_name", ""),
            password=make_password(User.objects.make_random_password()),
        )
        user.save()

    token1 = RefreshToken.for_user(
        user
    )  # generate token without username & password
    token, _ = Token.objects.get_or_create(user=user)
    response = {
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "access": str(token1.access_token),
        "refresh": str(token1),
        "token": token.key,
    }
    return Response(response, status=status.HTTP_200_OK)
