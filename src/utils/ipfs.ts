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
import { ActivityData, ActivityMetadata } from "../constants/models";
import { makeIPFSUrl } from "./utils";

export function uploadActivityDataToIPFS(
  activitiesData: Array<ActivityData>
): void {
  activitiesData.forEach(async (data: ActivityData) => {
    const fileBlob = (await new SimpleMapScreenshoter({ hidden: true })
      .addTo(data.map as Map)
      .takeScreen("blob")) as Blob;
    const cid = await pinFileToIPFS(
      fileBlob,
      data.metadata.name,
      data.metadata
    );
    await pinJSONToIPFS({ ...data.metadata, image: makeIPFSUrl(cid) });
  });
}

export async function pinFileToIPFS(
  blob: Blob,
  name: string,
  metadata: ActivityMetadata
): Promise<string> {
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
  console.log("pinFileToIPFS response:", response);
  return response.data.IpfsHash;
}

export async function pinJSONToIPFS(metadata: ActivityMetadata): Promise<void> {
  const metadataString = {
    pinataMetadata: {
      name: metadata.name,
    },
    pinataContent: metadata,
  };
  const response = await axios.post(PIN_JSON_TO_IPFS_API, metadataString, {
    headers: {
      pinata_api_key: REACT_APP_PINATA_API_KEY as string,
      pinata_secret_api_key: REACT_APP_PINATA_API_SECRET as string,
    },
  });
  console.log("pinJSONToIPFS response:", response);
}
