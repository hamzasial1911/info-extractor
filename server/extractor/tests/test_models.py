from django.test import TestCase
from extractor.models import ExtractedData

class ExtractedDataModelTestCase(TestCase):
    def test_create_extracted_data(self):
        data = ExtractedData(
            start_date="2023-01-01",
            end_date="2023-02-01",
            min_contribution=100.50,
            max_contribution=500.75,
        )
        data.save()

        self.assertEqual(data.start_date, "2023-01-01")
        self.assertEqual(data.end_date, "2023-02-01")
        self.assertEqual(data.min_contribution, 100.50)
        self.assertEqual(data.max_contribution, 500.75)
