from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

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
    app.run(host="0.0.0.0")