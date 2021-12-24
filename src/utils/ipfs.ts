import axios from "axios";
import FormData from "form-data";
import { Map } from "leaflet";
import { SimpleMapScreenshoter } from "leaflet-simple-map-screenshoter";

import {
  PIN_FILE_TO_IPFS_API,
  PIN_JSON_TO_IPFS_API,
  REACT_APP_PINATA_API_KEY,
  REACT_APP_PINATA_API_SECRET,
} from "../constants/constants";
import { Activity, ActivityData, ActivityMetadata } from "../constants/models";
import { makeIPFSUrl } from "./utils";

export interface IPFSHash {
  fileHash: string;
  jsonHash: string;
}

export async function uploadActivityDataToIPFS(
  activitiesData: Array<ActivityData>,
  getActivityMetadata: (activity: Activity) => ActivityMetadata
): Promise<Array<IPFSHash>> {
  return await Promise.all(
    activitiesData.map(async (data: ActivityData): Promise<IPFSHash> => {
      const fileBlob = (await new SimpleMapScreenshoter({ hidden: true })
        .addTo(data.map as Map)
        .takeScreen("blob")) as Blob;
      const fileCid = await pinFileToIPFS(fileBlob, data.activity.name);
      const jsonCid = await pinJSONToIPFS({
        ...getActivityMetadata(data.activity),
        image: makeIPFSUrl(fileCid),
      });
      return { fileHash: fileCid, jsonHash: jsonCid };
    })
  );
}

export async function pinFileToIPFS(blob: Blob, name: string): Promise<string> {
  let data = new FormData();
  data.append("file", blob);
  data.append(
    "pinataMetadata",
    JSON.stringify({
      name: name,
    })
  );

  const response = await axios.post(PIN_FILE_TO_IPFS_API, data, {
    // @ts-expect-error
    maxBodyLength: "Infinity",
    headers: {
      // @ts-expect-error
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: REACT_APP_PINATA_API_KEY as string,
      pinata_secret_api_key: REACT_APP_PINATA_API_SECRET as string,
    },
  });
  return response.data.IpfsHash;
}

export async function pinJSONToIPFS(
  metadata: ActivityMetadata
): Promise<string> {
  const pinataMetadata = {
    pinataMetadata: {
      name: metadata.name,
    },
    pinataContent: metadata,
  };
  const response = await axios.post(PIN_JSON_TO_IPFS_API, pinataMetadata, {
    headers: {
      pinata_api_key: REACT_APP_PINATA_API_KEY as string,
      pinata_secret_api_key: REACT_APP_PINATA_API_SECRET as string,
    },
  });
  return response.data.IpfsHash;
}

export async function unpinFileToIPFS(hash: string): Promise<void> {
  const url = `https://api.pinata.cloud/pinning/unpin/${hash}`;
  await axios.delete(url, {
    headers: {
      pinata_api_key: REACT_APP_PINATA_API_KEY as string,
      pinata_secret_api_key: REACT_APP_PINATA_API_SECRET as string,
    },
  });
}
