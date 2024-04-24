import json,os
from django.core.management.base import BaseCommand
from FoodApp.models import Restaurant

class Command(BaseCommand):
    help = 'Load restaurants from JSON file'

    def handle(self, *args, **options):
        file_path = 'C:/Users/ashwi/Desktop/Suyati/WebApp/Food-Order-Recommendation-System-Suyati-Project/backend/BE/RestData.json'

        with open(file_path) as f:
            data = json.load(f)

        for item in data:
            Restaurant.objects.create(
                restaurant_id=item['food_id'],
                food_id=item['food_id'],
                food=item['food'],
                type=item['type'],
                veg_non=item['veg_non'],
                describe=item['describe'],
                price=item['price'],
                delivery_charge=item['delivery_charge'],
                serving_distance=item['serving_distance'],
                prepration_time=item['prepration_time'],
                discount_percentage=item['discount_percentage'],
                rating=item['rating'],
                restaurant=item['restaurant'],
                address=item['address'],
                indicator=item['indicator']
            )

        self.stdout.write(self.style.SUCCESS('Restaurants loaded successfully.'))
