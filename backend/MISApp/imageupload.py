from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

@api_view(['POST'])
def upload_image(request):
    # Get the file from request
    file = request.FILES['file']

    # Make a POST request to the PhotoPrism server with the file
    headers = {'X-Session-ID': '42fe4871f35ae4e74511a3cdc1d1c48f4a007e5da4d49c02'}
    response = requests.post('http://35.224.74.50/api/v1/photos', files={'file': file}, headers=headers)

    # Return the response from the PhotoPrism server
    return Response(response.json(), status=status.HTTP_201_CREATED)

@api_view(['GET'])
def view_images(request):
    # Make a GET request to the PhotoPrism server
    headers = {'X-Session-ID': '42fe4871f35ae4e74511a3cdc1d1c48f4a007e5da4d49c02'}
    response = requests.get('http://35.224.74.50/api/v1/photos', headers=headers)

    # Return the response from the PhotoPrism server
    return Response(response.json(), status=status.HTTP_200_OK)