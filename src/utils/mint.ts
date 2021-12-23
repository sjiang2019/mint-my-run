import * as ethers from "ethers";
import { MINT_PRICE_WEI } from "../constants/constants";

import MintMyRun from "../constants/contractAbis/MintMyRun.json";

const LOCAL_CONTRACT_ADDRESS = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

export async function mintNFTs(tokenUris: Array<string>) {
  // @ts-expect-error
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  console.log("User ethereum address:", address);

  const contract = new ethers.Contract(
    LOCAL_CONTRACT_ADDRESS,
    MintMyRun.abi,
    provider
  );

  const contractSigner = contract.connect(signer);

  // Sale should already be active
  // await contractSigner.setSaleIsActive(true);

  const price = ethers.utils.parseEther(
    ethers.utils.formatEther((MINT_PRICE_WEI * tokenUris.length).toString())
  );

  try {
    await contractSigner.mint(tokenUris, {
      from: address,
      value: price,
    });
  } catch (e: unknown) {
    console.log("mint failed");
  }
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
