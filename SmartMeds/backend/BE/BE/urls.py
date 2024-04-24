"""
URL configuration for BE project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from FoodApp.views import SignupView, LoginView, ConsultationView,DocInfoView,PatientInfoView,get_times

from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('admin/', admin.site.urls),

    path('signup/',csrf_exempt( SignupView.as_view()), name='signup'),
    path('login/', csrf_exempt( LoginView.as_view()), name='login'),
    path('consultations/',csrf_exempt( ConsultationView.as_view()), name='consultation'),
    path('docinfo/',csrf_exempt( DocInfoView.as_view()), name='docinfo'),
    path('patientinfo/',csrf_exempt( PatientInfoView.as_view()), name='patientinfo'),
    path('api/times/', get_times, name='get_times'),
   

    # path('api/users/', UserList.as_view(), name='user-list'),
    # path('api/users/<int:pk>/', UserDetail.as_view(), name='user-detail'),

    # #dash Test Data
    #  path('api/food/', food_list, name='food_list'),
 
    #  #posting a single review from user
    #   path('review/create/', csrf_exempt(ReviewCreateView.as_view()), name='review-create'),
    #  path('save-review/', csrf_exempt( SaveReviewView.as_view()), name='save_review'),        ######extra
    #  path('get_reviews', csrf_exempt(get_reviews), name='get_reviews'),
    

    # path('status/', csrf_exempt(complaint_status), name='complaint_status'), ####extra
    # #Actual restdata
    # path('api/restdata/', get_rest_data, name='get_rest_data'),

    # #Menu
    # path('menu/',csrf_exempt(Menu.as_view()), name='Menu'),

    # path('cart/', csrf_exempt(cart_api), name='cart_api'),
    #   path('cart/truncate/', truncate_cart, name='truncate_cart'),

    # path('order-recommendation/', OrderRecommendation.as_view(), name='order_recommendation'),
    # path('rest-recommendation/', RestRecommendation.as_view(), name='rest_recommendation'),
    




    # ######Saving Data############
    # #saving the reviews
    # path('api/save_restaurants/', csrf_exempt(save_restaurants), name='save_restaurants'),
    #  path('save_reviews', csrf_exempt(save_reviews), name='save_reviews'),
    # path('save_orders', csrf_exempt(OrderCreateAPIView.as_view()), name='order-create'),
    # path('api/save_users/', csrf_exempt(save_users), name='save_users'),

    # #test data

    # path('api/save_food_data/', csrf_exempt(SaveFoodDataView.as_view()), name='save_food_data'),


]