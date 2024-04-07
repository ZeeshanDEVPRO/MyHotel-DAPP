const hre = require("hardhat");

async function main() {
  // Define the rooms array with bytes32 values


  // Deploy the Hotel contract with rooms as parameter
  const Hotel = await ethers.getContractFactory("Hotel");
  const hotel = await Hotel.deploy(
    ["Omkar Pride", "Omkar Pride", "Omkar Pride", "SAWAI Resort", "SAWAI Resort", "SAWAI Resort", "Hotel Radiance", "Hotel Radiance", "Hotel Radiance", "Hotel Oberoi", "Hotel Oberoi", "Hotel Oberoi", "Great Tripti", "Great Tripti", "Great Tripti",
      "Mariott Bonvoy", "Mariott Bonvoy", "Mariott Bonvoy", "Hotel Supremo", "Hotel Supremo", "Hotel Supremo", "Hotel Hyatt", "Hotel Hyatt", "Hotel Hyatt", "Resort LinChain", "Resort LinChain", "Resort LinChain", "Hotel Mosaicc", "Hotel Mosaicc", "Hotel Mosaicc"
      , "Jaswithha", "Jaswithha", "Jaswithha", "Gaikwad Hotel", "Gaikwad Hotel", "Gaikwad Hotel", "Grand Residency", "Grand Residency", "Grand Residency", "Jayam Residency", "Jayam Residency", "Jayam Residency"
      , "Shayayam Residency", "Shayayam Residency", "Shayayam Residency", "SKY INNs", "SKY INNs", "SKY INNs", "Pavithhra", "Pavithhra", "Pavithhra", "Hotel SKYSPACE", "Hotel SKYSPACE", "Hotel SKYSPACE", "Sudharani Palace", "Sudharani Palace", "Sudharani Palace",
      "White Palace Hotel", "White Palace Hotel", "White Palace Hotel", "Park Platinum", "Park Platinum", "Park Platinum"],
    
      [11, 11, 11, 12, 12, 12, 13, 13, 13, 21, 21, 21, 22, 22, 22, 23, 23, 23, 31, 31, 31, 32, 32, 32, 33, 33, 33, 41, 41, 41, 42, 42, 42, 43, 43, 43, 51, 51, 51, 52, 52, 52, 53, 53, 53, 61, 61, 61, 62, 62, 62, 63, 63, 63, 71, 71, 71, 72, 72, 72, 73, 73, 73],
    [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
    [30, 30, 30, 65, 65, 65, 33, 33, 33, 44, 44, 44, 30, 30, 30, 66, 66, 66, 33, 33, 33, 29, 29, 29, 33, 33, 33, 35, 35, 35, 32, 32, 32, 34, 34, 34, 31, 31, 31, 39, 39, 39, 39, 39, 39, 35, 35, 35, 39, 39, 39, 39, 39, 39, 39, 39, 39, 31, 31, 31, 34, 34, 34],
    [20, 20, 20, 20, 20, 20, 10, 10, 10, 12, 12, 12, 13, 13, 13, 10, 10, 10, 10, 10, 10, 12, 12, 12, 12, 12, 12, 10, 10, 10, 14, 14, 14, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 12, 12, 12, 9, 9, 9, 11, 11, 11, 12, 12, 12, 12, 12, 12, 10, 10, 10]);
  await hotel.waitForDeployment();

  console.log("Hotel deployed to: ", hotel.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0x30a2695Fc71C84Da507f22B302736f3045771Cc3
