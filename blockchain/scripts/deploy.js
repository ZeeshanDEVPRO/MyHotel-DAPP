const hre = require("hardhat");

async function main() {
  // Define the rooms array with bytes32 values


  // Deploy the Hotel contract with rooms as parameter
  const Hotel = await ethers.getContractFactory("Hotel");
  const hotel = await Hotel.deploy(
    ["MAriott", "Oberoi"],
    ["H1", "H2"],
    ["R1", "R2"],
    [800, 900],
    [20, 15]);
  await hotel.waitForDeployment();

  console.log("Hotel deployed to: ", hotel.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
