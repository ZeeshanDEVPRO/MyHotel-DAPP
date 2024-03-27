// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HotelBooking {
    address public owner;
    uint256 public roomPrice;
    
    struct Booking {
        address guest;
        uint256 checkInDate;
        uint256 checkOutDate;
        uint256 rating;
        string review;
        bool specialRequest;
    }

    struct Profile{
        string name;
        string payable address;
        uint256 age; 
        string gender;
        string profilePic;
        uint256 mobileNumber;
    }
    
    mapping(uint256 => Booking) public bookings;
    mapping(uint256 => bool) public bookedDates;
    uint256 public nextBookingId;
    
    mapping(address => uint256) public loyaltyPoints;
    
    event RoomBooked(address indexed guest, uint256 indexed bookingId, uint256 checkInDate, uint256 checkOutDate);
    event BookingCanceled(uint256 indexed bookingId);
    event RoomPriceChanged(uint256 newPrice);
    event BookingExtended(uint256 indexed bookingId, uint256 newCheckOutDate);
    event ReviewAdded(uint256 indexed bookingId, uint256 rating, string review);
    event SpecialRequestAdded(uint256 indexed bookingId, bool specialRequest);
    
    constructor(uint256 _roomPrice) {
        owner = msg.sender;
        roomPrice = _roomPrice;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    function bookRoom(uint256 _checkInDate, uint256 _checkOutDate, bool _specialRequest) external payable {
        require(_checkInDate < _checkOutDate, "Invalid date range");
        require(msg.value >= roomPrice, "Insufficient funds");
        require(checkAvailability(_checkInDate, _checkOutDate), "Room not available for selected dates");
        
        bookedDates[_checkInDate] = true;
        bookedDates[_checkOutDate] = true;
        
        bookings[nextBookingId] = Booking(msg.sender, _checkInDate, _checkOutDate, 0, "", _specialRequest);
        emit RoomBooked(msg.sender, nextBookingId, _checkInDate, _checkOutDate);
        
        nextBookingId++;
    }
    
    function cancelBooking(uint256 _bookingId) external {
        require(bookings[_bookingId].guest == msg.sender, "You are not the guest of this booking");
        
        uint256 checkInDate = bookings[_bookingId].checkInDate;
        uint256 checkOutDate = bookings[_bookingId].checkOutDate;
        delete bookings[_bookingId];
        bookedDates[checkInDate] = false;
        bookedDates[checkOutDate] = false;
        
        emit BookingCanceled(_bookingId);
    }
    
    function changeRoomPrice(uint256 _newPrice) external onlyOwner {
        roomPrice = _newPrice;
        emit RoomPriceChanged(_newPrice);
    }
    
    function extendBooking(uint256 _bookingId, uint256 _newCheckOutDate) external payable {
        require(bookings[_bookingId].guest == msg.sender, "You are not the guest of this booking");
        require(_newCheckOutDate > bookings[_bookingId].checkOutDate, "New check-out date should be after current check-out date");
        require(msg.value >= roomPrice * ((_newCheckOutDate - bookings[_bookingId].checkOutDate) / 1 days), "Insufficient funds");
        
        bookings[_bookingId].checkOutDate = _newCheckOutDate;
        bookedDates[_newCheckOutDate] = true;
        
        emit BookingExtended(_bookingId, _newCheckOutDate);
    }
    
    function addReview(uint256 _bookingId, uint256 _rating, string memory _review) external {
        require(bookings[_bookingId].guest == msg.sender, "You are not the guest of this booking");
        require(_rating >= 1 && _rating <= 5, "Invalid rating");
        
        bookings[_bookingId].rating = _rating;
        bookings[_bookingId].review = _review;
        
        emit ReviewAdded(_bookingId, _rating, _review);
    }
    
    function addSpecialRequest(uint256 _bookingId, bool _specialRequest) external {
        require(bookings[_bookingId].guest == msg.sender, "You are not the guest of this booking");
        
        bookings[_bookingId].specialRequest = _specialRequest;
        
        emit SpecialRequestAdded(_bookingId, _specialRequest);
    }
    
    function getBookingDetails(uint256 _bookingId) external view returns (address guest, uint256 checkInDate, uint256 checkOutDate, uint256 rating, string memory review, bool specialRequest) {
        guest = bookings[_bookingId].guest;
        checkInDate = bookings[_bookingId].checkInDate;
        checkOutDate = bookings[_bookingId].checkOutDate;
        rating = bookings[_bookingId].rating;
        review = bookings[_bookingId].review;
        specialRequest = bookings[_bookingId].specialRequest;
    }
    
    function withdrawFunds() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    function checkAvailability(uint256 _checkInDate, uint256 _checkOutDate) internal view returns (bool) {
        for (uint256 i = _checkInDate; i < _checkOutDate; i++) {
            if (bookedDates[i]) {
                return false;
            }
        }
        return true;
    }
}
