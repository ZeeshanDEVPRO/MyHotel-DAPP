from flask import Flask, request, jsonify
import joblib
import pandas as pd
import os
import traceback
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://my-hotel-dapp.vercel.app", "http://localhost:5173"]}})

# Load the trained model, label encoder, and scaler
model = joblib.load('hotel_price_predictor.pkl')
label_encoder = joblib.load('label_encoder.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/predict', methods=['POST', 'GET'])
def predict():
    try:
        input_data = request.json  # Assuming JSON input

        # Preprocess the input data
        if 'City' in input_data:
            input_data['City'] = label_encoder.transform([input_data['City']])[0]

        # Convert input_data to DataFrame
        input_data_df = pd.DataFrame([input_data])

        # Ensure all expected columns are present
        expected_columns = ['Rating', 'Tax', 'City', 'Star', 'Mini Fridge', 'Wi-Fi',
                             'House Keeping', 'Seating Area', 'Parking', 'AC', 'Meals', 'Swimming Pool']
        for col in expected_columns:
            if col not in input_data_df.columns:
                input_data_df[col] = 0  # Or handle missing columns in another way

        # Reorder columns to match the model's expected input
        input_data_df = input_data_df[expected_columns]

        # Scale necessary features
        input_data_df[['Tax', 'Rating']] = scaler.transform(input_data_df[['Tax', 'Rating']])

        # Predict the price
        predicted_price = model.predict(input_data_df)[0]

        # Return the predicted price as JSON
        return jsonify({'predicted_price': predicted_price})
    except Exception as e:
        # Log the exception
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def home():
    return "Hello, World!"

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
