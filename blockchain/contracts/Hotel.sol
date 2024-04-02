// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Hotel {
    address payable public owner;

    struct Room {
        string name;
        uint256 price;
        uint256 discount;
        uint256[] entryTime;
        uint256[] exitTime;
    }

    struct BookedRoom {
        address payable user;
        bytes32 roomKey;
        uint256 entryTime;
        uint256 exitTime;
    }

    mapping(bytes32 => Room) public hotelRooms;
    mapping(address => BookedRoom[]) public userBookings;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(
        string[] memory _name,
        string[] memory _hotelID,
        string[] memory _roomID,
        uint256[] memory _price,
        uint256[] memory _discount
    ) {
        owner = payable(msg.sender);
        for (uint256 i = 0; i < _name.length; i++) {
            addRoom(_name[i], _hotelID[i], _roomID[i], _price[i], _discount[i]);
        }
    }

    function addRoom(
        string memory _name,
        string memory _hotelID,
        string memory _roomID,
        uint256 _price,
        uint256 _discount
    ) internal {
        bytes32 roomKey = getRoomKey(_hotelID, _roomID);
        hotelRooms[roomKey] = Room(
            _name,
            _price,
            _discount,
            new uint256[](0),
            new uint256[](0)
        );
    }

    function bookRoom(
        bytes32 _roomKey,
        uint256 _entryTime,
        uint256 _exitTime
    ) external payable {
        Room storage room = hotelRooms[_roomKey];
        require(
            checkAvailability(room, _entryTime, _exitTime),
            "Room is not available"
        );

        uint256 pricePerHour = calculatePricePerHour(room);
        uint256 hoursBooked = _exitTime - _entryTime;
        uint256 toPay = (pricePerHour * hoursBooked) / 3600;
        require(msg.value >= toPay, "Insufficient balance");

        room.entryTime.push(_entryTime);
        room.exitTime.push(_exitTime);

        address payable user = payable(msg.sender);
        user.transfer(toPay);

        userBookings[user].push(
            BookedRoom(user, _roomKey, _entryTime, _exitTime)
        );
    }

    function cancelBooking(
        bytes32 _roomKey,
        uint256 _entryTime,
        uint256 _exitTime
    ) external payable {
        require(
            block.timestamp <= _entryTime,
            "Can not cancel after entry time"
        );

        Room storage room = hotelRooms[_roomKey];
        require(room.entryTime.length > 0, "No bookings for this room");

        bool bookingFound = false;
        for (uint256 i = 0; i < room.entryTime.length; i++) {
            if (
                room.entryTime[i] == _entryTime && room.exitTime[i] == _exitTime
            ) {
                room.entryTime[i] = room.entryTime[room.entryTime.length - 1];
                room.exitTime[i] = room.exitTime[room.exitTime.length - 1];
                room.entryTime.pop();
                room.exitTime.pop();
                bookingFound = true;
                break;
            }
        }
        require(bookingFound, "Booking not found");

        uint256 refundAmount = (_exitTime - block.timestamp <= 2 days)
            ? (msg.value * 9) / 10
            : msg.value;
        payable(msg.sender).transfer(refundAmount);
    }

    function checkAvailability(
        Room storage _room,
        uint256 _entryTime,
        uint256 _exitTime
    ) internal view returns (bool) {
        for (uint256 i = 0; i < _room.entryTime.length; i++) {
            if (
                _entryTime < _room.exitTime[i] && _exitTime > _room.entryTime[i]
            ) {
                return false;
            }
        }
        return true;
    }

    function calculatePricePerHour(Room storage _room)
        internal
        view
        returns (uint256)
    {
        return (_room.price * (100 - _room.discount)) / 3600;
    }

    function getRoomKey(string memory _hotelID, string memory _roomID)
        public
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(_hotelID, _roomID));
    }

    function withdrawFunds() external onlyOwner {
        owner.transfer(address(this).balance);
    }

    function getBookingDetails() external view returns (BookedRoom[] memory) {
        return userBookings[msg.sender];
    }

    // Payable fallback function to receive Ether
    receive() external payable {}
}
