from django.core.validators import RegexValidator

date_validator = RegexValidator(
    regex=r'^\d{4}-\d{2}-\d{2}',
    message='فرمت تاریخ تولد => YYYY-MM-DD'
)