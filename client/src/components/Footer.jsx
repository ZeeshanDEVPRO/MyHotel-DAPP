import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SiHotelsdotcom } from "react-icons/si";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className=' bg-gray-200 max-w-screen border-0 px-[10vw] py-[10vh] font-poppins font-sans'>
            <div className="flex justify-start items-center font-noto-sans-<uniquifier> font-sans font-semibold text-4xl">MyHotel <SiHotelsdotcom color='#f13719' /></div>
            <div className="flex justify-center sm:justify-between flex-col min-[698px]:flex-row gap-[5vw] mt-5 mb-5">
                <div className='flex justify-between gap-[15vw]'>
                    <div className="mb-4">
                        <div className="text-rgb-43-32-32 text-base sm:text-lg mb-[2vh] font-normal" onClick={() => { window.location.href = "https://mail.google.com/mail/u/0/#inbox" }}>INFOVERSE</div>
                        <div className="text-customGray text-md cursor-pointer font-light" onClick={() => { window.location.href = "https://mail.google.com/mail/u/0/#inbox" }}>About Us</div>
                        <div className="text-customGray text-md cursor-pointer font-light" onClick={() => { window.location.href = "https://mail.google.com/mail/u/0/#inbox" }}>Careers</div>
                        <div className="text-customGray text-md cursor-pointer font-light" onClick={() => { window.location.href = "https://mail.google.com/mail/u/0/#inbox" }}>Blog</div>
                        <div className="text-customGray text-md cursor-pointer font-light" onClick={() => { window.location.href = "https://mail.google.com/mail/u/0/#inbox" }}>Contact Us</div>
                        <div className="text-customGray text-md cursor-pointer font-light" onClick={() => { window.location.href = "https://mail.google.com/mail/u/0/#inbox" }}>FAQ</div>
                        <div className="text-customGray text-md cursor-pointer font-light" onClick={() => { window.location.href = "https://mail.google.com/mail/u/0/#inbox" }}>Help Center</div>
                    </div>
                    <div className="mb-4">
                        <div className="text-rgb-43-32-32 text-base sm:text-lg mb-[2vh] font-normal">PARTNER</div>
                        <div className="text-customGray text-md cursor-pointer font-light">Become a Partner</div>
                        <div className="text-customGray text-md cursor-pointer font-light">Partner Login</div>
                        <div className="text-customGray text-md cursor-pointer font-light">Partner Portal</div>
                        <div className="text-customGray text-md cursor-pointer font-light">Partner Programs</div>

                    </div>
                </div>
                <div className='flex justify-between gap-[15vw]'>
                    <div className="mb-4">
                        <div className="text-rgb-43-32-32 text-base sm:text-lg mb-[2vh] font-normal">LEARN</div>
                        <div className="text-customGray text-md cursor-pointer font-light">Courses</div>
                        <div className="text-customGray text-md cursor-pointer font-light">Tutorials</div>
                        <div className="text-customGray text-md cursor-pointer font-light">Community</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-rgb-43-32-32 text-base sm:text-lg font-normal">SOCIAL LINKS</div>
                        <div className="mb-3vh flex gap-3">
                            <a href='https://www.instagram.com/zeeshan_s_india?igsh=cjB6dDZ4NHllY2F4' ><img className="max-w-6 max-h-6" src='https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Instagram_svg-512.png' alt='image hidden' /></a>
                            <a href='https://twitter.com/Zeeshan71276394?s=09'><img className="max-w-6 max-h-6" src='https://cdn2.iconfinder.com/data/icons/social-media-2421/512/Twitter-256.png' alt='image hidden' /></a>
                            <a href='https://linkedin.com/in/zeeshan-sayeed-18a76120a'><img className="max-w-6 max-h-6" src='https://cdn3.iconfinder.com/data/icons/picons-social/57/11-linkedin-512.png' alt='image hidden' /></a>
                            <a href='https://github.com/ZeeshanDEVPRO'><img className="max-w-6 max-h-6" src='https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-512.png' alt='image hidden' /></a>
                        </div>
                        <button className='cursor-pointer border-0'>
                            <img className="max-w-35 max-h-10" src='https://b.zmtcdn.com/data/webuikit/9f0c85a5e33adb783fa0aef667075f9e1556003622.png' alt='image hidden' />
                        </button>
                        <button className='cursor-pointer border-0'>
                            <img className="max-w-35 max-h-10" src='https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638bf5c31556001144.png' alt='image hidden' />
                        </button>

                    </div>
                </div>
            </div>
            <hr className='border-[0.5px] border-[#cfcfcf]'/>
            <p className='text-customGray font-normal text-[14px] sm:text-[16px]'>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2024 © MyHotel™ Ltd. All rights reserved.</p>

        </div>
    )
}

export default Footer

