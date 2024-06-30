from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the trained model, label encoder, and scaler
model = joblib.load('hotel_price_predictor.pkl')
label_encoder = joblib.load('label_encoder.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/', methods=['GET'])
def home():
    return 'ML model properly integrated'

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json  # Assuming JSON input
    
    # Preprocess the input data
    input_data['City'] = label_encoder.transform([input_data['City']])[0]
    input_data_df = pd.DataFrame([input_data])
    input_data_df = input_data_df[['Rating', 'Tax', 'City', 'Star', 'Mini Fridge', 'Wi-Fi', 'House Keeping', 'Seating Area', 'Parking', 'AC', 'Meals', 'Swimming Pool']]
    input_data_df[['Tax', 'Rating']] = scaler.transform(input_data_df[['Tax', 'Rating']])
    
    # Predict the price
    predicted_price = model.predict(input_data_df)[0]
    
    # Return the predicted price as JSON
    return jsonify({'predicted_price': predicted_price})

if __name__ == '__main__':
    app.run(debug=True)
