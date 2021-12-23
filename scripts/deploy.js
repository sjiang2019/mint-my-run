const hre = require("hardhat");

async function main() {
  const MintMyRun = await hre.ethers.getContractFactory("MintMyRun");
  const mintMyRun = await MintMyRun.deploy();

  await mintMyRun.deployed();

  console.log("MintMyRun deployed to:", mintMyRun.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
