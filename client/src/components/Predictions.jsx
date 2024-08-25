import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import home2 from '../assets/home2.jpg';

const Predictions = () => {
    const [loader, setLoader] = useState(false);
    const [predictionOn, setPredictionOn] = useState(true);
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
            
            setPredictedPrice(data.predicted_price);  // Use `data.predicted_price`
            console.log('Prediction result:', data.predicted_price); // Also log the correct value
            setLoader(false);
            setPredictionOn(false);
        } catch (error) {
            setLoader(false);
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
            console.error('Prediction error:', error);
        }
    };

    return (
        <div className='mt-[13vh] mb-[1vh] flex justify-center items-center' style={{ backgroundImage: `url(${home2})`, width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {predictionOn ?
                (loader ?
                    <div className="flex justify-center items-center h-[70vh]">
                        <div className="w-48 h-48 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    :
                    <div className='flex flex-col items-center'>
                        <div className="mt-4 bg-[#C5E60FE1] text-center rounded-md p-4 shadow-md flex flex-col gap-3">
                            <div className='flex justify-center gap-4 items-center px-5'>
                                <div className="ml-3 text-[15px] font-raleway text-[#333131] font-semibold">
                                    "Introducing our Price Prediction System, powered by the latest machine learning technologies. Simply provide your desired hotel inputs, and our predictor will estimate the hotel price for you. Keep in mind that the model's accuracy is 83%, so there may be some variation in the actual price."
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className='bg-[#eceaea] shadow-md rounded px-8 mt-4 pt-6 pb-8 mb-4 w-full max-w-lg'>
                            <label htmlFor="" className="block text-gray-700 text-lg font-bold my-6">Give us your desired inputs</label>

                            {/* input boxes */}
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
                                    Rating (out of 5):
                                    <input type='text' name='Rating' value={formData.Rating}
                                        onChange={handleChange}
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    />
                                </label>
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
                                    Tax (₹):
                                    <input type='text' name='Tax' value={formData.Tax} onChange={handleChange}
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    />
                                </label>
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
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
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
                                    Star (out of 5):
                                    <input type='text' name='Star' value={formData.Star} onChange={handleChange}
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    />
                                </label>
                            </div>

                            {/* amenities box */}
                            <div className='my-6'>
                                <div className='mb-4 text-gray-700 text-lg font-bold'>Select Amenities:</div>
                                <div className='grid grid-cols-1 gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <div className='text-gray-700 text-sm font-bold'>Mini Fridge:</div>
                                        <div className='flex items-center gap-2'>
                                            <input type='radio' id='minifridge-true' name='MiniFridge' value='true' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='minifridge-true' className='flex items-center cursor-pointer mr-4'>
                                                Yes
                                            </label>
                                            <input type='radio' id='minifridge-false' name='MiniFridge' value='false' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='minifridge-false' className='flex items-center cursor-pointer'>
                                                No
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='text-gray-700 text-sm font-bold'>Wi-Fi:</div>
                                        <div className='flex items-center gap-2'>
                                            <input type='radio' id='wifi-true' name='WiFi' value='true' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='wifi-true' className='flex items-center cursor-pointer mr-4'>
                                                Yes
                                            </label>
                                            <input type='radio' id='wifi-false' name='WiFi' value='false' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='wifi-false' className='flex items-center cursor-pointer'>
                                                No
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='text-gray-700 text-sm font-bold'>House Keeping:</div>
                                        <div className='flex items-center gap-2'>
                                            <input type='radio' id='housekeeping-true' name='HouseKeeping' value='true' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='housekeeping-true' className='flex items-center cursor-pointer mr-4'>
                                                Yes
                                            </label>
                                            <input type='radio' id='housekeeping-false' name='HouseKeeping' value='false' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='housekeeping-false' className='flex items-center cursor-pointer'>
                                                No
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='text-gray-700 text-sm font-bold'>Seating Area:</div>
                                        <div className='flex items-center gap-2'>
                                            <input type='radio' id='seatingarea-true' name='SeatingArea' value='true' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='seatingarea-true' className='flex items-center cursor-pointer mr-4'>
                                                Yes
                                            </label>
                                            <input type='radio' id='seatingarea-false' name='SeatingArea' value='false' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='seatingarea-false' className='flex items-center cursor-pointer'>
                                                No
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='text-gray-700 text-sm font-bold'>Parking:</div>
                                        <div className='flex items-center gap-2'>
                                            <input type='radio' id='parking-true' name='Parking' value='true' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='parking-true' className='flex items-center cursor-pointer mr-4'>
                                                Yes
                                            </label>
                                            <input type='radio' id='parking-false' name='Parking' value='false' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='parking-false' className='flex items-center cursor-pointer'>
                                                No
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='text-gray-700 text-sm font-bold'>AC:</div>
                                        <div className='flex items-center gap-2'>
                                            <input type='radio' id='ac-true' name='AC' value='true' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='ac-true' className='flex items-center cursor-pointer mr-4'>
                                                Yes
                                            </label>
                                            <input type='radio' id='ac-false' name='AC' value='false' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='ac-false' className='flex items-center cursor-pointer'>
                                                No
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='text-gray-700 text-sm font-bold'>Meals:</div>
                                        <div className='flex items-center gap-2'>
                                            <input type='radio' id='meals-true' name='Meals' value='true' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='meals-true' className='flex items-center cursor-pointer mr-4'>
                                                Yes
                                            </label>
                                            <input type='radio' id='meals-false' name='Meals' value='false' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='meals-false' className='flex items-center cursor-pointer'>
                                                No
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='text-gray-700 text-sm font-bold'>Swimming Pool:</div>
                                        <div className='flex items-center gap-2'>
                                            <input type='radio' id='swimmingpool-true' name='SwimmingPool' value='true' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='swimmingpool-true' className='flex items-center cursor-pointer mr-4'>
                                                Yes
                                            </label>
                                            <input type='radio' id='swimmingpool-false' name='SwimmingPool' value='false' onChange={handleChange} className='cursor-pointer' />
                                            <label htmlFor='swimmingpool-false' className='flex items-center cursor-pointer'>
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-center'>
                                <button
                                    type='submit'
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                >
                                    Predict Price
                                </button>
                            </div>
                        </form>
                    </div>
                ) :
                <div className='flex flex-col items-center'>
                    <div className="bg-[#C5E60FE1] text-center rounded-md p-4 shadow-md flex flex-col gap-3 mt-6">
                        <div className='text-[#333131] text-lg font-semibold'>
                            Predicted Hotel Price:
                        </div>
                        <div className='text-2xl font-bold text-green-700'>
                            ₹{predictedPrice}
                        </div>
                    </div>
                </div>
            }
            <ToastContainer />
        </div>
    );
};

export default Predictions;
