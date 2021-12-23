import { Grid } from "@mui/material";
import { useLocation } from "react-router";
import { Map } from "leaflet";

import { Activity, ActivityData, ActivityMetadata } from "../constants/models";
import { NAVY_BLUE, OFF_WHITE } from "../constants/styles";
import { Button } from "../components/base/Button";
import { useToggleMeasurement } from "../hooks/useToggleMeasurement";
import { requestAccount, startMintFlow } from "../utils/mint";
import MintActivityListItem from "../components/MintActivityListItem";
import MeasurementToggle from "../components/base/MeasurementToggle";
import { UseUpdateActivitiesData } from "../hooks/useUpdateActivitiesData";
import { uploadActivityDataToIPFS } from "../utils/ipfs";
import { makeActivityMetadata } from "../utils/parse";

export default function MintPage(): JSX.Element {
  const { activities, initialMeasurementSystem } = useLocation().state;
  const [measurementSystem, onChangeMeasureSystem, makeReadableActivity] =
    useToggleMeasurement(initialMeasurementSystem);
  const [activitiesData, removeActivityById, addMapById, updateActivityById] =
    UseUpdateActivitiesData(activities);

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
            onClick={() => {
              if (hasFullyLoadedMaps) {
                uploadActivityDataToIPFS(activitiesData, (activity: Activity) =>
                  makeActivityMetadata(makeReadableActivity(activity))
                );
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
