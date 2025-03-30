from django.db import models

# Create your models here.
class DivisionPrices(models.Model):
    division = models.IntegerField(null=False, unique=True)
    price = models.FloatField(null=False, unique=True)

