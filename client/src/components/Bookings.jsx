import React, { useEffect, useState } from 'react';
import { TiWarningOutline } from "react-icons/ti";
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BigNumber } from 'bignumber.js';


const Bookings = ({ account, contractIns, connectContract }) => {
  const [availabilityLoader, setAvailabilityLoader] = useState(false);
  const [hotel, setHotel] = useState([]);
  const [hotelID, setHotelID] = useState('');
  const [roomID, setRoomID] = useState('');
  const [entry, setEntry] = useState('');
  const [exit, setExit] = useState('');

  useEffect(() => {
    if (!account) {
      connectContract();
    }
    else {
      allBookings();
    }
  }, [account, connectContract]);

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

  const roomCancel = async (_hotelID, _roomID, _entry, _exit) => {
    try {
      // Fetch price per hour from the contract
      const priceAsValue = await contractIns.getFinalPrice(_hotelID, _roomID, _entry, _exit);

      const cancellation = await contractIns.cancelBooking(_hotelID, _roomID, _entry, _exit);
      console.warn(cancellation);
      if (cancellation) {
        toast.success(`Room ${_roomID}  Cancelled! Refund initiated`, {
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
    catch (e) {
      console.warn(e);
      toast.error(`Room ${_roomID}  cancellation failed!`, {
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
    <div className='mt-[9vh] md:mt-[13vh] pb-[10vh] bg-[#d8dcdf] flex flex-col gap-5'>

      {/* warning */}
      <div className="mt-4 bg-[#C5E60FE1] text-center rounded-md p-4 shadow-md flex flex-col gap-3">
        {/* <p className="text-lg text-[#292727] font-bold">Connected Metamask Address: {account}</p> */}
        <div className='flex justify-center gap-4 items-center px-5'>
          <div>
            <TiWarningOutline fontSize='40px' />
          </div>
          <div className="ml-3 text-[10px] sm:text[12px] md:text-[15px]">
            Cancellation of a booking is permissible with a full refund provided that the cancellation occurs at least forty-eight hours prior to the scheduled check-in time. Should the cancellation take place within 48 hours of the check-in time, a refund will be issued, deducting 10% of the total paid amount. Refunds will be processed promptly upon cancellation.
          </div>
        </div>
      </div>

      {/* div1 */}
      <div className='mx-[4vw] my-[5vh] bg-white rounded-lg p-8 shadow-md'>
        <h2 className='text-2xl font-semibold mb-4'>Your Bookings</h2>
        <div className='overflow-x-auto'>
          <div className='bg-gray-800 p-4 rounded-md shadow-md'>
            <div className='flex gap-7 justify-evenly min-w-[600px]'>
              <div className="w-1/6 text-center text-white font-semibold">Hotel Booked</div>
              <div className="w-1/6 text-center text-white font-semibold">Hotel ID</div>
              <div className="w-1/6 text-center text-white font-semibold">Room ID</div>
              <div className="w-1/6 text-center text-white font-semibold">Check In Time</div>
              <div className="w-1/6 text-center text-white font-semibold">Check Out Time</div>
              <div className="w-1/6 text-center text-white font-semibold">Cancel Booking</div>
            </div>
          </div>

          {hotel && hotel.map((item, index) => {
            if (item.status === 'Booked') {
              // Convert entryTime from BigNumber to milliseconds
              const entryTimeMs = new BigNumber(item.entryTime.toString()).toNumber() * 1000;
              const entryTimeDate = new Date(entryTimeMs);
              const formattedEntryTime = entryTimeDate.toLocaleString();

              const exitTimeMs = new BigNumber(item.exitTime.toString()).toNumber() * 1000;
              const exitTimeDate = new Date(exitTimeMs);
              const formattedExitTime = exitTimeDate.toLocaleString();

              return (
                <div className='bg-gray-700 p-4 rounded-md mt-4'>
                  <div className='flex gap-7 justify-evenly items-center font-medium min-w-[600px]'>
                    <div className="w-1/6 text-center text-white font-semibold">{item.name}</div>
                    <div className="w-1/6 text-center text-gray-200">{item.hotelID.toString()}</div>
                    <div className="w-1/6 text-center text-gray-200">{item.roomID.toString()}</div>
                    <div className="w-1/6 text-center text-gray-200">{formattedEntryTime}</div>
                    <div className="w-1/6 text-center text-gray-200">{formattedExitTime}</div>
                    <div className="w-1/6 text-center">
                      <button onClick={() => roomCancel(item.hotelID, item.roomID, item.entryTime, item.exitTime)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>



      {/* div2 */}
      <div className='shadow-lg px-8 py-6 bg-white border border-gray-300 rounded-md mx-auto max-w-xl'>
        <div className='text-[#4b4848] font-semibold text-2xl mb-6'>Check Availability</div>

        <select
          className='w-full border border-gray-400 p-1 sm:p-2 my-2 sm:my-4 rounded-md appearance-none text-[#302c2c]'
          value={hotelID}
          onChange={(e) => setHotelID(e.target.value)}
        >
          <option value="" className='text-[#635f5f] font-semibold'>Select Hotel Name</option>
          <option value="11" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Omkar Pride</option>
          <option value="12" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">SAWAI Resort</option>
          <option value="13" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Hotel Radiance</option>
          <option value="21" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Hotel Oberoi</option>
          <option value="22" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Great Tripti</option>
          <option value="23" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Mariott Bonvoy</option>
          <option value="31" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Hotel Supremo</option>
          <option value="32" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Hotel Hyatt</option>
          <option value="33" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Resort LinChain</option>
          <option value="41" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Hotel Mosaicc</option>
          <option value="42" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Jaswithha</option>
          <option value="43" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Gaikwad Hotel</option>
          <option value="51" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Grand Residency</option>
          <option value="52" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Jayam Residency</option>
          <option value="53" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Shayayam Residency</option>
          <option value="61" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">SKY INNs</option>
          <option value="62" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Pavithhra</option>
          <option value="63" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Hotel SKYSPACE</option>
          <option value="71" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Sudharani Palace</option>
          <option value="72" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">White Palace Hotel</option>
          <option value="73" className="hover:bg-gray-100 font-raleway font-semibold text-[14px]">Park Platinum</option>
        </select>

        <div className='flex flex-col sm:flex-row justify-evenly gap-4 mb-6'>
          <div className='flex items-center gap-3 text-gray-800 font-medium'>
            <input
              className='cursor-pointer'
              onClick={() => setRoomID('1')}
              type="radio"
              id="r1_1"
              name="room1"
            />
            <label htmlFor="r1_1">ROOM 1</label>
          </div>
          <div className='flex items-center gap-3 text-gray-800 font-medium'>
            <input
              className='cursor-pointer'
              onClick={() => setRoomID('2')}
              type="radio"
              id="r1_2"
              name="room1"
            />
            <label htmlFor="r1_2">ROOM 2</label>
          </div>
          <div className='flex items-center gap-3 text-gray-800 font-medium'>
            <input
              className='cursor-pointer'
              onClick={() => setRoomID('3')}
              type="radio"
              id="r1_3"
              name="room1"
            />
            <label htmlFor="r1_3">ROOM 3</label>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row items-center justify-evenly gap-4 mb-6'>
          <div className="flex flex-col">
            <label htmlFor="check-in-time" className="text-gray-600 mb-2 text-base">Select Check In Time:</label>
            <input
              className="appearance-none border rounded shadow-sm py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="datetime-local"
              id="check-in-time"
              defaultValue={new Date().toISOString().slice(0, 16)}
              onChange={(e) => {
                const date = new Date(e.target.value);
                const epochSeconds = Math.round(date.getTime() / 1000);
                setEntry(epochSeconds);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="check-out-time" className="text-gray-600 mb-2 text-base">Select Check Out Time:</label>
            <input
              className="appearance-none border rounded shadow-sm py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="datetime-local"
              id="check-out-time"
              defaultValue={new Date().toISOString().slice(0, 16)}
              onChange={(e) => {
                const date = new Date(e.target.value);
                const epochSeconds = Math.round(date.getTime() / 1000);
                setExit(epochSeconds);
              }}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          {!availabilityLoader ?
            <button className='text-white bg-yellow-600 hover:bg-yellow-700 font-medium text-base sm:text-lg py-2 sm:py-3 px-6 rounded-md flex items-center' onClick={() => roomAvailability(hotelID, roomID, entry, exit)}>Check Availability</button>
            :
            <button className='text-white bg-yellow-600 font-medium text-base sm:text-lg py-2 sm:py-3 px-6 rounded-md flex items-center' disabled>Checking...</button>
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Bookings;
