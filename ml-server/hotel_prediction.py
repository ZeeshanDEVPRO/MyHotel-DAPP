import pandas as pd
import numpy as np
# import matplotlib.pyplot as plt
# import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.ensemble import RandomForestRegressor
import joblib
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load dataset
hotel_data = pd.read_csv('hotel_dataset.csv')
hotel_data.head()

# Data preprocessing
hotel_data['Hotel Name'] = hotel_data['Hotel Name'].fillna('Unknown')
hotel_data = hotel_data.drop(['Hotel Name'], axis=1)
hotel_data['Location'] = hotel_data['Location'].fillna('Unknown')
hotel_data = hotel_data.drop(['Location'], axis=1)

# Remove commas and convert 'Price', 'Tax', and 'Rating' columns to float
hotel_data['Price'] = hotel_data['Price'].astype(str).str.replace(',', '').astype(float)
hotel_data['Tax'] = hotel_data['Tax'].astype(str).str.replace(',', '').astype(float)
hotel_data['Rating'] = hotel_data['Rating'].astype(str).str.replace(',', '').astype(float)

# Replace NaN values in the 'Tax' column with 0.0
hotel_data['Tax'].fillna(0.0, inplace=True)

# Change boolean to 0 or 1
hotel_data['Mini Fridge'] = hotel_data['Mini Fridge'].astype(int)
hotel_data['Wi-Fi'] = hotel_data['Wi-Fi'].astype(int)
hotel_data['House Keeping'] = hotel_data['House Keeping'].astype(int)
hotel_data['Seating Area'] = hotel_data['Seating Area'].astype(int)
hotel_data['Swimming Pool'] = hotel_data['Swimming Pool'].astype(int)
hotel_data['AC'] = hotel_data['AC'].astype(int)
hotel_data['Parking'] = hotel_data['Parking'].astype(int)
hotel_data['Meals'] = hotel_data['Meals'].astype(int)

# Label encoding for City
label_encoder = LabelEncoder()
hotel_data['City'] = label_encoder.fit_transform(hotel_data['City'])

# Normalizing tax, rating
scaler = MinMaxScaler()
hotel_data[['Tax', 'Rating']] = scaler.fit_transform(hotel_data[['Tax', 'Rating']])

# Graphical analysis

# Price vs Star
# plt.figure(figsize=(5, 3))
# sns.scatterplot(x='Star', y='Price', data=hotel_data, s=50, color='blue', alpha=0.7)
# plt.title('Hotel Price vs Star')
# plt.xlabel('Star')
# plt.ylabel('Price')
# plt.grid(True)
# plt.show()

# Price vs Rating
# plt.figure(figsize=(5, 3))
# sns.scatterplot(x='Rating', y='Price', data=hotel_data, s=50, color='blue', alpha=0.7)
# plt.title('Hotel Price vs Rating')
# plt.xlabel('Rating')
# plt.ylabel('Price')
# plt.grid(True)
# plt.show()

# Price vs Mini Fridge
# plt.figure(figsize=(10, 6))
# sns.violinplot(x='Meals', y='Price', data=hotel_data)
# plt.title('Hotel Price vs Mini Fridge')
# plt.xlabel('Mini Fridge (1: Yes, 0: No)')
# plt.ylabel('Price')
# plt.grid(True)
# plt.show()

# Making predictive system

# Split the dataset into features and target variable
X = hotel_data.drop(['Price'], axis=1)
Y = hotel_data['Price']

# Split the dataset into training and testing sets
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

# Train a regression model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, Y_train)

# Save the trained model, label encoder, and scaler
joblib.dump(model, 'hotel_price_predictor.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')
joblib.dump(scaler, 'scaler.pkl')

# Function to load model and predict price
def load_model_predict(input_data):
    # Load the trained model, label encoder, and scaler
    model = joblib.load('hotel_price_predictor.pkl')
    label_encoder = joblib.load('label_encoder.pkl')
    scaler = joblib.load('scaler.pkl')
    
    # Preprocess the input data
    input_data['City'] = label_encoder.transform([input_data['City']])[0]
    input_data_df = pd.DataFrame([input_data])
    input_data_df = input_data_df[['Rating', 'Tax', 'City', 'Star', 'Mini Fridge','Wi-Fi', 'House Keeping', 'Seating Area', 'Parking', 'AC', 'Meals', 'Swimming Pool']]
    input_data_df[['Tax', 'Rating']] = scaler.transform(input_data_df[['Tax', 'Rating']])
    
    # Predict the price
    predicted_price = model.predict(input_data_df)[0]
    
    return predicted_price

# Flask API endpoint to predict price
@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json
        
        # Predict price using loaded model
        predicted_price = load_model_predict(input_data)
        
        return jsonify({'predicted_price': predicted_price})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
