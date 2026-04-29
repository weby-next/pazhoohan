from rest_framework import serializers
from ..models import ImagePortfolio
from ..validators1.ImageValidator import validate_webp_image

class ImagePortfolioSerializer(serializers.ModelSerializer):
    full_body_url = serializers.ImageField(validators=[validate_webp_image])
    full_shot_url = serializers.ImageField(validators=[validate_webp_image])

    class Meta:
        model = ImagePortfolio
        fields = "__all__"
        read_only_fields = ['user', 'created', 'updated']