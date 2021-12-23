import { Grid } from "@mui/material";
import { useLocation } from "react-router";
import { useState } from "react";
import { Map } from "leaflet";
import { SimpleMapScreenshoter } from "leaflet-simple-map-screenshoter";

import { ActivityData, ActivityMetadata } from "../constants/models";
import { NAVY_BLUE, OFF_WHITE } from "../constants/styles";
import { Button } from "../components/base/Button";
import { useToggleMeasurement } from "../hooks/useToggleMeasurement";
import { requestAccount, startMintFlow } from "../utils/mint";
import MintActivityListItem from "../components/MintActivityListItem";
import MeasurementToggle from "../components/base/MeasurementToggle";
import { UseUpdateActivitiesData } from "../hooks/useUpdateActivitiesData";
import { pinFileToIPFS, pinJSONToIPFS } from "../utils/pin";

function handleClickMint(activitiesData: Array<ActivityData>) {
  // activitiesData.forEach((data: ActivityData) => {
  //   new SimpleMapScreenshoter({ hidden: true })
  //     .addTo(data.map as Map)
  //     .takeScreen("image", { mimeType: "image/png" })
  //     .then((imgUrl: any) => {
  //       pinFileToIPFS(imgUrl, JSON.stringify(data.metadata, null, 2));
  //     });
  // });
  const data = activitiesData[0];

  new SimpleMapScreenshoter({ hidden: true })
    .addTo(data.map as Map)
    .takeScreen("image", { mimeType: "image/png" })
    .then((imgUrl: any) => {
      pinJSONToIPFS();
    });
}

export default function MintPage(): JSX.Element {
  const [measurementSystem, onChangeMeasureSystem, makeReadableActivity] =
    useToggleMeasurement();
  const [activitiesData, removeActivityById, addMapById, updateMetadataById] =
    UseUpdateActivitiesData(useLocation().state, makeReadableActivity);

  const hasFullyLoadedMaps = activitiesData.every((data) => data.map != null);
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
              backgroundColor: NAVY_BLUE,
              color: OFF_WHITE,
            }}
            disabled={!hasFullyLoadedMaps}
            onClick={async () => {
              if (hasFullyLoadedMaps) {
                handleClickMint(activitiesData);
              }
              // await startMintFlow();
              // await requestAccount();
            }}
          >
            Mint activities
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
                  onChangeActivityMetadata={(metadata: ActivityMetadata) => {
                    updateMetadataById(activityId, metadata);
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
