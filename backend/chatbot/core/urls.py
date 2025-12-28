from django.urls import path
from .views import ChatView, list_conversations, get_messages, delete_conversation

urlpatterns = [
    path("chat/", ChatView.as_view(), name="chat"),
    path("conversations/", list_conversations, name="conversations"),
    path(
        "conversations/<int:conversation_id>/messages/", get_messages, name="messages"
    ),
    path(
        "conversations/<int:conversation_id>/",
        delete_conversation,
        name="delete-conversation",
    ),
]
