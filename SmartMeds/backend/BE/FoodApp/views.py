from django.shortcuts import render

# Create your views here.
from django.views import View
from django.http import JsonResponse,HttpResponse
from django.core import serializers
from django.urls import reverse
from .models import Patient,Doctor,Consultation,PatientLogin,DoctorLogin
import json
from django.views.decorators.csrf import csrf_exempt




# from .Recommendation.Order.collect_pkl_and_run_pkl import Get_Recommendations


class SignupView(View):
    @csrf_exempt
    def post(self, request):
        # Deserialize JSON data from request body
        data = json.loads(request.body)
        existing_user = None
        print('Received data:', data)

        existing_user = Patient.objects.filter(email=data.get('email')).first()
        # Check if the user already exists in the database
        
        # existing_user = User.objects.filter(email=data[0]['email']).first()
        if existing_user is not None:
            return JsonResponse({'error': 'User with this email already exists'})
        else:
            if data['userType'] == 'patient':
            
                patient = Patient(
                email=data['email'], 
                password=data['password'], 
                first_name=data['firstName'],
                last_name=data['lastName'],
                patient_id = data['patientId'],
                age = data['age'],
                #patient_image = data['patientImage']
                )
                # if 'patient_image' in data and data['patient_image']:
                #     image_data = data['patient_image'].split(';base64,')
                #     if len(image_data) == 2:
                #         image_content = ContentFile(base64.b64decode(image_data[1]), name='patient_image.jpg')
                #         patient.patient_image.save('patient_image.jpg', image_content)

                patient.save()
            else:
            
                doctor = Doctor(
                email=data['email'], 
                password=data['password'], 
                first_name=data['firstName'],
                last_name=data['lastName'],
                doctor_id = data['patientId'],
                hospital = data['hospital'],
                department = data['department']
                )
                doctor.save()
        return JsonResponse({'success': True})





class LoginView(View):
    @csrf_exempt
    def post(self, request):
        # Deserialize JSON data from request body
        data = json.loads(request.body)        
        existing_user = None
        print('Received data:', data)
     
       
        #Check if the user already exists in the database
        if data['userType'] == 'patient':
            existing_user = Patient.objects.filter(patient_id=data.get('id'), password=data.get('password')).first()
        else:
            existing_user = Doctor.objects.filter(doctor_id=data.get('id'), password=data.get('password')).first()
    
        
        if existing_user is not None:
           
           if data['userType'] == 'patient':
                patient_id= existing_user.patient_id
                #storing user id for session 
                patient=PatientLogin(patient_id_id=patient_id)
                patient.save()
                
    #Cart.objects.all().delete()
           #storing user id for session 
            #request.session['user_id'] = user_id 
            
                #print(patient_id)
                return JsonResponse({'success':True})
           else:
                doctor_id= existing_user.doctor_id
            
                doctor=DoctorLogin(doctor_id_id=doctor_id)
                doctor.save()
                return JsonResponse({'success':True})
            #return JsonResponse({'success':True})
        else:
            return JsonResponse({'error': 'User does not exist'})
      


class ConsultationView(View):
    def post(self, request):
        data = json.loads(request.body)
        medicines_json = json.dumps(data['medicines'])
        consultation = Consultation.objects.create(
                patient_id_id=data['patient_id'],
                doctor_id_id=data['doctor_id'],
                comment=data.get('comment', ''),
                date=data['date'],
                medicines=medicines_json
                  )
        return JsonResponse({'success': True, 'consult_id': consultation.consult_id}, status=201)
       
        
    def get(self, request):
        patient_id = PatientLogin.objects.first().patient_id

        print(patient_id)
        consultations = Consultation.objects.filter(patient_id=patient_id)
        #print(patient_id)
        consultation_list = []
        for consultation in consultations:
            # medicines_list = []
            # for medicine in consultation.medicines:
            #     medicine_dict = {
            #         'medname': medicine.medname,
            #         'dosage': medicine.dosage,
            #         'qty': medicine.qty
            #     }
            #     medicines_list.append(medicine_dict)
            medicines = json.loads(consultation.medicines)
            # print(medicines)
            consultation_dict = {
                'consult_id': consultation.consult_id,
                'patient_id': consultation.patient_id_id,
                'doctor_id': consultation.doctor_id_id,
                'comment': consultation.comment,
                'date': consultation.date,
                'medicines': medicines
            }
            consultation_list.append(consultation_dict)
        # print(consultation_list)
        return JsonResponse(consultation_list, status=200,safe=False)
    

class DocInfoView(View):       
        
    def get(self, request):
    
        patient_id = PatientLogin.objects.first().patient_id
        consultation = Consultation.objects.filter(patient_id=patient_id).first()
       
        if consultation:
            doc_id = consultation.doctor_id.doctor_id  # Access the ID attribute directly
            #print(doc_id)  # Print the value of doc_id
            
            doctor = Doctor.objects.filter(doctor_id=doc_id).first()
            
            if doctor:
                doctor_id = doctor.doctor_id
            doctor = Doctor.objects.filter(doctor_id=doctor_id).first()
            doctor_list=[]
            doctor_info = [{
                    'doctor_id': doctor.doctor_id,
                    'firstName': doctor.first_name,
                    'lastName': doctor.last_name,
                    'department': doctor.department,
                    'hospital': doctor.hospital,
                    'email': doctor.email,
                }]
            # doctor_list.append(doctor_info)
            return JsonResponse(doctor_info, status=200,safe=False)
  
        else:
            return JsonResponse({'error': 'Consultation not found'}, status=404)
    
class PatientInfoView(View):       
        
    def get(self, request):
        patient_id = PatientLogin.objects.first().patient_id
        print(patient_id)
        patient = Patient.objects.get(patient_id=patient_id.patient_id) # Assuming you want to return info for the first patient
        data = {
            'patient_id': patient.patient_id,
            'firstName': patient.first_name,
            'lastName': patient.last_name,
            'age': patient.age,
            'email': patient.email,
        }
        return JsonResponse(data)
    
from django.utils import timezone
from .models import Time
import time



def get_times(request=None):
    while True:
        current_time = timezone.now().time()
        print(current_time)
        times = Time.objects.filter(time__lte=current_time)
        
        # List to store the times that need to be cleared
        times_to_clear = []

        if times.exists():
            print("Notification: It's time for alert!")
            # You can trigger any other notification mechanism here
            
            # Add times to the list to be cleared
            times_to_clear.extend(times)
        else:
            print("No")
        # Delete the times that need to be cleared
        for time_obj in times_to_clear:
            time_obj.delete()

        # Fetch the remaining times (if any) after deletion
        remaining_times = Time.objects.all()

        # Wait for 60 seconds before checking again
        time.sleep(30)
        get_times()
    # This part of the code will never be reached, as the loop runs indefinitely
        return JsonResponse({"status": "success"})
#     def post(self, request):
#         # Deserialize JSON data from request body
#         data = json.loads(request.body)

#         print('Received data:', data)
        
#         # Check if the user with the given email exists in the database
#         user = User.objects.filter(email=data['email']).first()
#         if user is None:
#             return JsonResponse({'error': 'User with this email does not exist'})

#         # Check that the new password and confirm password match
#         if data['new_password'] != data['confirm_password']:
#             return JsonResponse({'error': 'New password and confirm password do not match'})

#         # Set the new password for the user and save it to the database
#         user.set_password(data['new_password'])
#         user.save()

#         # Return a success message
#         return JsonResponse({'message': 'Password reset successful'})


# def user_list(request):
#     users = User.objects.all()
#     data = serializers.serialize('json', users)
#     return JsonResponse(data, safe=False)





# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .serializers import UserSerializer
# from .models import User

# class UserList(APIView):
#     def get(self, request):
#         users = User.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UserDetail(APIView):
#     def get_object(self, pk):
#         try:
#             return User.objects.get(pk=pk)
#         except User.DoesNotExist:
#             raise Http404

#     def get(self, request, pk):
#         user = self.get_object(pk)
#         serializer = UserSerializer(user)
#         return Response(serializer.data)

#     def put(self, request, pk):
#         user = self.get_object(pk)
#         serializer = UserSerializer(user, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         user = self.get_object(pk)
#         user.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# ### dash data
# def food_list(request):
#     user_id = request.session.get('user_id')
#     print(user_id)
#     food_data = list(FoodDataTest.objects.values())
    

#     return JsonResponse(food_data, safe=False)


# import mysql.connector
# import json

# # Establish a connection to your MySQL database
# mydb = mysql.connector.connect(
#   host="localhost",
#   user="root",
#   password="123456",
#   database="foodiko"
# )
# ############################################# REVIEWS ################################################################
# @csrf_exempt
# def get_reviews(request):
#     # Create a cursor object to execute queries
#     mycursor = mydb.cursor()

#     # Execute your query
#     mycursor.execute("SELECT * FROM ReviewTest")

#     # Fetch all rows as a list of tuples
#     rows = mycursor.fetchall()

#     # Create a dictionary to hold your reviews data
#     reviews_dict = {"Reviews": {}}

#     # Loop through each row and add it to the appropriate restaurant key
#     for row in rows:
#         restaurant = row[1]
#         review_dict = {
#             "Id": row[0],
#             "Name": row[2],
#             "Rating": row[3],
#             "Review": row[4]
#         }
#         if restaurant in reviews_dict["Reviews"]:
#             reviews_dict["Reviews"][restaurant].append(review_dict)
#         else:
#             reviews_dict["Reviews"][restaurant] = [review_dict]

#     # Convert your dictionary to a JSON string
#     json_string = json.dumps(reviews_dict)

#     # Send the JSON string as a response to your React application
#     print(json_string)

#     return HttpResponse(json_string)

# class ReviewCreateView(View):
#     @csrf_exempt
#     def post(self, request):
#         # Deserialize JSON data from request body
#         data = json.loads(request.body)
        
#         # Extract the necessary data from the JSON
#         user_id = data.get('user_id')
#         restaurant_id = data.get('restaurant_id')
#         vendor_name = data.get('vendor_name')
#         first_name = data.get('first_name')
#         rating = data.get('rating')
#         review_text = data.get('review')

#         # Create a new review instance
#         review = Review(
#             user_id=user_id,
#             restaurant_id=restaurant_id,
#             vendor_name=vendor_name,
#             first_name=first_name,
#             rating=rating,
#             review=review_text
#         )

#         # Save the review to the database
#         review.save()

#         # Return a success response
#         return JsonResponse({'success': True})
    


# class SaveReviewView(View):
#     @csrf_exempt
#     def post(self, request):
#         data = json.loads(request.body)
        
#         restaurant = data.get('restaurant')
#         name = data.get('Name')
#         rating = data.get('Rating')
#         review = data.get('Review')
        
#         # Create a new review object and save it to the database
#         review = Review(restaurant=restaurant, name=name, rating=rating, review=review)
#         review.save()
        
#         return JsonResponse({'success': True})
# #################################################################################################



# ########################## COMPLAINT ######################################################

# class Menu(View):
#     @csrf_exempt
#     def post(self, request):
#         # Deserialize JSON data from request body
#         data = json.loads(request.body)

#         # Extract the restaurant_id from the request data
#         restaurant_id = data.get('restaurant_id')

#         print(restaurant_id)
#         # Retrieve the rows with the specified restaurant_id
#         rows = Restaurant.objects.filter(restaurant_id=restaurant_id)

#         print(rows)
#         # Create a list to store the JSON representation of each row
#         row_list = []

#         # Iterate over the rows and create a dictionary for each one
#         for row in rows:
#             row_data = {
#                 'restaurant_id': row.restaurant_id,
#                 'food_id': row.food_id,
#                 'food': row.food,
#                 'type': row.type,
#                 'veg_non': row.veg_non,
#                 'describe': row.describe,
#                 'price': row.price,
#                 'delivery_charge': row.delivery_charge,
#                 'serving_distance': row.serving_distance,
#                 'discount_percentage': row.discount_percentage,
#                 'rating': row.rating,
#                 'restaurant': row.restaurant,
#                 'address': row.address,
#                 'indicator': row.indicator
#             }

#             # Append the row dictionary to the list
#             row_list.append(row_data)

#         return JsonResponse(row_list,safe=False)




# def complaint_status(request):
#     data = json.loads(request.body)
#   # Assuming the vendor ID is passed in the request body
#     print(data)  # Debugging statement to check the request data
    
#     restaurant_id = data.get('restaurant_id')
#     print(restaurant_id)  # Debugging statement to check the value of restaurant_id
    
#     complaints_count = 0
#     # Calculate the count of complaints with 'yes' status for the specific vendor ID
#     complaints_count = Complaint.objects.filter( restaurant_id_id=restaurant_id).count()
#     print(complaints_count)
#     # Assign the status based on the count
#     if complaints_count < 2:
#         status = 1
#     elif 2<= complaints_count <= 4:
#         status = 2
#     else:
#         status = 3

    

#     # Return the status as a JSON response
#     return JsonResponse({'status': status})




# # Storing after ordered

# class OrderCreateView(View):
#     def post(self, request):
#         orders = json.loads(request.body)
      
#         #Obtaining order_id and user_id
#         us_id = request.session.get('user_id')
#         existing_orders = Order.objects.all().values('order_id', 'food_id')


#         max_order_id = existing_orders.aggregate(Max('order_id'))['order_id__max']
#         ord_id = max_order_id + 1 

    
#         for order in orders:                
#             # Create a new Order object and save it to the database
#             order_obj = Order(
#                 order_id=ord_id,
#                 user_id=us_id,
#                 restaurant_id=order['restaurant_id'],
#                 food_id=order['food_id'],
#                 price=order['price'],
#                 name=order['name'],
#                 quantity=order['quantity']
#                 )
#             order_obj.save()
            
#         return JsonResponse({'message': 'Orders created successfully'})
    
# @csrf_exempt
# def get_rest_data(request):
#     foods = Restaurant.objects.all()
#     food_list = []
    
#     for food in foods:
#         food_data = {
#             "food_id": food.food_id,
#             "food": food.food,
#             "type": food.type,
#             "veg_non": food.veg_non,
#             "describe": food.describe,
#             "price": food.price,
#             "res_id": food.restaurant_id,
#             "delivery_charge": food.delivery_charge,
#             "serving_distance": food.serving_distance,
#             #"OpeningTime": food.OpeningTime,
#             "prepration_time": food.prepration_time,
#             "discount_percentage": food.discount_percentage,
#             "rating": food.rating,
#             "restaurant": food.restaurant,
#             #"contact": food.contact,
#             "address": food.address,
#             "indicator": food.indicator
#         }
#         food_list.append(food_data)
    
#     return JsonResponse(food_list, safe=False)

# @csrf_exempt
# def cart_api(request):
#     if request.method == 'GET':
#         # Retrieve the cart data
#         cart_items = Cart.objects.all()

#         # Create a list to store the JSON representation of each cart item
#         cart_list = []

#         # Iterate over the cart items and create a dictionary for each one
#         for cart_item in cart_items:
#             cart_data = {
#                 'cart_id': cart_item.id,
#                 'restaurant_id': cart_item.restaurant_id,
#                 'food_id': cart_item.food_id,
#                 'price': cart_item.price,
#                 'name': cart_item.name,
#                 'quantity': cart_item.quantity
#             }

#             # Append the cart item dictionary to the list
#             cart_list.append(cart_data)

#         # Create the JSON response
       
#         # Return the JSON response
#         return JsonResponse(cart_list,safe=False)

#     elif request.method == 'PUT':
#         # Update the quantity of a cart item
#         json_data = json.loads(request.body)
#         food_id = json_data.get('food_id')
#         new_quantity = json_data.get('quantity')

#         # Find the cart item with the specified food_id
#         cart_item = Cart.objects.get(food_id=food_id)

#         # Update the quantity of the cart item
#         cart_item.quantity = new_quantity
#         cart_item.save()

#         # Create the JSON response
#         response = {
#             'message': 'Cart item quantity updated successfully.'
#         }

#         # Return the JSON response
#         return JsonResponse(response)

#     elif request.method == 'DELETE':
#         # Delete a row from the cart
#         json_data = json.loads(request.body)
#         food_id = json_data.get('food_id')

#         # Find the cart item with the specified food_id
#         cart_item = Cart.objects.get(food_id=food_id)

#         # Delete the cart item
#         cart_item.delete()

#         # Create the JSON response
#         response = {
#             'message': 'Cart item deleted successfully.'
#         }

#         # Return the JSON response
#         return JsonResponse(response)
    
#     elif request.method == 'POST':
#         # Add a new item to the cart
#         json_data = json.loads(request.body)

#     # Extract the values from the JSON data
#         food_id = json_data.get('food_id')
#         quantity = json_data.get('quantity')
#         restaurant_id = json_data.get('restaurant_id')
#         price = json_data.get('price')
#         name = json_data.get('name')


#         # Create a new cart item
#         cart_item = Cart(
#             restaurant_id=restaurant_id,
#             food_id=food_id,
#             price=price,
#             name=name,
#             quantity=quantity
#         )
#         cart_item.save()

#         response = {
#             'message': 'Cart item added successfully.'
#         }

#         # Return the JSON response
#         return JsonResponse(response)

#     else:
#         # Handle unsupported HTTP methods
#         # Create the JSON response
#         response = {
#             'message': 'Method not allowed.'
#         }

#         # Return the JSON response with a status code of 405 (Method Not Allowed)
#         return JsonResponse(response, status=405)


# @csrf_exempt
# def truncate_cart(request):
#     if request.method == 'POST':
#         # Truncate the Cart table
#         Cart.objects.all().delete()

#         # Create the JSON response
#         response = {
#             'message': 'Cart table truncated successfully.'
#         }

#         # Return the JSON response
#         return JsonResponse(response)

# ###################REcommendation ##############

# class OrderRecommendation(View):
#     def get(self, request):
#         food_id_list = [11, 29, 7]
#         food_ids = Get_Recommendations(food_id_list)
#         data = []
#         #food_ids = [111, 97, 220, 77, 272, 62, 46, 302, 122, 185]
#         print(food_ids)

#         for id in food_ids:
#             print(type(id))

#         for id in food_ids:
#             try:
#                 restaurants = Restaurant.objects.filter(food_id=id)
#                 print(restaurants)
                
#                 for restaurant in restaurants:
#                     data_dict = {
#                         'restaurant_id': restaurant.restaurant_id,
#                         'food_id': restaurant.food_id,
#                         'food': restaurant.food,
#                         'type': restaurant.type,
#                         'veg_non': restaurant.veg_non,
#                         'describe': restaurant.describe,
#                         'price': restaurant.price,
#                         'delivery_charge': restaurant.delivery_charge,
#                         'serving_distance': restaurant.serving_distance,
#                         'prepration_time': restaurant.prepration_time,
#                         'discount_percentage': restaurant.discount_percentage,
#                         'rating': restaurant.rating,
#                         'restaurant': restaurant.restaurant,
#                         'address': restaurant.address,
#                         'indicator': restaurant.indicator
#                     }
#                     data.append(data_dict)
#             except Restaurant.DoesNotExist:
#                 continue

#         return JsonResponse(data, safe=False)
    


# class RestRecommendation(View):
#     def get(self, request):
#         customer_id = 'ZGFSYCZ'
#         customer_ratings = {}

#         recommended_res = Get_Recommendation(customer_id, customer_ratings)
#         data=[]
#         print(recommended_res)
        

#         for id in recommended_res:
#             try:
#                 restaurants = Restaurant.objects.filter(restaurant_id=id)
#                 print(restaurants)
                
#                 for restaurant in restaurants:
#                     data_dict = {
#                         'restaurant_id': restaurant.restaurant_id,
#                         'food_id': restaurant.food_id,
#                         'food': restaurant.food,
#                         'type': restaurant.type,
#                         'veg_non': restaurant.veg_non,
#                         'describe': restaurant.describe,
#                         'price': restaurant.price,
#                         'delivery_charge': restaurant.delivery_charge,
#                         'serving_distance': restaurant.serving_distance,
#                         'prepration_time': restaurant.prepration_time,
#                         'discount_percentage': restaurant.discount_percentage,
#                         'rating': restaurant.rating,
#                         'restaurant': restaurant.restaurant,
#                         'address': restaurant.address,
#                         'indicator': restaurant.indicator
#                     }
#                     data.append(data_dict)
#             except Restaurant.DoesNotExist:
#                 continue

#         return JsonResponse(data, safe=False)

#     ######################################Saving data #############


# @csrf_exempt
# def save_reviews(request):
#     # Get the JSON data from the request
#     data = json.loads(request.body)

#     # Loop through the reviews and save them to the database
#     for restaurant, reviews in data["Reviews"].items():
#         for review in reviews:
#             r = Review(id=review["Id"], restaurant=restaurant, name=review["Name"], rating=review["Rating"], review=review["Review"])
#             r.save()

#     return JsonResponse({"message": "Reviews saved successfully"})

# @csrf_exempt
# def save_restaurants(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         for restaurant_data in data:
#             restaurant = Restaurant(
#                 food_id=restaurant_data['food_id'],
#                 food=restaurant_data['food'],
#                 type=restaurant_data['type'],
#                 veg_non=restaurant_data['veg_non'],
#                 describe=restaurant_data['describe'],
#                 price=restaurant_data['price'],
#                 restaurant_id=restaurant_data['restaurant_id'],
#                 delivery_charge=restaurant_data['delivery_charge'],
#                 serving_distance=restaurant_data['serving_distance'],
#                 #OpeningTime=restaurant_data['OpeningTime'],   # Null issue
#                 prepration_time=restaurant_data['prepration_time'],
#                 discount_percentage=restaurant_data['discount_percentage'],
#                 rating=restaurant_data['rating'],
#                 restaurant=restaurant_data['restaurant'],
#                 #contact=restaurant_data['contact'],          ####error , change to string
#                 address=restaurant_data['address'],
#                 indicator=restaurant_data['indicator']
#             )
#             restaurant.save()
        
#         return JsonResponse({'message': 'Restaurant data saved successfully.'}, status=200)
#     else:
#         return JsonResponse({'error': 'Invalid request method.'}, status=400)

# class OrderCreateAPIView(APIView):
#     @csrf_exempt
#     def post(self, request, format=None):
#         orders =json.loads(request.body)

#         for order_data in orders:
#             order = Order(
#                 order_id=order_data.get('order_id'),
#                 user_id=order_data.get('user_id'),
#                 restaurant_id=order_data.get('restaurant_id'),
#                 food_id=order_data.get('food_id'),
#                 price=order_data.get('price'),
#                 name=order_data.get('name'),
#                 quantity=order_data.get('quantity'),
#             )
#             order.save()

#         return Response({'message': 'Orders created successfully'}, status=201)
    
# @csrf_exempt
# def save_users(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
        
#         for user_data in data:
#             user_id = user_data.get('user_id')
#             email = user_data.get('email')
#             password = user_data.get('password')
#             first_name = user_data.get('first_name')
#             last_name = user_data.get('last_name')
            
#             user = User(user_id=user_id, email=email, password=password, first_name=first_name, last_name=last_name)
#             user.save()
        
#         return JsonResponse({'message': 'Users saved successfully'}, status=201)
    
#     return JsonResponse({'message': 'Invalid request'}, status=400)


# #Save test data 

# class SaveFoodDataView(View):
#     @csrf_exempt
#     def post(self, request):
#         data = json.loads(request.body)
        
#         for item in data:
#             food_id = item.get('id')
#             restaurant = item.get('restaurant')
#             price = item.get('price')
#             food = item.get('food')
#             rating = item.get('rating')
#             link_img = item.get('linkImg')
#             restaurant_img = item.get('restaurantImg')
            
#             # Create a new FoodDataTest object and save it to the database
#             food_data = FoodDataTest(
#                 id=food_id,
#                 restaurant=restaurant,
#                 price=price,
#                 food=food,
#                 rating=rating,
#                 linkImg=link_img,
#                 restaurantImg=restaurant_img
#             )
#             food_data.save()
        
#         return JsonResponse({'success': True})