from django.core.management.base import BaseCommand
from ....authentication.models import Category


class Command(BaseCommand):
    help = "افزودن دسته‌بندی‌های پایه به سیستم"

    def handle(self, *args, **options):
        categories_data = [
            {"name": "fashion", "description": ""},
            {"name": "sportswear_men", "description": ""},
            {"name": "sportswear_women", "description": ""},
            {"name": "formal_men", "description": ""},
            {"name": "formal_women", "description": ""},
            {"name": "casual", "description": ""},
            {"name": "editorial", "description": ""},
            {"name": "advertisment", "description": ""},
            {"name": "beauty", "description": ""},
            {"name": "product", "description": ""},
            {"name": "lifestyle", "description": ""},
            {"name": "lookbook", "description": ""},
            {"name": "streetwear", "description": ""},
            {"name": "underwear", "description": ""},
            {"name": "underwear", "description": ""},
            {"name": "accessories", "description": ""},
            {"name": "runway", "description": ""},
            {"name": "campaign", "description": ""},
            {"name": "ecommerce", "description": ""},
            {"name": "others", "description": ""},
        ]

        for data in categories_data:
            obj, created = Category.objects.get_or_create(
                name=data["name"],
                defaults={
                    "description": data["description"],
                },
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'✔ دسته "{obj.name}" اضافه شد'))
            else:
                self.stdout.write(self.style.WARNING(f'⚠ دسته "{obj.name}" از قبل وجود دارد'))

        self.stdout.write(self.style.SUCCESS("✅ عملیات افزودن دسته‌ها با موفقیت انجام شد"))
