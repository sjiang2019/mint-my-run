import axios from "axios";
import * as ethers from "ethers";
import {
  MINT_PRICE_WEI,
  OPTIMISM_CONTRACT_ADDRESS,
  REACT_APP_ETHERSCAN_API_TOKEN,
} from "../constants/constants";

import MintMyRun from "../constants/contractAbis/MintMyRun.json";
import { ActivityMetadata } from "../constants/models";

export async function mintNFTs(tokenUris: Array<string>): Promise<void> {
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

export async function fetchTokenURIs(): Promise<Array<string>> {
  try {
    // @ts-expect-error
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      OPTIMISM_CONTRACT_ADDRESS,
      MintMyRun.abi,
      provider
    );
    const address = await signer.getAddress();
    const response = await axios.get(
      `https://api-optimistic.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${OPTIMISM_CONTRACT_ADDRESS}&address=${address}&page=1&offset=100&sort=asc&apikey=${REACT_APP_ETHERSCAN_API_TOKEN}`
    );
    // @ts-expect-error
    const tokenIds = response.data.result.map((res) => parseInt(res.tokenID));
    const contractSigner = contract.connect(signer);
    const tokenURIs = await Promise.all(
      tokenIds.map(async (id: number): Promise<string> => {
        return await contractSigner.tokenURI(id);
      })
    );
    return tokenURIs;
  } catch (e: unknown) {
    // @ts-ignore
    alert(e.message);
    return [];
  }
}

export async function fetchMetadataFromTokenURIs(
  tokenURIs: Array<string>
): Promise<Array<ActivityMetadata>> {
  return await Promise.all(
    tokenURIs.map(async (uri: string): Promise<ActivityMetadata> => {
      const response = await axios.get(uri);
      return response.data as ActivityMetadata;
    })
  );
}
