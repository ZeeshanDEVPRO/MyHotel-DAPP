const contractAddress = "0x3cB1DE20Bd07327503014e5144ca99318379C7F7";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "_name",
        "type": "string[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_hotelID",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_roomID",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_price",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_discount",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_hotelID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_roomID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_entryTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_exitTime",
        "type": "uint256"
      }
    ],
    "name": "bookRoom",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_hotelID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_roomID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_entryTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_exitTime",
        "type": "uint256"
      }
    ],
    "name": "cancelBooking",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_hotelID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_roomID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_entryTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_exitTime",
        "type": "uint256"
      }
    ],
    "name": "checkAvailability",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_hotelID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_roomID",
        "type": "uint256"
      }
    ],
    "name": "getPriceArray",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProfile",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "mobile",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "profileImageHash",
            "type": "string"
          }
        ],
        "internalType": "struct Hotel.Profile",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProfileImage",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "hotels",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "discount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "roomID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "hotelID",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "myBookings",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "status",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "roomID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "hotelID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "entryTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "exitTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "myProfile",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "mobile",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "profileImageHash",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_mobile",
        "type": "uint256"
      }
    ],
    "name": "saveProfile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_profileImageHash",
        "type": "string"
      }
    ],
    "name": "saveProfileImage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export { contractAddress, contractABI }