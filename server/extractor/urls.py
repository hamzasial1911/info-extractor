from django.urls import path

from . import views

urlpatterns = [
    path("extract-data/", views.extract_data, name="extract_data"),
]
