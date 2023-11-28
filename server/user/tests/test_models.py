from django.test import TestCase
from django.contrib.auth import get_user_model

class UserModelTestCase(TestCase):
    def setUp(self):
        self.user_data = {
            "email": "test@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "password": "testpassword",
        }

    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(user.email, self.user_data["email"])
        self.assertEqual(user.first_name, self.user_data["first_name"])
        self.assertEqual(user.last_name, self.user_data["last_name"])
        self.assertTrue(user.check_password(self.user_data["password"]))
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        User = get_user_model()
        superuser = User.objects.create_superuser(**self.user_data)
        self.assertTrue(superuser.is_active)
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)
