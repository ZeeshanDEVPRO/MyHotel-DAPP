// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Hotel {
    address payable public owner;

    struct Room {
        uint256 price; // in wei
        uint256 discount; // in percentage
        uint256 roomID;
        uint256 hotelID;
        uint256[] entryTime;
        uint256[] exitTime;
    }

    struct BookedRoom {
        address payable user;
        string status;
        uint256 roomID;
        uint256 hotelID;
        uint256 entryTime;
        uint256 exitTime;
    }

    struct Profile {
        string name;
        string email;
        uint256 mobile; 
        string profileImageHash; // Store profile image hash
    }

    mapping(uint256 => mapping(uint256 => Room)) public hotels;
    mapping(address => BookedRoom[]) public myBookings;
    mapping(address => Profile) public myProfile;

    constructor(
        string[] memory _name,
        uint256[] memory _hotelID,
        uint256[] memory _roomID,
        uint256[] memory _price,   //in eth
        uint256[] memory _discount
     ) {
        require(
            _name.length == _hotelID.length &&
                _hotelID.length == _roomID.length &&
                _roomID.length == _price.length &&
                _price.length == _discount.length,
            "lengths not equal"
        );
        owner = payable(msg.sender);
        for (uint256 i = 0; i < _name.length; i++) {
            hotels[_hotelID[i]][_roomID[i]] = Room({
                price: _price[i]*1000000000000000000,  // in wei
                discount: _discount[i],
                roomID: _roomID[i],
                hotelID: _hotelID[i],
                entryTime: new uint256[](0)  ,
                exitTime: new uint256[](0)  
            });
        }
    }

    function bookRoom(
        uint256 _hotelID,
        uint256 _roomID,
        uint256 _entryTime,
        uint256 _exitTime
     ) external payable {
        Room storage room = hotels[_hotelID][_roomID];
        require(
            checkAvailability(_hotelID, _roomID, _entryTime, _exitTime),
            "Room is not available for the given slot"
        );

        uint256 pricePerHour = ((room.price * (100 - room.discount)) / 100) / 24;
        uint256 hoursBooked = (_exitTime - _entryTime) / 3600;
        uint256 toPay = pricePerHour * hoursBooked;
        require(msg.value >= toPay, "Insufficient balance in your account");

        address payable user = payable(msg.sender);
        user.transfer(toPay);

        room.entryTime.push(_entryTime);
        room.exitTime.push(_exitTime);

        myBookings[msg.sender].push(
            BookedRoom({
                user: user,
                status: "Booked",
                roomID: _roomID,
                hotelID: _hotelID,
                entryTime: _entryTime,
                exitTime: _exitTime
            })
        );
     }

    //extend stay

    function cancelBooking(
        uint256 _hotelID,
        uint256 _roomID,
        uint256 _entryTime,
        uint256 _exitTime
     ) external payable {
        require(
            block.timestamp <= _entryTime,
            "Can not cancel after entry time"
        );

        Room storage room = hotels[_hotelID][_roomID];
        require(room.entryTime.length > 0, "No bookings for this room");

        for (uint256 i = 0; i < room.entryTime.length; i++) {
            if (
                room.entryTime[i] == _entryTime && room.exitTime[i] == _exitTime
            ) {
                room.entryTime[i] = 0;
                room.exitTime[i] = 0;
            }
        }

        for (uint256 i = 0; i < myBookings[msg.sender].length; i++) {
            if (
                myBookings[msg.sender][i].roomID == _roomID &&
                myBookings[msg.sender][i].hotelID == _hotelID &&
                myBookings[msg.sender][i].entryTime == _entryTime &&
                myBookings[msg.sender][i].exitTime == _exitTime
            ) {
                myBookings[msg.sender][i].status = "Cancelled";
                break;
            }
        }

        uint256 refundAmount = (_exitTime - block.timestamp <= 2 days)
            ? (msg.value * 9) / 10
            : msg.value;
        payable(msg.sender).transfer(refundAmount);
    }

    function checkAvailability(
        uint256 _hotelID,
        uint256 _roomID,
        uint256 _entryTime,
        uint256 _exitTime
     ) public view returns (bool) {
        Room storage room = hotels[_hotelID][_roomID];
        for (uint256 i = 0; i < room.entryTime.length; i++) {
            if (
                _entryTime < room.exitTime[i] && _exitTime > room.entryTime[i]
            ) {
                return false; // Overlapping time slot found, room is not available
            }
        }
        return true; 
    }

    function withdrawFunds() external {
        require(msg.sender == owner, "only owner can withdraw funds");
        owner.transfer(address(this).balance);
    }

    function saveProfile(string memory _name, string memory _email, uint256 _mobile) public {
        myProfile[msg.sender] = Profile({
            name: _name,
            email: _email,
            mobile: _mobile,
            profileImageHash: ""
        });
    }

    function saveProfileImage(string memory _profileImageHash) external {
        myProfile[msg.sender].profileImageHash = _profileImageHash;
    }

    function getProfile() public view returns (Profile memory) {
        return myProfile[msg.sender];
    }

    function getProfileImage() public view returns (string memory) {
        return myProfile[msg.sender].profileImageHash;
    }

     function getPriceArray(uint256 _hotelID, uint256 _roomID) public view returns (uint256) {
        return hotels[_hotelID][_roomID].price;
    }
}
