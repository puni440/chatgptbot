from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegistrationSerializer, LoginSerializer


class RegistrationView(APIView):

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)

        if not serializer.is_valid():
            print(serializer.errors["data"])
            return Response(
                {"data": serializer.errors["data"]}, status=status.HTTP_409_CONFLICT
            )
        user = serializer.save()
        return Response(
            {"data": f"User {user.username} created successfully"},
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors["data"])
            return Response(
                {"data": serializer.errors["data"]}, status=status.HTTP_409_CONFLICT
            )

        return Response({"data": serializer.validated_data}, status=status.HTTP_200_OK)
