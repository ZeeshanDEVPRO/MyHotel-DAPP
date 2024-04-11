import React, { useEffect,useState } from 'react';

const Bookings = ({ account, contractIns, connectContract }) => {
  const [availabilityLoader, setAvailabilityLoader] = useState(false);

  useEffect(() => {
    if (!account) {
      connectContract();
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

  return (
    <div className='mt-[14vh] '>

      <div>Connected Metamask Address: {account}</div>

      {/* div1 */}
      <div>
        <div>All Bookings</div>
      </div>

      {/* div2 */}
      <div className='shadow px-[3vw] bg-[#e5eff1] border p-[3vh] rounded-[5px] mx-[8vw] my-[3vh] flex flex-col gap-5'>
        <div className='text-[#4b4848] font-semibold text-2xl'>Check Availability</div>
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

        <div className='flex justify-center gap-5 text-lg'>
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

    </div>
  );
};

export default Bookings;
