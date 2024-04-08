import React, { useEffect, useState } from 'react';
import { MdSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoIosTv } from "react-icons/io";
import { PiElevatorFill } from "react-icons/pi";
import { GiVacuumCleaner } from "react-icons/gi";
import { TbFridge } from "react-icons/tb";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { IoWifiSharp } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Book = ({ account, contractIns, connectContract }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [hotel, setHotel] = useState([]);
    const [roomID1, setRoomID1] = useState('');
    const [entry1, setEntry1] = useState('0');
    const [exit1, setExit1] = useState('0');
    const [roomID2, setRoomID2] = useState('');
    const [entry2, setEntry2] = useState('0');
    const [exit2, setExit2] = useState('0');
    const [availabilityLoader, setAvailabilityLoader] = useState(false);
    const [bookingLoader, setBookingLoader] = useState(false);

    useEffect(() => {
        if (!account) {
            connectContract();
        } else {
            const storedHotelID = localStorage.getItem('hotelID');
            searchHandle(storedHotelID);
        }
    }, [account, connectContract]);

    useEffect(() => {
        if (account) {
            // Redirect to /hotel when account changes
            // window.location.href = '/hotel';
        }
    }, [account]);

    const searchHandle = async (key) => {
        setSearchTerm(key);
        if (key) {
            try {
                const url = new URL(`http://localhost:5000/searchByHotelId/${key}`);
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const searchData = await response.json();
                setHotel(searchData);
            } catch (error) {
                console.error("Error searching products:", error);
            }
        } else {
            console.error("Error fetching book page")
        }
    };

    const roomAvailability = async (_hotelID, _roomID, _entry, _exit) => {
        console.log("availability data:", _hotelID, _roomID, _entry, _exit);
        setAvailabilityLoader(true);
        if (!_hotelID || !_roomID || !_entry || !_exit || _entry > _exit || _entry < Math.round(Date.now() / 1000)) {
            toast.error(`Enter all fields and proper time!`, {
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
            setAvailabilityLoader(false);
            return;
        }

        try {
            const roomAvailable = await contractIns.checkAvailability(_hotelID, _roomID, _entry, _exit);
            if (roomAvailable == true) {
                console.log(true);
                toast.success(`Room ${_roomID}  Available!`, {
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
                setAvailabilityLoader(false);
            }
            else {
                console.log(false);
                toast.error(`Room ${_roomID} Unavailable in the specified time!`, {
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
                setAvailabilityLoader(false);
            }
        }
        catch (e) {
            console.log(e);
            setAvailabilityLoader(false);
        }
    }

    const roomBooking = async (_hotelID, _roomID, _entry, _exit) => {
        console.log("booking data:", _hotelID, _roomID, _entry, _exit);
        setBookingLoader(true);
        if (!_hotelID || !_roomID || !_entry || !_exit || _entry > _exit || _entry < Math.round(Date.now() / 1000)) {
            toast.error(`Enter all fields and proper time!`, {
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
            setBookingLoader(false);
            return;
        }

        try {
            const roomBooking = await contractIns.bookRoom(_hotelID, _roomID, _entry, _exit);
            if (roomBooking) {
                console.log(true);
                toast.success(`Room ${_roomID} Booked!`, {
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
                setBookingLoader(false);
            }
            else {
                console.log(false);
                toast.error(`Room ${_roomID} Unavailable in the specified time!`, {
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
                setBookingLoader(false);
            }
        }
        catch (e) {
            console.log(e);
            setBookingLoader(false);
        }
    }

    return (
        <div className='mt-[14vh] font-noto-sans-<uniquifier> font-sans'>
            {hotel && hotel.length > 0 ? hotel.map((hotell, index) => (
                <div key={index} className=''>
                    <div className="relative">
                        <div className="overflow-hidden flex gap-2 max-w-[100vw] max-h-[80vh]">
                            <img className="object-cover" src={hotell.photo} alt="Hotel Photo" />
                            <img className="object-cover" src='https://images.oyoroomscdn.com/uploads/hotel_image/106159/large/cddtcdsrossd.jpg' alt='seating' />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                            <div>Picture Credits : MyHotel rooms</div>
                            <div>Powered by ETH Blockchain</div>
                        </div>
                    </div>

                    {/* div1 */}
                    <div className='mx-[10vw] py-[4vh]'>
                        <div className='flex flex-col gap-2 py-[4vh]'>
                            <div className='flex items-center justify-between'>
                                <div className='text-[#222] font-bold text-5xl'>{hotell.name}</div>
                                <div className='flex flex-col items-center'>
                                    <div className='text-[#222] font-bold text-5xl'>₹ {hotell.price}</div>
                                    <div className='text-red-500 font-bold'>ETH equivalent</div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='text-[#726e6e] font-semibold text-3xl'>{hotell.address}, {hotell.city}</div>
                                <div className='text-2xl text-white bg-green-600 px-[8px] rounded-sm font-medium'>{hotell.discount} % off</div>
                            </div>
                        </div>
                        <div className='py-[4vh]'>
                            <button className='my-[3vh] bg-[#f5ece5] cursor-not-allowed bg-gray-300 text-[#f49242] font-semibold py-2 px-4 rounded inline-flex items-center'>
                                <CiHeart className='mr-2' />
                                Managed by MyHotel
                            </button>
                            <div className=' my-[2vh]'>
                                <div className='flex gap-3 items-center text-3xl'>
                                    <FaStar color='green' />
                                    <div>{hotell.ratings}</div>
                                </div>
                                <div className='font-medium text-[#665f5f]'>upto 2213 ratings</div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='text-3xl font-semibold'>Amenities</div>
                            <div className='flex flex-wrap gap-12 text-2xl text-[#474444]'>
                                {hotell.facility.map((facility, index) => (
                                    <div key={index} className='flex items-center gap-3'>
                                        {facility}
                                        {facility === "TV" && <IoIosTv />}
                                        {facility === "Elevator" && <PiElevatorFill />}
                                        {facility === "Housekeeping" && <GiVacuumCleaner />}
                                        {facility === "Mini Fridge" && <TbFridge />}
                                        {!["TV", "Elevator", "Housekeeping", "Mini Fridge"].includes(facility) && <MdAirlineSeatReclineExtra />}
                                    </div>
                                ))}
                                <div className='flex gap-2 items-center'><TbAirConditioning color='grey' fontSize={22} /><div>AC</div></div>
                                <div className='flex gap-2 items-center'><FaCar color='grey' fontSize={22} /><div>Parking</div></div>
                                <div className='flex gap-2 items-center'><IoWifiSharp color='grey' fontSize={22} /><div>Wi-Fi</div></div>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className='flex justify-center p-[6vh]'>

                        {/* div2 */}
                        <div className='shadow px-[3vw] bg-[#e5eff1] border p-[3vh] rounded-[5px] mx-[8vw] my-[3vh] flex flex-col gap-5'>
                            <div className='text-[#4b4848] font-semibold text-2xl'>Room Availability</div>
                            <div className='flex gap-3'>
                                <div className='flex gap-4 text-gray-600 items-center'>
                                    <input className='cursor-pointer' onClick={() => setRoomID1('1')} type="radio" id="r1_1" name="room1" />
                                    <label htmlFor="r1">ROOM 1</label>
                                </div>
                                <div className='flex gap-4 text-gray-600 items-center'>
                                    <input className='cursor-pointer' onClick={() => setRoomID1('2')} type="radio" id="r1_2" name="room1" />
                                    <label htmlFor="r2">ROOM 2</label>
                                </div>
                                <div className='flex gap-4 text-gray-600 items-center'>
                                    <input className='cursor-pointer' onClick={() => setRoomID1('3')} type="radio" id="r1_3" name="room1" />
                                    <label htmlFor="r3">ROOM 3</label>
                                </div>
                            </div>

                            <div className='flex flex-col gap-5 text-lg'>
                                <div className="flex flex-col justify-center">
                                    <label htmlFor="check-in-time" className="text-gray-600 mb-2 text-base">Select Check In Time:</label>
                                    <input
                                        className="appearance-none border rounded shadow-sm py-1 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        type="datetime-local"
                                        id="check-in-time"
                                        defaultValue={new Date().toISOString().slice(0, 16)}
                                        onChange={(e) => {
                                            const date = new Date(e.target.value);
                                            const epochSeconds = Math.round(date.getTime() / 1000);
                                            setEntry1(epochSeconds);
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col justify-center">
                                    <label htmlFor="check-out-time" className="text-gray-600 mb-2 text-base">Select Check Out Time:</label>
                                    <input
                                        className="appearance-none border rounded shadow-sm py-1 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        type="datetime-local"
                                        id="check-out-time"
                                        defaultValue={new Date().toISOString().slice(0, 16)}
                                        onChange={(e) => {
                                            const date = new Date(e.target.value);
                                            const epochSeconds = Math.round(date.getTime() / 1000);
                                            setExit1(epochSeconds);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                {!availabilityLoader ?
                                    <button className='text-white bg-yellow-600 hover:bg-yellow-700 font-medium text-lg py-2 px-4 rounded flex items-center' onClick={() => roomAvailability(hotell.hotelId, roomID1, entry1, exit1)}>Check Availability</button>
                                    :
                                    <button className='text-white bg-yellow-600  font-medium text-lg py-2 px-4 rounded flex items-center' disabled>Checking...</button>
                                }
                            </div>
                        </div>

                        {/* div3 */}
                        <div className='shadow px-[3vw] bg-[#e5eff1] border p-[3vh] rounded-[5px] mx-[8vw] my-[3vh] flex flex-col gap-5'>
                            <div className='text-[#4b4848] font-semibold text-2xl'>Room Booking</div>
                            <div className='flex gap-3'>
                                <div className='flex gap-4 text-gray-600 items-center'>
                                    <input className='cursor-pointer' onClick={() => setRoomID2('1')} type="radio" id="r2_1" name="room2" />
                                    <label htmlFor="r1">ROOM 1</label>
                                </div>
                                <div className='flex gap-4 text-gray-600 items-center'>
                                    <input className='cursor-pointer' onClick={() => setRoomID2('2')} type="radio" id="r2_2" name="room2" />
                                    <label htmlFor="r2">ROOM 2</label>
                                </div>
                                <div className='flex gap-4 text-gray-600 items-center'>
                                    <input className='cursor-pointer' onClick={() => setRoomID2('3')} type="radio" id="r2_3" name="room2" />
                                    <label htmlFor="r3">ROOM 3</label>
                                </div>
                            </div>

                            <div className='flex flex-col gap-5 text-lg'>
                                <div className="flex flex-col justify-center">
                                    <label htmlFor="check-in-time" className="text-gray-600 mb-2 text-base">Select Check In Time:</label>
                                    <input
                                        className="appearance-none border rounded shadow-sm py-1 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        type="datetime-local"
                                        id="check-in-time"
                                        defaultValue={new Date().toISOString().slice(0, 16)}
                                        onChange={(e) => {
                                            const date = new Date(e.target.value);
                                            const epochSeconds = Math.round(date.getTime() / 1000);
                                            setEntry2(epochSeconds);
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col justify-center">
                                    <label htmlFor="check-out-time" className="text-gray-600 mb-2 text-base">Select Check Out Time:</label>
                                    <input
                                        className="appearance-none border rounded shadow-sm py-1 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        type="datetime-local"
                                        id="check-out-time"
                                        defaultValue={new Date().toISOString().slice(0, 16)}
                                        onChange={(e) => {
                                            const date = new Date(e.target.value);
                                            const epochSeconds = Math.round(date.getTime() / 1000);
                                            setExit2(epochSeconds);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                {!bookingLoader ?
                                    <button className='text-white bg-green-600 hover:bg-green-700 font-medium text-lg py-2 px-4 rounded flex items-center' onClick={() => roomBooking(hotell.hotelId, roomID2, entry2, exit2)}>Book Room Now</button>
                                    :
                                    <button className='text-white bg-green-600 font-medium text-lg py-2 px-4 rounded flex items-center' disabled>Booking...</button>
                                }
                            </div>
                        </div>


                    </div>

                </div>

            ))
                :
                (
                    <div className='text-3xl font-bold flex flex-col gap-4 items-center justify-center h-[80vh]'>
                        <div>No matching results For Now</div>
                        <div>OR</div>
                        <div className='flex items-center gap-2'><MdSignalWifiStatusbarConnectedNoInternet4 /><div>Internet/Metamask Error</div></div>
                    </div>
                )
            }
            <ToastContainer />
        </div >
    );
}

export default Book;
