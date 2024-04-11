import React, { useEffect, useState } from 'react';
import { TbAirConditioning } from "react-icons/tb";
import { IoBed } from "react-icons/io5";
import { GiVacuumCleaner } from "react-icons/gi";
import { GiHotMeal } from "react-icons/gi";
import { FaCar } from "react-icons/fa6";
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({ account, contractIns, connectContract }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to handle selection of options
  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSavePreferences = async () => {
    toast.success(`Preferences saved!`, {
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

  useEffect(() => {
    if (!account) {
      connectContract();
    }
  }, [account, connectContract]);

  return (
    <div className='mt-[18vh] mb-[5vh] container mx-auto'>
      <div className='relative h-[55vh]'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src='https://media.cntraveler.com/photos/64879b50add73e0d14b17f9e/16:9/w_1600%2Cc_limit/Most-Adventurous-things-to-do-in-your-lifetime-(update)_timur-garifov-sisZWCDkmwA-unsplash.jpg'
          alt='travel image'
        />
        <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center text-white'>
          {/* code here */}
        </div>
        <div className="absolute top-[35vh] left-0 m-8">
          <img
            src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712620800&semt=ais"
            alt="profile"
            className="rounded-full h-36 w-36 border-4 border-[#323531]"
          />
        </div>
      </div>

      <div className='mt-[10vh] bg-gray-100 rounded-lg p-8 shadow-md'>
        <h2 className='text-2xl font-bold mb-4'>Personal Details</h2>
        <div className='grid grid-cols-2 gap-4'>
          <div className='text-gray-700'>Metamask Address:</div>
          <div className='text-gray-900 font-semibold'>{account}</div>
          <div className='text-gray-700'>Name:</div>
          <div className='text-gray-900 font-semibold'>Sayeed Zeeshan</div>
          <div className='text-gray-700'>Email:</div>
          <div className='text-gray-900 font-semibold'>example@example.com</div>
          <div className='text-gray-700'>Mobile Number:</div>
          <div className='text-gray-900 font-semibold'>123-456-7890</div>
        </div>
      </div>

      <div className='mt-6 bg-gray-100 rounded-lg p-8 shadow-md'>
        <h2 className='text-2xl font-bold mb-4'>Customize Rooms</h2>
        <div className='my-5'>
          <label className="block text-gray-700">Select Options:</label>
          <div className="my-5 flex flex-wrap gap-9">
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                value="AC"
                checked={selectedOptions.includes('AC')}
                onChange={() => handleOptionSelect('AC')}
              />
              <div className='flex items-center gap-5'>
                <span className="ml-2 text-gray-900">AC</span>
                <TbAirConditioning fontSize='35px' color='#585854' />
              </div>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                value="King-sized bed"
                checked={selectedOptions.includes('King-sized bed')}
                onChange={() => handleOptionSelect('King-sized bed')}
              />
              <div className='flex items-center gap-5'>
                <span className="ml-2 text-gray-900">King-sized bed</span>
                <IoBed fontSize='35px' color='#585854' />
              </div>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                value="24/7 Housekeeping"
                checked={selectedOptions.includes('24/7 Housekeeping')}
                onChange={() => handleOptionSelect('24/7 Housekeeping')}
              />
              <div className='flex items-center gap-5'>
                <span className="ml-2 text-gray-900">24/7 Housekeeping</span>
                <GiVacuumCleaner fontSize='35px' color='#585854' />
              </div>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                value="Meals Included"
                checked={selectedOptions.includes('Meals Included')}
                onChange={() => handleOptionSelect('Meals Included')}
              />
              <div className='flex items-center gap-5'>
                <span className="ml-2 text-gray-900">Meals Included</span>
                <GiHotMeal fontSize='35px' color='#585854' />
              </div>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                value="Parking"
                checked={selectedOptions.includes('Parking')}
                onChange={() => handleOptionSelect('Parking')}
              />
              <div className='flex items-center gap-5'>
                <span className="ml-2 text-gray-900">Parking</span>
                <FaCar fontSize='31px' color='#585854' />
              </div>
            </label>

          </div>
        </div>
        <button onClick={handleSavePreferences} className='bg-[#6ec23e] text-white rounded-md px-4 py-2 mt-4 hover:bg-[#579c2e] shadow-md'>Save Preferences</button>
      </div>

      <div className='mt-6 bg-gray-100 rounded-lg p-8 shadow-md'>
        <h2 className='text-2xl font-bold mb-4'>All previous Bookings</h2>
        <div className='flex gap-7 bg-white p-4'>
          <div>Hotel Radisson</div>
          <div>H-12</div>
          <div>R-2</div>
          <div>checkin</div>
          <div>checkout</div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
