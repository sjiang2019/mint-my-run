import { Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { Map } from "leaflet";
import { useState } from "react";

import { Activity, ActivityData } from "../constants/models";
import { NAVY_BLUE, OFF_WHITE, SLATE_GRAY } from "../constants/styles";
import { Button } from "../components/base/Button";
import { useToggleMeasurement } from "../hooks/useToggleMeasurement";
import { mintNFTs } from "../utils/mint";
import MintActivityListItem from "../components/MintActivityListItem";
import MeasurementToggle from "../components/base/MeasurementToggle";
import { UseUpdateActivitiesData } from "../hooks/useUpdateActivitiesData";
import {
  uploadActivityDataToIPFS,
  IPFSHash,
  unpinFileToIPFS,
} from "../utils/ipfs";
import { makeActivityMetadata } from "../utils/parse";
import { makeIPFSUrl } from "../utils/utils";
import { MINTED_ACTIVITIES_ROUTE } from "../constants/constants";

export default function MintPage(): JSX.Element {
  const navigate = useNavigate();
  const { activities, initialMeasurementSystem } = useLocation().state;
  const [measurementSystem, onChangeMeasureSystem, makeReadableActivity] =
    useToggleMeasurement(initialMeasurementSystem);
  const [activitiesData, removeActivityById, addMapById, updateActivityById] =
    UseUpdateActivitiesData(activities);
  const [isMinting, setIsMinting] = useState(false);

  const hasFullyLoadedMaps = activitiesData.every((data) => data.map != null);
  const handleClickMint = async () => {
    setIsMinting(true);
    if (hasFullyLoadedMaps) {
      const ipfsHashes = await uploadActivityDataToIPFS(
        activitiesData,
        (activity: Activity) =>
          makeActivityMetadata(makeReadableActivity(activity))
      );
      const tokenUris = ipfsHashes.map((ipfsHash: IPFSHash) =>
        makeIPFSUrl(ipfsHash.jsonHash)
      );
      const didMint = await mintNFTs(tokenUris);
      if (!didMint) {
        await Promise.all(
          ipfsHashes.map(async (ipfsHash: IPFSHash) => {
            await unpinFileToIPFS(ipfsHash.fileHash);
            await unpinFileToIPFS(ipfsHash.jsonHash);
          })
        );
      } else {
        navigate(MINTED_ACTIVITIES_ROUTE);
      }
    }
    setIsMinting(false);
  };

  return (
    <Grid container justifyContent="center">
      <Grid container style={{ marginTop: "36px", width: "80%" }}>
        <Grid
          container
          justifyContent="space-between"
          sx={{ marginBottom: "12px" }}
        >
          <MeasurementToggle
            measurementSystem={measurementSystem}
            handleChangeMeasurementSystem={onChangeMeasureSystem}
          />
          <Button
            variant="contained"
            style={{
              height: "36px",
              backgroundColor: isMinting ? SLATE_GRAY : NAVY_BLUE,
              color: OFF_WHITE,
            }}
            disabled={!hasFullyLoadedMaps || isMinting}
            onClick={handleClickMint}
          >
            {isMinting ? "Minting in progress..." : "Mint activities"}
          </Button>
        </Grid>
        <Grid container spacing={1}>
          {activitiesData.map((data: ActivityData) => {
            const activityId = data.activity.id;
            return (
              <Grid item xs={12} key={`${activityId}_list`}>
                <MintActivityListItem
                  activityData={data}
                  onCreateMap={(map: Map) => addMapById(activityId, map)}
                  makeActivityMetadata={(activity: Activity) =>
                    makeActivityMetadata(makeReadableActivity(activity))
                  }
                  onChangeActivityData={(updates: Partial<Activity>) => {
                    updateActivityById(activityId, updates);
                  }}
                  onRemove={() => removeActivityById(activityId)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
