// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HotelBooking {
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    struct Room {
        string name;
        string hotelID;
        uint256 price;
        uint256 discount;
        string roomID;
        uint256[] entryTime;
        uint256[] exitTime;
    }

    struct BookedRoom {
        address payable user;
        string roomID;
        string hotelID;
        uint256 entryTime;
        uint256 exitTime;
    }

    mapping(string => mapping(string => Room)) hotelRooms; //hotelRooms[B2][R3]  --  Room
    mapping(address => BookedRoom[]) userBookings; //userBookings[U1][2]

    // Function to book a room
    function bookRoom(
        address payable user,
        string memory _hotelID,
        string memory _roomID,
        uint256 _entryTime,
        uint256 _exitTime
    ) public payable {
        require(
            checkAvailability(_hotelID, _roomID, _entryTime, _exitTime),
            "Room is not available"
        );

        uint256 pricePerDay = hotelRooms[_hotelID][_roomID].price -
            ((hotelRooms[_hotelID][_roomID].price *
                hotelRooms[_hotelID][_roomID].discount) / 100);
        uint256 hoursBooked = (_exitTime - _entryTime) / 3600; // seconds to hours
        uint256 toPay = (pricePerDay * hoursBooked) / 24; // Adjusted calculation
        require(msg.value >= toPay, "Insufficient balance");

        //Payment
        user.transfer(toPay);

        // Add booking
        BookedRoom memory newBooking;
        newBooking.user = user;
        newBooking.roomID = _roomID;
        newBooking.hotelID = _hotelID;
        newBooking.entryTime = _entryTime;
        newBooking.exitTime = _exitTime;
        userBookings[user].push(newBooking);

        // Update availability
        hotelRooms[_hotelID][_roomID].entryTime.push(_entryTime);
        hotelRooms[_hotelID][_roomID].exitTime.push(_exitTime);
    }

    // Function to cancel a booking
    function cancelBooking(
        string memory _roomID,
        string memory _hotelID,
        uint256 _entryTime,
        uint256 _exitTime
    ) public payable {
        require(
            block.timestamp <= _entryTime,
            "Can not cancel after entry time"
        );
        address payable user = payable(msg.sender);
        BookedRoom[] storage bookings = userBookings[user];
        for (uint256 i = 0; i < bookings.length; i++) {
            if (
                keccak256(abi.encodePacked(bookings[i].roomID)) ==
                keccak256(abi.encodePacked(_roomID))
            ) {
                // Remove booking
                bookings[i] = bookings[bookings.length - 1];
                bookings.pop();
                break;
            }
        }

        // Update availability
        for (
            uint256 i = 0;
            i < hotelRooms[_hotelID][_roomID].entryTime.length;
            i++
        ) {
            if (
                hotelRooms[_hotelID][_roomID].entryTime[i] == _entryTime &&
                hotelRooms[_hotelID][_roomID].exitTime[i] == _exitTime
            ) {
                // Delete entry and exit time from arrays
                delete hotelRooms[_hotelID][_roomID].entryTime[i];
                delete hotelRooms[_hotelID][_roomID].exitTime[i];
                break;
            }
        }

        // Refund payment
        uint256 refundAmount = calculateRefundAmount(
            _hotelID,
            _roomID,
            _entryTime,
            _exitTime
        );
        user.transfer(refundAmount);
    }
    function calculateRefundAmount(
        string memory _hotelID,
        string memory _roomID,
        uint256 _entryTime,
        uint256 _exitTime
    ) private view returns (uint256) {
        uint256 pricePerDay = hotelRooms[_hotelID][_roomID].price -
            ((hotelRooms[_hotelID][_roomID].price *
                hotelRooms[_hotelID][_roomID].discount) / 100);
        uint256 hoursBooked = (_exitTime - _entryTime) / 3600; // seconds to hours
        uint256 toPay = (pricePerDay * hoursBooked) / 24; // Adjusted calculation

        if (_entryTime - block.timestamp <= 2 days) {
            uint256 refundAmount = toPay - (toPay / 10); // 10% deduction
            return refundAmount;
        } else {
            return toPay;
        }
    }

    // Function to withdraw funds
    function withdrawFunds() public payable {
        require(msg.sender == owner, "Only owner can withdraw funds");
        owner.transfer(address(this).balance);
    }

    // Function to check room availability
    function checkAvailability(
        string memory _hotelID,
        string memory _roomID,
        uint256 _entryTime,
        uint256 _exitTime
    ) public view returns (bool status) {
        require(
            _entryTime >= block.timestamp,
            "Entry time must be in the future"
        );
        require(_entryTime <= _exitTime, "Invalid time range");

        for (
            uint256 i = 0;
            i < hotelRooms[_hotelID][_roomID].entryTime.length;
            i++
        ) {
            if (
                hotelRooms[_hotelID][_roomID].entryTime[i] >= _exitTime ||
                hotelRooms[_hotelID][_roomID].exitTime[i] <= _entryTime
            ) {
                return true;
            }
        }
        return false;
    }

    // Function to get booking details
    function getBookingDetails(
        string memory _roomID,
        string memory _hotelID
    )
        public
        view
        returns (
            uint256[] memory entryTime,
            uint256[] memory exitTime,
            string memory name,
            string memory hotelID
        )
    {
        return (
            hotelRooms[_hotelID][_roomID].entryTime,
            hotelRooms[_hotelID][_roomID].exitTime,
            hotelRooms[_hotelID][_roomID].name,
            hotelRooms[_hotelID][_roomID].hotelID
        );
    }

    // Function to get previous bookings of the caller
    function previousBookings() public view returns (BookedRoom[] memory) {
        return userBookings[msg.sender];
    }
}
