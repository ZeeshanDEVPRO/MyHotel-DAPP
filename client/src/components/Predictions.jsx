import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import home2 from '../assets/home2.jpg';

const Predictions = () => {
    const [loader, setLoader] = useState(false);
    const [predictionOn, setPredictionOn] = useState(false);
    const [predictedPrice, setPredictedPrice] = useState('');
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

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        const floatFields = ['Rating', 'Tax', 'Star'];
        const floatRegex = /^[0-9]*\.?[0-9]*$/;
        if (floatFields.includes(name) && !floatRegex.test(value)) {
            return;
        }
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { Rating, Tax, City, Star, MiniFridge, WiFi, HouseKeeping, SeatingArea, Parking, AC, Meals, SwimmingPool } = formData;

        const booleanToInt = (bool) => (bool === 'true' ? 1 : 0);

        if (
            !Rating || parseFloat(Rating) < 0 || parseFloat(Rating) > 5 ||
            !Tax || parseFloat(Tax) < 0 ||
            !City ||
            !Star || parseFloat(Star) < 0 || parseFloat(Star) > 5 ||
            !MiniFridge ||
            !WiFi ||
            !HouseKeeping ||
            !SeatingArea ||
            !Parking ||
            !AC ||
            !Meals ||
            !SwimmingPool
        ) {
            toast.error(`Enter all fields with proper values!`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            return;
        }

        try {
            setPredictionOn(true); // Use setPredictionOn to update the state
            setLoader(true);
            const response = await fetch('https://myhotel-dapp.onrender.com/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Rating: parseFloat(Rating),
                    Tax: parseFloat(Tax),
                    City,
                    Star: parseFloat(Star),
                    MiniFridge: booleanToInt(MiniFridge),
                    WiFi: booleanToInt(WiFi),
                    HouseKeeping: booleanToInt(HouseKeeping),
                    SeatingArea: booleanToInt(SeatingArea),
                    Parking: booleanToInt(Parking),
                    AC: booleanToInt(AC),
                    Meals: booleanToInt(Meals),
                    SwimmingPool: booleanToInt(SwimmingPool)
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log('Response data:', data); // Log the entire response data

            if (data && data.predicted_price) {
                // Convert predicted_price to a number and round to 2 decimal places
                const roundedPrice = parseFloat(data.predicted_price).toFixed(2);
                setPredictedPrice(roundedPrice);
            } else {
                console.error('Error: Response data does not contain predicted_price', data);
                throw new Error('Response data does not contain predicted_price');
            }
            console.warn(predictedPrice);

            setLoader(false);
            setPredictionOn(true); // Open the modal when prediction is successful
        } catch (error) {
            setLoader(false);
            console.error('Prediction error:', error);
            toast.error(`Internal Error!`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }

    const handleCloseModal = () => {
        setPredictionOn(false);
    }


    return (
        <div className='mt-[9vh] md:mt-[13vh] mb-[1vh] flex justify-center items-center' style={{ backgroundImage: `url(${home2})`, width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {loader ? (
                <div className="flex justify-center items-center h-[70vh]">
                    <div className="w-48 h-48 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className='flex flex-col items-center'>
                    <div className="mt-4 bg-[#C5E60FE1] text-center rounded-md p-4 shadow-md flex flex-col gap-3">
                        <div className='flex justify-center gap-4 items-center px-5'>
                            <div className="ml-3 text-[11px] md:text-[15px] font-raleway text-[#333131] font-semibold">
                                "Introducing our Price Prediction System, powered by the latest machine learning technologies. Simply provide your desired hotel inputs, and our predictor will estimate the hotel price for you. Keep in mind that the model's accuracy is 83%, so there may be some variation in the actual price."
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className='bg-[#eceaea] shadow-md rounded px-8 mt-4 pt-4 pb-8 mb-4 w-4/5 max-w-lg'>
                        <label htmlFor="" className="block text-gray-700 text-sm md:text-lg font-bold my-6">
                            Give us your desired inputs
                        </label>

                        {/* input boxes */}
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-xs md:text-sm font-bold mb-2'>
                                Rating (out of 5):
                                <input
                                    type='text'
                                    name='Rating'
                                    value={formData.Rating}
                                    onChange={handleChange}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </label>
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-xs md:text-sm font-bold mb-2'>
                                Tax (₹):
                                <input
                                    type='text'
                                    name='Tax'
                                    value={formData.Tax}
                                    onChange={handleChange}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </label>
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-xs md:text-sm font-bold mb-2'>
                                City:
                                <select
                                    name='City'
                                    value={formData.City}
                                    onChange={handleChange}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                >
                                    <option value='' disabled>--Select a city--</option>
                                    <option value='Delhi'>Delhi</option>
                                    <option value='Mumbai'>Mumbai</option>
                                    <option value='Bangalore'>Bangalore</option>
                                    <option value='Hyderabad'>Hyderabad</option>
                                    <option value='Pune'>Pune</option>
                                    <option value='Kolkata'>Kolkata</option>
                                    <option value='Chennai'>Chennai</option>
                                </select>
                            </label>
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-xs md:text-sm font-bold mb-2'>
                                Star (out of 5):
                                <input
                                    type='text'
                                    name='Star'
                                    value={formData.Star}
                                    onChange={handleChange}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </label>
                        </div>

                        {/* amenities box */}
                        <div className='my-6'>
                            <div className='mb-4 text-gray-700 text-sm md:text-lg font-bold'>
                                Select Amenities:
                            </div>
                            <div className='grid grid-cols-1 gap-4'>
                                {[
                                    { label: 'Mini Fridge', name: 'MiniFridge' },
                                    { label: 'Wi-Fi', name: 'WiFi' },
                                    { label: 'House Keeping', name: 'HouseKeeping' },
                                    { label: 'Seating Area', name: 'SeatingArea' },
                                    { label: 'Parking', name: 'Parking' },
                                    { label: 'AC', name: 'AC' },
                                    { label: 'Meals', name: 'Meals' },
                                    { label: 'Swimming Pool', name: 'SwimmingPool' }
                                ].map(({ label, name }) => (
                                    <div key={name} className='flex justify-between items-center'>
                                        <div className='text-gray-700 text-xs md:text-sm font-bold'>
                                            {label}:
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type='radio'
                                                id={`${name}-true`}
                                                name={name}
                                                value='true'
                                                onChange={handleChange}
                                                className='cursor-pointer'
                                            />
                                            <label htmlFor={`${name}-true`} className='flex items-center cursor-pointer mr-4'>
                                                Yes
                                            </label>
                                            <input
                                                type='radio'
                                                id={`${name}-false`}
                                                name={name}
                                                value='false'
                                                onChange={handleChange}
                                                className='cursor-pointer'
                                            />
                                            <label htmlFor={`${name}-false`} className='flex items-center cursor-pointer'>
                                                No
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='flex justify-center'>
                            <button
                                type='submit'
                                className='bg-green-500 hover:bg-green-600 text-white text-xs md:text-base font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            >
                                Predict Price
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Modal */}
            {predictionOn && (
                <div className='fixed inset-0 z-50 flex items-center justify-center'>
                    <div className='absolute inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm'></div>
                    <div className='relative bg-white text-center rounded-lg p-6 shadow-lg flex flex-col items-center justify-center gap-4 max-w-md w-3/4 z-60'>
                        <div className='text-[#333131] text-xl font-semibold'>
                            Predicted Hotel Price:
                        </div>
                        <div className='text-xl md:text-3xl font-extrabold text-green-700'>
                            <p> ₹ {predictedPrice}</p>
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 text-sm md:text-base text-white bg-red-600 hover:bg-red-400 font-semibold w-2/3 my-2 py-2"
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default Predictions;
