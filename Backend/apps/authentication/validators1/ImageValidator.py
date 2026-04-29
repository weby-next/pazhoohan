from rest_framework import serializers

def validate_webp_image(image):

    max_size = 2 * 1024 * 1024

    if image.size > max_size:
        raise serializers.ValidationError("max size is 2MB")

    ext = image.name.split('.')[-1].lower()

    if ext != "webp":
        raise serializers.ValidationError("only webp allowed")

    return image