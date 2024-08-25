import React from 'react';
import { SiHotelsdotcom } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { FaPenToSquare } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { RiHotelFill } from "react-icons/ri";
import { BsRobot } from "react-icons/bs";

const Nav = ({ account, connectContract }) => {
  const navigate = useNavigate();

  return (
    <div className='bg-white flex justify-between font-noto-sans-<uniquifier> font-sans p-[1.5vh] fixed top-0 left-0 w-full z-50' style={{ boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
      <div className='flex items-center gap-4 min-[450px]:gap-4 md:gap-10'>
        <div className='border-r-2 border-[#1f1a1a] flex items-center h-[6vh] md:h-[10vh] text-xl min-[450px]:text-2xl md:text-3xl font-medium p-[1.5vh] min-[450px]:p-[3vh] cursor-pointer' onClick={() => navigate('/')} >
          My<span className='text-[rgb(14 165 233 / var(--tw-bg-opacity))]'>Hotel</span><SiHotelsdotcom color='#f13719' />
        </div>
        <div className='text-[#323531] flex flex-col items-center text-md sm:text-xl md:text-2xl font-normal cursor-pointer'>
          <RiHotelFill fontSize='25px' />
          <div className='text-sm font-semibold hidden sm:block mt-2'>hotels</div>
        </div>
        <div className='text-[#323531] flex flex-col items-center text-md sm:text-xl md:text-2xl font-normal cursor-pointer'>
          <FaPenToSquare fontSize='25px' />
          <div className='text-sm font-semibold hidden sm:block mt-2'>booking</div>
        </div>
        <div className='text-[#323531] flex flex-col items-center text-md sm:text-xl md:text-2xl font-normal cursor-pointer'>
          <BsRobot fontSize='25px' />
          <div className='text-sm font-semibold hidden sm:block mt-2'>predict</div>
        </div>
        <div className='text-[#323531] flex flex-col items-center text-md sm:text-xl md:text-2xl font-normal cursor-pointer'>
          <CgProfile fontSize='25px' />
          <div className='text-sm font-semibold hidden sm:block mt-2'>profile</div>
        </div>

      </div>

      <div className='flex items-center gap-4'>
        {
          !account ?
            <button className='hidden sm:inline-block sm:text-md md:text-lg p-[1vh] md:p-[1.5vh] md:py-[1vh] bg-green-600 hover:bg-green-700 font-medium text-white rounded-md md:rounded-lg shadow-2xl' onClick={() => connectContract()}>Connect Account</button>
            :
            <button className='hidden sm:inline-block sm:text-md md:text-lg p-[1vh] md:p-[1.5vh] md:py-[1vh] bg-green-600 hover:bg-green-700 font-medium text-white rounded-md md:rounded-lg shadow-2xl'>Connected</button>
        }
      </div>
    </div>
  )
}

export default Nav;
