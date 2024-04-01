const hre = require("hardhat");

async function main() {
  const HotelBooking = await hre.ethers.getContractFactory("HotelBooking");
  const hotelBooking = await HotelBooking.deploy();
  await hotelBooking.waitForDeployment();
  console.log("deployed to: ", `${hotelBooking.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});