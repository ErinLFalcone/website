from django.urls import path

from . import views

urlpatterns = [
    path("", views.pasture_planner, name="ffxiv-pasture")
]