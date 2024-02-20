from django.urls import path
from . import views

urlpatterns = [
    path('', views.predict, name='predict'),
    path('predict', views.predict, name='predict'),
    path('correct_prediction', views.correct_prediction, name='correct_prediction')
]