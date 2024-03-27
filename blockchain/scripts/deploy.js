const hre = require("hardhat");

async function main() {
  const Travel = await hre.ethers.getContractFactory("Travel");
  const travel = await Travel.deploy();
  await travel.waitForDeployment();
  console.log("deployed to: ", `${travel.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});