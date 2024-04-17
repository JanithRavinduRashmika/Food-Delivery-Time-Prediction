from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import datetime
import numpy as np
import pickle
import os
import google.generativeai as genai
import json
from geopy.distance import geodesic


app = Flask(__name__)
CORS(app)

client = MongoClient('localhost',27017)
db = client.FoodDelivery
deliverTimeCollection = db.DeliveryTime

####################################################
genai.configure(api_key = "AIzaSyCSwFgugkBgpP2agREJ3theCNgcIRsXb7c")

#load gemini
def get_gemini_response(question,prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content([prompt[0], question])
    return response.text

# function to retrieve query from mongodb
def read_mongo_query(query):
    result = deliverTimeCollection.aggregate(query)
    return result

prompt = [""""
          
        You are an expert in converting English questions to Mongodb query!
        Suppose a mongodb collection has following columns - ID, Delivery_person_ID, Delivery_person_Age \n\n
        I need mongodb queries which can run inside aggregate() function as json string.
        For example, \n
          Example 1 - How many documents are presents?,
          The mongodb command will be something like this  { $count: "total_entries" }
          but output should be { "$count:: "total_entries" }  \n

          Example 2 - Show all delivery persons id who has age greater than 20?,
          The mongodb command will be something like this { $match: { Delivery_person_Age: { $gt: 20 } } },{ $project: { _id: 0, Delivery_person_ID: 1 } } \n

         Also output should not have ``` in beginning or end.  
        
        
"""]
#########################################3

@app.route("/gemi")
def gemi():
    question = "get all delivery age less than 25"
    response = get_gemini_response(question,prompt)
    print(response)

    query = json.loads(response)
    

    result = deliverTimeCollection.aggregate([query])
    print(list(result))

    return "a"

@app.route("/dashboard")
def dashboard():
    return {
        "deliveries":123,
        "ontime":65.32,
        "delay":12.11,
        "accuracy":89.99,
        "avgDeliveryDelayX":[1,5,7,12,15],
        "avgDeliveryDelayY":[10,12,9,11,12]
    }

#####################################################################


@app.route("/database")
def database():
    
    cursor = deliverTimeCollection.find({}, {"_id": 0}).sort([("_id", -1)]).limit(10000)

    data = list(cursor)
    data.reverse()
    

    return jsonify({"database": data})

###########################################################################

@app.route("/chart", methods=['POST'])
def chart():
    data = request.get_json()
    selectedYear = data["year"]
    
    '''    
    pipeline = [
        {"$addFields": {
            "Order_Date": {"$toDate": "$Order_Date"} 
        }},
        {"$group": {
            "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$Order_Date"}},
            "average_time_taken": {"$avg": "$Time_taken(min)"}
        }}
    ]

 
    result = deliverTimeCollection.aggregate(pipeline)
    average_data = list(result)
    yearAvgData = [item for item in average_data if item['_id'].startswith(selectedYear)]

    formatted_data = []

    for item in yearAvgData:
        year, month, day = map(int, item['_id'].split('-'))
        day_of_year = (datetime.date(year, month, day) - datetime.date(year, 1, 1)).days + 1
        avg_time_taken = round(item['average_time_taken'], 2)
        formatted_data.append({'day_of_year': day_of_year, 'average_time_taken': avg_time_taken})

    for day_of_year in range(1, 366):
        day_present = any(item['day_of_year'] == day_of_year for item in formatted_data)
        if not day_present:
            formatted_data.append({'day_of_year': day_of_year, 'average_time_taken': 27})

        formatted_data.sort(key=lambda x: x['day_of_year'])
    
    average_time_taken_list = [item['average_time_taken'] for item in formatted_data]
    day_of_year_list = [item['day_of_year'] for item in formatted_data]
    '''


    day_of_year_list = [i for i in range(1, 366)]

    np.random.seed(int(selectedYear))    
    poisson_values = np.random.poisson(lam=27, size=365)
    poisson_values_rounded = np.round(poisson_values, 2)
    average_time_taken_list = poisson_values_rounded.tolist()
    
    data = {
        "xAx":day_of_year_list,
        "yAx":average_time_taken_list
    }

    return jsonify(data)

 ###############################################################################################


@app.route('/predict', methods=['POST'])
def predict():

    data = request.get_json()

    deliveryPersonAge = float(data['deliveryPersonAge'])
    deliveryPersonRating = float(data["deliveryPersonRating"])
    weatherCondition = data['weatherCondition']
    roadTrafficDensity = data['roadTrafficDensity']
    vehicleCondition = int(data['vehicleCondition'])
    multipleDeliveries = int(data['multipleDeliveries'])
    festival = data['festival']

    restaurantLatitude = float(data['restaurantLatitude'])
    restaurantLongitude = float(data['restaurantLongitude'])
    deliveryLatitude = float(data['deliveryLatitude'])
    deliveryLongitude = float(data['deliveryLongitude'])


    weather_mapping = {'cloudy':0, 'fog':1, 'sandstorms':2, 'stormy':3, 'sunny':4, 'windy':5 }
    traffic_mapping = {'low':0,'medium':1,'high':2,'jam':3}
    festival_mapping = {'no':0,'yes':1}

    weatherCondition = weather_mapping.get(weatherCondition, 0)
    roadTrafficDensity = traffic_mapping.get(roadTrafficDensity, 0)
    festival = festival_mapping.get(festival, 0)


    distance = geodesic((restaurantLatitude,restaurantLongitude), (deliveryLatitude,deliveryLongitude)).kilometers
    print(distance)
    input_vector =np.array([[
        deliveryPersonAge,
        deliveryPersonRating,
        weatherCondition,
        roadTrafficDensity,
        vehicleCondition,
        multipleDeliveries,
        festival,
        distance
    ]])

    

    current_directory = os.path.dirname(os.path.realpath(__file__))

    model_filename = os.path.join(current_directory, 'finaModel.pkl')

    with open(model_filename, 'rb') as file:
        model = pickle.load(file)


    prediction = model.predict(input_vector)
    prediction = str(round(prediction[0],2))
    return jsonify({"predictedTime":prediction})

    
        
    


#######################################################################################
if __name__ == "__main__":
    app.run(debug=True)

    