import axios from "axios";
import FormData from "form-data";

import {
  REACT_APP_PINATA_API_KEY,
  REACT_APP_PINATA_API_SECRET,
} from "../constants/constants";

// const fs = require("fs");

export async function pinFileToIPFS(
  fileUrl: string,
  metadata: string
): Promise<void> {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  //we gather a local file for this example, but any valid readStream source will work here.
  // let data = new FormData();
  // data.append("file", fs.createReadStream(fileUrl));

  // data.append("pinataMetadata", metadata);

  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredReplicationCount: 1,
        },
        {
          id: "NYC1",
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  // data.append("pinataOptions", pinataOptions);

  // const response = await axios.post(url, data, {
  //   // @ts-expect-error
  //   maxBodyLength: "Infinity",
  //   headers: {
  //     // @ts-expect-error
  //     "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
  //     pinata_api_key: REACT_APP_PINATA_API_KEY as string,
  //     pinata_secret_api_key: REACT_APP_PINATA_API_SECRET as string,
  //   },
  // });

  // console.log("pinata response:", response);
}

export const pinJSONToIPFS = () => {
  const JSONBody = {
    pinataMetadata: {
      name: "ItemStatus",
      keyvalues: {
        ItemID: "Item001",
        CheckpointID: "Checkpoint002",
        Source: "CompanyA",
        WeightInKilos: 5.25,
      },
    },
    pinataContent: {
      itemName: "exampleItemName",
      inspectedBy: "Inspector001",
      dataValues: [],
    },
  };
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
    .post(url, JSON.stringify(JSONBody, null, 2), {
      headers: {
        pinata_api_key: REACT_APP_PINATA_API_KEY as string,
        pinata_secret_api_key: REACT_APP_PINATA_API_SECRET as string,
      },
    })
    .then(function (response) {
      //handle response here
    })
    .catch(function (error) {
      //handle error here
    });
};
