from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import loads, dumps
import pickle

app = Flask(__name__)
CORS(app)

client = MongoClient('localhost',27017)
db = client.FoodDelivery
deliverTimeCollection = db.DeliveryTime

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

@app.route("/database")
def database():
    
    cursor = deliverTimeCollection.find({}, {"_id": 0}).limit(50)

    data = list(cursor)
    data.reverse()
    

    return jsonify({"database": data})

##model = pickle.load(open('model.pkl','rb'))
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    deliveryPersonAge = data["deliveryPersonAge"]
    restaurantLatitude = data["restaurantLatitude"]
    city = data["city"]
    orderedTime = data["orderedTime"]
    orderDate = data["orderDate"]
    

    


    return {"predictedTime":deliveryPersonAge+""+restaurantLatitude+""+city+""+orderedTime+""+orderDate}
    

if __name__ == "__main__":
    app.run(debug=True)