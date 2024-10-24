import React, { useEffect, useState } from 'react'
import { GiCheckedShield } from "react-icons/gi";
import homeImage from '../assets/HomeImage.jpg';
import staycation from '../assets/staycation.avif';
import qrDiscount from '../assets/qrDiscount.avif';
import map from '../assets/map.avif';
import blue from '../assets/blue.jpg';
import home2 from '../assets/home2.jpg';

const Home = ({ connectContract, account }) => {
  return (
    <div className='bg-[#ffffff] mt-[10vh] md:mt-[13vh] mb-[5vh] font-inter font-sans flex flex-col gap-[4vh] sm:gap-[5vh] md:gap-[10vh]'>
      <div className='relative h-[60vh]'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src={blue}
          alt='travel image'
        />
        <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center text-white'>
          <div className='text-center text-2xl sm:text-4xl font-extrabold leading-tight' style={{ textShadow: '3px 3px 4px rgba(0, 0, 0, 0.4)' }}>Over 100+ destinations and 1000+ hotels and homes</div>
          <div className='text-center text-2xl sm:text-4xl font-extrabold text-[#6ec23e] leading-tight' style={{ textShadow: '3px 3px 5px rgba(0, 0, 0, 0.4)' }}>Quality stays, Always.</div>
          <div className='text-center text-xl sm:text-4xl font-extrabold leading-tight flex gap-1 items-center' style={{ textShadow: '3px 3px 5px rgba(0, 0, 0, 0.4)' }}>
            Sanitized stays our <span className='text-[#ff7661]'>commitment</span> <GiCheckedShield />
          </div>
        </div>
      </div>


      <div>
        <img src={qrDiscount} alt='discount 70%' />
      </div>
      <div>
        <img src={staycation} alt='vacation' />
      </div>
      <div className='bg-[#ffffff] flex flex-col md:flex-row justify-center items-center gap-[1vw] sm:gap-[3vw]'>
        <img className='w-[80%] md:w-[50%] h-[60%] md:h-[40%]' src={map} alt='world' />
        <div className='p-[10vh] flex flex-col items-center justify-center gap-[4vh]'>
          <div className='text-[#333] text-2xl font-bold '>There is our hotel around. Always.</div>
          <div className='text-[rgba(0, 0, 0, 0.7)]'>More Desinations.More Ease.More Affordable.</div>
          <div><span className='font-bold text-2xl'>35+</span> Countries / <span className='font-bold text-2xl'>1000+</span> hotels and homes</div>
          <ul className='flex list-disc gap-9'>
            <li>Delhi</li>
            <li>Bangalore</li>
            <li>Mumbai</li>
          </ul>
          <ul className='flex list-disc gap-9'>
            <li>Chennai</li>
            <li>Kolkata</li>
            <li>Hyderabad</li>
          </ul>
          {
            !account ?
              <button className=' text-xl sm:text-2xl text-white font-semibold cursor-pointer p-[10px] rounded-md bg-[#1ab64f] hover:bg-green-700' onClick={() => { connectContract() }} style={{ boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>Connect Metamask</button>
              :
              <button className=' text-xl sm:text-2xl text-white font-semibold cursor-pointer p-[10px] rounded-md bg-[#1ab64f] hover:bg-green-700' style={{ boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>Connected</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Home