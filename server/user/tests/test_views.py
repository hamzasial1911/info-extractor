from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
import json

class SignupViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.signup_url = reverse("signup")
        self.valid_payload = {
            "email": "test@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "password": "testpassword",
        }

    def test_signup_valid_user(self):
        response = self.client.post(self.signup_url, self.valid_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_signup_existing_user(self):
        # Create a user with the same email as in the payload
        get_user_model().objects.create_user(**self.valid_payload)
        response = self.client.post(self.signup_url, self.valid_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class LoginViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.login_url = reverse("login")
        self.user = get_user_model().objects.create_user(
            email="test@example.com", password="testpassword"
        )
        self.valid_payload = {
            "email": "test@example.com",
            "password": "testpassword",
        }
        self.invalid_payload = {
            "email": "test@example.com",
            "password": "wrongpassword",
        }

    def test_login_valid_user(self):
        response = self.client.post(self.login_url, self.valid_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_invalid_user(self):
        response = self.client.post(self.login_url, self.invalid_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


# class GoogleAuthViewTestCase(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.google_auth_url = reverse("google-auth")
#         self.valid_payload = {"token": "valid_google_token"}
#         self.invalid_payload = {"token": "invalid_google_token"}

#     def test_google_auth_valid_token(self):
#         # Mock the external API response for a valid token
#         valid_token_response = {
#             "email": "test@example.com",
#             "given_name": "John",
#             "family_name": "Doe",
#         }
#         with self.settings(GOOGLE_AUTH_API_URL="https://mocked-google-auth-url.com"):
#             response = self.client.post(
#                 self.google_auth_url, self.valid_payload, format="json"
#             )
#             self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_google_auth_invalid_token(self):
#         # Mock the external API response for an invalid token
#         invalid_token_response = {"error": "invalid_token"}
#         with self.settings(GOOGLE_AUTH_API_URL="https://mocked-google-auth-url.com"):
#             response = self.client.post(
#                 self.google_auth_url, self.invalid_payload, format="json"
#             )
#             self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
