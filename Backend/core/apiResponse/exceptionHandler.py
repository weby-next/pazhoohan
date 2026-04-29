from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is None:
        return response

    return response.__class__({
        "success": False,
        "message": "Validation error",
        "errors": response.data
    }, status=response.status_code)
