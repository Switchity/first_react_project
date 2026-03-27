from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from django.db import transaction
from .models import Student


@api_view(['POST'])
@parser_classes([MultiPartParser])
def upload_students(request):
    file = request.FILES.get('file')

    if not file:
        return Response({"error": "No file uploaded"}, status=400)

    if not file.name.endswith('.txt'):
        return Response({"error": "Only .txt files allowed"}, status=400)

    success_count = 0
    errors = []

    try:
        with transaction.atomic():  # 🔥 ensures all-or-nothing

            for i, line in enumerate(file, start=1):
                try:
                    line = line.decode('utf-8').strip()

                    if not line:
                        continue  # skip empty lines

                    parts = line.split(',')

                    if len(parts) != 3:
                        raise ValueError("Invalid format")

                    name, email, roll = [p.strip() for p in parts]

                    # Optional: prevent duplicates
                    if Student.objects.filter(roll_number=roll).exists():
                        continue

                    Student.objects.create(
                        name=name,
                        email=email,
                        roll_number=roll
                    )

                    success_count += 1

                except Exception as e:
                    errors.append({
                        "line": i,
                        "error": str(e),
                        "data": line
                    })

        return Response({
            "message": "Upload completed",
            "success_count": success_count,
            "error_count": len(errors),
            "errors": errors[:5]  # limit output
        })

    except Exception as e:
        return Response({
            "error": "File processing failed",
            "details": str(e)
        }, status=500)