import React, { useEffect, useState } from 'react';
import { TbAirConditioning } from "react-icons/tb";
import { IoBed } from "react-icons/io5";
import { GiVacuumCleaner } from "react-icons/gi";
import { GiHotMeal } from "react-icons/gi";
import { FaCar } from "react-icons/fa6";
import { FaEdit } from 'react-icons/fa';
import { FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import profile from '../assets/profile.jpg';
import personIcon from '../assets/profileIcon.avif';

const Profile = ({ account, contractIns, connectContract }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [detailLoader, setDetailLoader] = useState(false);
  const [profileIcon, setProfileIcon] = useState(null); // Changed from profileImage
  const [isPhotoEditing, setIsPhotoEditing] = useState(false);
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    if (contractIns) {
      getProfileDetails();
      allBookings();
    }
  }, [contractIns]);

  // Function to handle profile icon change
  const handleProfileIconChange = (e) => {
    const file = e.target.files[0];
    setProfileIcon(file);
    saveProfileIcon();
  };

  // Function to save profile icon
  const saveProfileIcon = async () => {
    try {
      const saving = await contractIns.saveProfileImage(profileIcon);
      if (saving) {
        toast.success(`Profile Icon Updated!`, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
        console.log(saving);
      }
    } catch (e) {
      console.warn(e);
      toast.error(`Error while updating profile icon!`, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    }
  };

  const getProfileDetails = async () => {
    try {
      const profile = await contractIns.getProfile();
      setName(profile[0]);
      setEmail(profile[1]);
      setMobile(profile[2].toString());
      // Fetch profile icon from smart contract and set it
      const profileIconFromContract = await contractIns.getProfileImage();
      setProfileIcon(profileIconFromContract);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (name === '' || email === '' || mobile === '') {
      toast.error(`Fill all the fields!`, {
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
      setDetailLoader(true);
      const saving = await contractIns.saveProfile(name, email, mobile);
      if (saving) {
        toast.success(`Details Updated!`, {
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
        setIsEditing(false);
      }
      setDetailLoader(false);
    } catch (e) {
      console.warn(e);
      toast.error(`Error while updating!`, {
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
      setIsEditing(false);
    }
  };

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
  };

  useEffect(() => {
    if (!account) {
      connectContract();
    }
  }, [account, connectContract]);

  function selectphoto() {
    document.getElementById("input-img").click();
  }

  const allBookings = async () => {
    try {
      const bookings = await contractIns.getBookings();
      if (bookings) {
        setHotel(bookings);
        console.log(bookings);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='mt-[16vh] mb-[5vh] container mx-auto'>

      {/* image div */}
      <div className='relative h-[55vh]'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src={profile}
          alt='Profile'
        />
        <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center text-white'>

        </div>
        <div className='absolute top-[35vh] left-0 m-8'>

          {/* profileIcon */}
          <div className='relative'>
            {isPhotoEditing && (
              <input
                type='file'
                accept='image/*'
                onChange={handleProfileIconChange}
                className='bg-transparent text-white cursor-pointer hidden'

              />
            )}
            <input
              type='file'
              accept='image/*'
              onChange={handleProfileIconChange}
              className='bg-transparent text-white cursor-pointer hidden'
              id="input-img"
            />

            <span id="editIcon" className="absolute bottom-[4px] right-[20px] text-3xl cursor-pointer" onClick={selectphoto}>
              <FaPlusCircle style={{ color: '#1378fc', border: '2px solid white', borderRadius: '50%', backgroundColor: 'white' }} />
            </span>

            <img
              src={profileIcon || personIcon}
              alt="profile"
              className="rounded-full h-36 w-36 border-4 border-[#323531]"
            />
          </div>
        </div>
      </div>

      {/* profile details */}
      <div className='mt-[10vh] mx-[3vh] bg-gray-100 rounded-lg p-8 shadow-md'>
        <h2 className='text-2xl font-bold mb-4'>Personal Details</h2>
        <div className='grid grid-cols-2 gap-4'>
          <div className='text-gray-700 font-semibold'>Metamask Address:</div>
          <div className='text-gray-900 font-semibold'>{account}</div>
          <div className='text-gray-700 font-semibold'>Name:</div>
          <div className='text-gray-900 font-semibold'>
            {isEditing ? (
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='border-b border-gray-400 focus:outline-none'
              />
            ) : (
              name
            )}
          </div>
          <div className='text-gray-700 font-semibold'>Email:</div>
          <div className='text-gray-900 font-semibold'>
            {isEditing ? (
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border-b border-gray-400 focus:outline-none'
              />
            ) : (
              email
            )}
          </div>
          <div className='text-gray-700 font-semibold'>Mobile Number:</div>
          <div className='text-gray-900 font-semibold'>
            {isEditing ? (
              <input
                type='text'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className='border-b border-gray-400 focus:outline-none'
              />
            ) : (
              mobile
            )}
          </div>
          <div></div>
          <div>
            {isEditing ? (
              detailLoader ? (
                <button disabled className='text-white bg-green-600 my-2 px-6 py-2 text-lg font-semibold rounded shadow'>
                  Saving...
                </button>
              ) : (
                <button onClick={handleSave} className='text-white bg-green-600 my-2 px-6 py-2 text-lg font-semibold rounded shadow'>
                  SAVE
                </button>
              )
            ) : (
              <FaEdit onClick={handleEdit} className='cursor-pointer text-red-600 text-2xl' />
            )}
          </div>
        </div>
      </div>

      {/* customization */}
      <div className='mt-6 mx-[3vh] bg-gray-100 rounded-lg p-8 shadow-md'>
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

      {/* bookings */}
      <div className='mx-[4vw] my-[5vh] bg-gray-100 rounded-lg p-8 shadow-md'>
        <h2 className='text-2xl font-semibold mb-4'>Your Bookings</h2>
        <div className='flex flex-col m-4'>
          <div className='bg-black p-4 rounded-md shadow-md'>
            <div className='flex gap-7 justify-evenly'>
              <div className="w-1/6 text-center text-white font-semibold">Hotel Booked</div>
              <div className="w-1/6 text-center text-white font-semibold">Hotel ID</div>
              <div className="w-1/6 text-center text-white font-semibold">Room ID</div>
              <div className="w-1/6 text-center text-white font-semibold">Check In Time</div>
              <div className="w-1/6 text-center text-white font-semibold">Check Out Time</div>
              <div className="w-1/6 text-center text-white font-semibold">Status</div>
            </div>
          </div>

          {hotel && hotel.map((item, index) => {

            // Convert entryTime from BigNumber to milliseconds
            const entryTimeMs = parseInt(item.entryTime.toString()) * 1000 * 1000;
            const entryTimeDate = new Date(entryTimeMs);
            const formattedEntryTime = entryTimeDate.toLocaleString();

            const exitTimeMs = parseInt(item.exitTime.toString()) * 1000 * 1000;
            const exitTimeDate = new Date(exitTimeMs);
            const formattedExitTime = exitTimeDate.toLocaleString();

            return (
              <div className='flex flex-col' key={index}>
                <div className='bg-white dark:bg-gray-800 p-4 rounded-md shadow-md'>
                  <div className='flex gap-7 justify-evenly items-center font-medium'>
                    <div className="w-1/6 text-center text-[#03050c] dark:text-gray-200">{item.name}</div>
                    <div className="w-1/6 text-center text-gray-800 dark:text-gray-200">{item.hotelID.toString()}</div>
                    <div className="w-1/6 text-center text-gray-800 dark:text-gray-200">{item.roomID.toString()}</div>
                    <div className="w-1/6 text-center text-gray-800 dark:text-gray-200">{formattedEntryTime}</div>
                    <div className="w-1/6 text-center text-gray-800 dark:text-gray-200">{formattedExitTime}</div>
                    <div className="w-1/6 text-center">
                      {item.status.toString() === 'Booked' ?
                        (<div className='text-green-600 font-bold'>BOOKED</div>) : (<div className='text-red-600 font-bold'>CANCELLLED</div>)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
