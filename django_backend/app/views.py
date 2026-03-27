from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_data(request):
    return Response({
        "status": "Success",
        "source": "Django (Python 3.14)",
        "message": "Triple Stack Connection Established!"
    })
