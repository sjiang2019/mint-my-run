import * as ethers from "ethers";

import MintMyRun from "../constants/contractAbis/MintMyRun.json";

const LOCAL_CONTRACT_ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

export async function startMintFlow() {
  // @ts-expect-error
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  console.log("Account:", address);

  const contract = new ethers.Contract(
    LOCAL_CONTRACT_ADDRESS,
    MintMyRun.abi,
    provider
  );
  const contractBalance = await provider.getBalance(contract.address);
  console.log("contractBalance:", ethers.utils.formatEther(contractBalance));

  const contractSigner = contract.connect(signer);

  // await contractSigner.setSaleIsActive(true);

  // const totalSupplyBeforeMint = await contractSigner.totalSupply();
  // console.log("totalSupply before mint:", totalSupplyBeforeMint);

  const mintUris = ["uri_1", "uri_2", "uri_3"];
  try {
    await contractSigner.mint(mintUris, {
      from: address,
      value: ethers.utils.parseEther("0.015"),
    });
    console.log("mint succeeded");
  } catch (e: unknown) {
    console.log("mint failed");
  }

  const totalSupplyAfterMint = await contractSigner.totalSupply();
  console.log("totalSupply after mint:", totalSupplyAfterMint);
  for (let i = 0; i < mintUris.length; i++) {
    const tokenUri = await contractSigner.tokenURI(i);
    console.log("tokenId:", i);
    console.log("tokenUri:", tokenUri);
  }

  // await contractSigner.withdraw();
}

export async function requestAccount() {
  try {
    // @ts-expect-error
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } catch (error) {
    console.log("error");
    console.error(error);

    alert("Login to Metamask first");
  }
}
