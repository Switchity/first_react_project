from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from django.db import transaction
from .models import Student
import requests
import pandas as pd
import uuid



@api_view(['POST'])
@parser_classes([MultiPartParser])
def upload_students(request):
    unique_id = str(uuid.uuid4())
    file = request.FILES.get('file')
    print("file:", file)

    if not file:
        return Response({"error": "No file uploaded"}, status=400)

    if not file.name.endswith('.txt'):
        return Response({"error": "Only .txt files allowed"}, status=400)

    success_count = 0
    errors = []
    data_list = []   # 🔥 collect data for DataFrame

    try:
        for i, line in enumerate(file, start=1):
            try:
                line = line.decode('utf-8').strip()

                if not line:
                    continue

                parts = [p.strip() for p in line.split(',')]
                print("parts==:", parts)

                if len(parts) != 3:
                    raise ValueError("Invalid format. Expected: name,email,roll")

                name, email, roll = parts

                # ✅ Add to list (for pandas)
                data_list.append({
                    "name": name,
                    "email": email,
                    "roll_number": roll,
                    "batch_id": unique_id
                })

                success_count += 1

            except Exception as e:
                errors.append({
                    "line": i,
                    "error": str(e),
                    "data": line
                })

        # ✅ Create DataFrame (AFTER loop)
        df = pd.DataFrame(data_list)
        print("DataFrame:\n", df)

        # ✅ Save to DB (bulk insert - FAST)
        students = [
            Student(
                name=row["name"],
                email=row["email"],
                roll_number=row["roll_number"]
            )
            for _, row in df.iterrows()
        ]

        Student.objects.bulk_create(students)

        return Response({
            "message": "Upload completed",
            "batch_id": unique_id,
            "success_count": success_count,
            "error_count": len(errors),
            "errors": errors[:5]
        })

    except Exception as e:
        return Response({
            "error": "File processing failed",
            "details": str(e)
        }, status=500)


# ✅ 1. Basic Django test
@api_view(['GET'])
def get_data(request):
    print("Django API hit ✅")
    return Response({
        "status": "Success",
        "source": "Django",
        "message": "Django working"
    })


# ✅ 2. Django → Node test
@api_view(['GET'])
def test_node(request):
    try:
        res = requests.get("http://localhost:5000/api/test")

        return Response({
            "django": "OK",
            "node_response": res.json()
        })
    except Exception as e:
        return Response({"error": str(e)}, status=500)

# ✅ 3. Full chain test
@api_view(['GET'])
def full_chain(request):
    try:
        node_res = requests.get("http://localhost:5000/test")

        return Response({
            "react": "connected",
            "django": "connected",
            "node": node_res.json()
        })
    except Exception as e:
        return Response({"error": str(e)}, status=500)