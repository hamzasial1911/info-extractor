from django.db import models


# Create your models here.
class ExtractedData(models.Model):
    start_date = models.CharField(max_length=200)
    end_date = models.CharField(max_length=200)
    min_contribution = models.DecimalField(max_digits=10, decimal_places=2)
    max_contribution = models.DecimalField(max_digits=10, decimal_places=2)
