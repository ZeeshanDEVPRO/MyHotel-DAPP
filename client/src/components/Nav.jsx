import React from 'react'
import { SiHotelsdotcom } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

const Nav = ({ connectContract }) => {
  const navigate = useNavigate();
  return (
    <div className='bg-white flex justify-between font-noto-sans-<uniquifier> font-sans p-[2vh] fixed top-0 left-0 w-full z-50' style={{ boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
      <div className='flex items-center gap-3 min-[450px]:gap-4 md:gap-6'>
        <div className='flex items-center h-[6vh] md:h-[10vh] text-xl min-[450px]:text-2xl md:text-4xl font-medium p-[1.5vh] min-[450px]:p-[3vh] cursor-pointer' onClick={() => navigate('/')}>My<span className='text-[rgb(14 165 233 / var(--tw-bg-opacity));]'>Hotel</span><SiHotelsdotcom color='#f13719' /></div>
        <div className='text-lg min-[450px]:text-xl md:text-2xl font-normal cursor-pointer' onClick={() => navigate('/hotels')}>hotels</div>
        <div className='text-lg min-[450px]:text-xl md:text-2xl font-normal cursor-pointer' onClick={() => navigate('/bookings')}>bookings</div>
        <div className='text-lg min-[450px]:text-xl md:text-2xl font-normal cursor-pointer' onClick={() => navigate('/profile')}>profile</div>
      </div>
      <div className='flex items-center gap-4'>
        <button className='hidden sm:inline-block sm:text-lg md:text-xl p-[1vh] md:p-[2vh] bg-green-600 hover:bg-green-700 font-medium text-white rounded-md md:rounded-lg shadow-2xl' onClick={() => connectContract()}>Connect Account</button>
      </div>

    </div>
  )
}

export default Nav