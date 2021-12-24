import * as ethers from "ethers";
import {
  MINT_PRICE_WEI,
  OPTIMISM_CONTRACT_ADDRESS,
} from "../constants/constants";

import MintMyRun from "../constants/contractAbis/MintMyRun.json";

export async function mintNFTs(tokenUris: Array<string>) {
  try {
    // @ts-expect-error
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      OPTIMISM_CONTRACT_ADDRESS,
      MintMyRun.abi,
      provider
    );
    const contractSigner = contract.connect(signer);
    const address = await signer.getAddress();
    // Sale should already be active
    // await contractSigner.setSaleIsActive(true);
    const price = ethers.utils.parseEther(
      ethers.utils.formatEther((MINT_PRICE_WEI * tokenUris.length).toString())
    );
    await contractSigner.mint(tokenUris, {
      from: address,
      value: price,
    });
  } catch (e: unknown) {
    // @ts-expect-error
    const errorString = e.hasOwnProperty("message")
      ? // @ts-expect-error
        e.message
      : "Mint failed due to unknown error.";
    alert(errorString);
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
