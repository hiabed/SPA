from    django.urls             import path
from    usermangement           import views

urlpatterns=[
    path('update/', views.update_user),
    path('Profile/', views.profile),
    path('list/', views.users_list), #user/list/   ==> suggestion.
    path('get_user_info/', views.get_user),
    path('ChangePass/', views.ChangePassword), # update password and also username
    path('send_friend/<int:receiver_id>/', views.send_friend_request), # a dynamic segment <int:receiver_id>,  #user/send_friend/id/ 
    path('refuse_request/<int:receiver_id>/', views.refuse_request), # a dynamic segment <int:receiver_id>,     #user/reject_request/id/ 
    path('accepte_request/<int:receiver_id>/', views.accepte_request) # a dynamic segment <int:receiver_id>,     #user/reject_request/id/ 
    # add delete in suggestion.
]
