import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TbAirConditioning } from "react-icons/tb";
import { IoWifiSharp } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { MdSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import Slider from "@mui/material/Slider";

const Hotels = ({ connectContract }) => {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [range, setRange] = useState([800, 3000]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [])

  const handleOptionChange = async (option) => {

    setSelectedOptions(prevOptions => {
      if (prevOptions.includes(option)) {
        return prevOptions.filter(item => item !== option);
      } else {
        return [...prevOptions, option];
      }
    });
    console.log(selectedOptions);

    try {
      const response = await fetch(`https://my-hotel-dapp-backend.vercel.app/searchByFacility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedFacilities: selectedOptions }),
      });
      const data = await response.json();
      if (data.length == 0) {
        fetchProducts();
        return;
      }
      setHotels(data);
      console.log('Response from backend:', data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const url = new URL(`https://my-hotel-dapp-backend.vercel.app/allproducts`);

      const response = await fetch(url, {
        method: "get",
      });

      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    setSearchTerm(key);
    if (key) {
      try {
        const url = new URL(`https://my-hotel-dapp-backend.vercel.app/search/${key}`);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const searchData = await response.json();
        setHotels(searchData);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    } else {
      fetchProducts();
    }
  };

  const handleButtonClick = (value) => {
    if (value !== '') {
      searchHandle({ target: { value } });
    }
    else {
      fetchProducts();
      setSearchTerm('');
    }
  };

  const book = (id) => {

    if (localStorage.getItem('hotelID')) {
      localStorage.removeItem('hotelID');
    }
    connectContract();
    localStorage.setItem('hotelID', id);
    navigate('/book');
  };

  const handlePriceChanges = async (event, newValue) => {
    setRange(newValue);
    setSearchTerm("");
    if (newValue.length === 2) {
      const minPrice = newValue[0];
      const maxPrice = newValue[1];
      try {
        const url = new URL(`https://my-hotel-dapp-backend.vercel.app/${minPrice}/${maxPrice}`);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const searchData = await response.json();
        setHotels(searchData);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    }
  }

  return (
    <div className="mt-[13vh] font-noto-sans-<uniquifier> font-sans flex ">
      {/* div1 */}
      <div className="scrollbar overflow-y-auto w-[30vw] h-[86vh] position-fixed top-0 p-[5vh]">

        <div className='text-3xl font-semibold text-[#333]'>Filters</div>
        <div className='font-medium my-[1vh]'>Popular locations for you</div>

        {/* search bar */}
        <div className='py-[2vh]'>
          <input
            type="text"
            className="w-full p-[1.5vh] border border-gray-300 rounded-md"
            placeholder="Search for a city or hotel"
            onChange={searchHandle}
            value={searchTerm}
          />
          <div className='flex flex-wrap my-[2vh]'>
            <button className='bg-[#F0EAEB] border border-gray-300 p-[0.5vh] px-[1vw] m-[0.8vh] rounded-lg cursor-pointer' value={"Pune"} onClick={(e) => handleButtonClick(e.target.value)}>Pune</button>
            <button className='bg-[#F0EAEB] border border-gray-300 p-[0.5vh] px-[1vw] m-[0.8vh] rounded-lg cursor-pointer' value={"Delhi"} onClick={(e) => handleButtonClick(e.target.value)}>Delhi</button>
            <button className='bg-[#F0EAEB] border border-gray-300 p-[0.5vh] px-[1vw] m-[0.8vh] rounded-lg cursor-pointer' value={"Mumbai"} onClick={(e) => handleButtonClick(e.target.value)}>Mumbai</button>
            <button className='bg-[#F0EAEB] border border-gray-300 p-[0.5vh] px-[1vw] m-[0.8vh] rounded-lg cursor-pointer' value={"Chennai"} onClick={(e) => handleButtonClick(e.target.value)}>Chennai</button>
            <button className='bg-[#F0EAEB] border border-gray-300 p-[0.5vh] px-[1vw] m-[0.8vh] rounded-lg cursor-pointer' value={"Kolkata"} onClick={(e) => handleButtonClick(e.target.value)}>Kolkata</button>
            <button className='bg-[#F0EAEB] border border-gray-300 p-[0.5vh] px-[1vw] m-[0.8vh] rounded-lg cursor-pointer' value={"Bangalore"} onClick={(e) => handleButtonClick(e.target.value)}>Bangalore</button>
            <button className='bg-[#F0EAEB] border border-gray-300 p-[0.5vh] px-[1vw] m-[0.8vh] rounded-lg cursor-pointer' value={"Hyderabad"} onClick={(e) => handleButtonClick(e.target.value)}>Hyderabad</button>
          </div>
        </div>
        <hr />

        {/* range price bar */}
        <div className='m-[3vh] font-medium text-[#333]'>
          <h3 className='py-[2vh] font-semibold text-2xl text-#222'>Price</h3>
          <Slider
            className='w-[25vw]'
            value={range}
            onChange={handlePriceChanges}
            valueLabelDisplay="auto"
            min={800}
            max={3000}
          />
          The selected range is {range[0]} - {range[1]}
        </div>

        <hr />

        {/* hotel facilities */}
        <div className='m-[2vh] flex flex-col gap-5 py-[4vh]'>
          <div className='font-bold text-xl text-#222'>Hotel Facilities</div>
          <div className='flex flex-col gap-4 text-[#5c5757]'>
            <label className='flex gap-3'>
              <input type="checkbox" value="Seating Area" checked={selectedOptions.includes("Seating Area")} onChange={() => handleOptionChange("Seating Area")} />
              <div>Seating Area</div>
            </label>
            <label className='flex gap-3'>
              <input type="checkbox" value="Mini Fridge" checked={selectedOptions.includes("Mini Fridge")} onChange={() => handleOptionChange("Mini Fridge")} />
              <div>Mini Fridge</div>
            </label>
            <label className='flex gap-3'>
              <input type="checkbox" value="TV" checked={selectedOptions.includes("TV")} onChange={() => handleOptionChange("TV")} />
              <div>TV</div>
            </label>
            <label className='flex gap-3'>
              <input type="checkbox" value="Elevator" checked={selectedOptions.includes("Elevator")} onChange={() => handleOptionChange("Elevator")} />
              <div>Elevator</div>
            </label>
            <label className='flex gap-3'>
              <input type="checkbox" value="Housekeeping" checked={selectedOptions.includes("Housekeeping")} onChange={() => handleOptionChange("Housekeeping")} />
              <div>24/7 Housekeeping</div>
            </label>
          </div>

        </div>
        <hr />

      </div>

      <div className="h-[100vh] border-l border-gray-300"></div>

      {/* div2 */}
      <div className=" overflow-y-auto w-[70vw] h-[86vh] py-[5vh]">
        <div className='custom-button cursor-pointer mx-[8vh] p-[1.5vh] w-[23vw] flex items-center justify-center gap-2'>
          <div><FaMoneyBillTransfer color='#00b28a' fontSize='34px' /></div>
          <div className='text-sm text-customGray'>Your <span className='text-red-500 font-bold'>₹2000</span> MyHotel Money is pre-applied on all properties to show the best room price.</div>
        </div>



        {
          hotels.length > 0 ? hotels.map((hotel, index) => (
            <div key={index} className='p-[8vh] flex border-b border-gray-300'>
              <div className='relative'>
                <div className='w-[35vw] h-[35vh] overflow-hidden flex justify-center items-center'>
                  <img className="object-cover" src={hotel.photo} alt={hotel.name} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm font-semibold p-2">
                  <div>Hotel ID - {hotel.hotelId}</div>
                </div>
              </div>
              <div className='flex flex-col justify-center gap-1.5 px-[3vw]'>
                <div className='text-2xl font-bold font-inter sans-serif'>{hotel.name}</div>
                <div className='flex'>
                  <div className='text-lg font-inter sans-serif'>{hotel.address}</div>
                  <div className='text-lg font-inter sans-serif'>, {hotel.city}</div>
                </div>
                <div className='flex items-center gap-3'>
                  <img className="max-h-[3vh]" src='data:image/jpeg;base64,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' />
                  <div className='text-lg'>{hotel.ratings}</div>
                </div>
                <div className='flex gap-8 font-light '>
                  <div className='flex gap-2 items-center'><TbAirConditioning color='grey' fontSize={22} /><div>AC</div></div>
                  <div className='flex gap-2 items-center'><FaCar color='grey' fontSize={22} /><div>Parking</div></div>
                  <div className='flex gap-2 items-center'><IoWifiSharp color='grey' fontSize={22} /><div>Wi-Fi</div></div>
                </div>
                <div className='flex justify-between items-baseline gap-2'>
                  <div className='text-2xl font-bold'>₹ {hotel.price}</div>
                  <div className='text-yellow-500 font-bold'>{hotel.discount} % off</div>
                </div>
                <button className="bg-[#1ab64f] hover:bg-green-700 text-lg font-bold text-white p-[0.7vh] px-[1.2vw] m-[0.8vh] rounded-sm cursor-pointer shadow-md" onClick={() => book(hotel.hotelId)}>Book Now</button>
              </div>
            </div>
          ))
            :
            (
              <div className='text-3xl font-bold flex flex-col gap-4 items-center justify-center h-[100vh]'>
                <div>No matching results For Now</div>
                <div>OR</div>
                <div className='flex items-center gap-2'><MdSignalWifiStatusbarConnectedNoInternet4 /><div>Internet/Metamask Error</div></div>
              </div>
            )
        }

      </div>
    </div>
  )
}

export default Hotels