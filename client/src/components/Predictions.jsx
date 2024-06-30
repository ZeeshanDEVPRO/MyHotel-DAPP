// InputForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const InputForm = () => {
    const [formData, setFormData] = useState({
        Rating: '',
        Tax: '',
        City: '',
        Star: '',
        MiniFridge: '',
        WiFi: '',
        HouseKeeping: '',
        SeatingArea: '',
        Parking: '',
        AC: '',
        Meals: '',
        SwimmingPool: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/predict', formData);
            console.log('Predicted Price:', response.data.predicted_price);
            // Handle state update or display of predicted price in UI
        } catch (error) {
            console.error('Prediction error:', error);
            // Handle error state or UI update
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Input fields for each feature */}
            <input type="text" name="Rating" value={formData.Rating} onChange={handleChange} />
            {/* Other input fields for Tax, City, Star, amenities, etc. */}
            <button type="submit">Predict Price</button>
        </form>
    );
};

export default InputForm;
