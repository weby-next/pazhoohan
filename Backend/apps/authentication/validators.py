from django.core.validators import RegexValidator

phone_validator = RegexValidator(
    regex= r'^09\d{9}$',
    message= 'شماره تلفن نامعتبر است!'
)


nationalCode_validator = RegexValidator(
    regex= r'^\d{10}$',
    message = 'کد ملی نامعتبر است'
)


otp_validator = RegexValidator(
    regex=r'^\d{6}$',
    message='کد وارد شده نامعتبر است'
)


date_validator = RegexValidator(
    regex=r'^\d{4}-\d{2}-\d{2}',
    message='فرمت تاریخ تولد => YYYY-MM-DD'
)