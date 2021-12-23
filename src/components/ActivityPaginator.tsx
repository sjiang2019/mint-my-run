import { Grid } from "@mui/material";
import { StyleSheet, css } from "aphrodite";
import { useState } from "react";
import { DisplayType, Measurement } from "../constants/constants";
import { Activity, ReadableActivity, User } from "../constants/models";
import { useActivitiesPagination } from "../hooks/useActivitiesPagination";
import ActivityListing from "./ActivityListing";
import { Button } from "./base/Button";
import DisplayTypeToggle from "./base/DisplayTypeToggle";
import { GreekingLoading } from "./base/GreekingLoading";
import MeasurementToggle from "./base/MeasurementToggle";

interface ActivityPaginatorProps {
  user: User;
  measurementSystem: Measurement;
  handleChangeMeasurementSystem: (newSystem: Measurement) => void;
  makeReadableActivity: (activity: Activity) => ReadableActivity;
  addActivity: (activity: Activity) => void;
  selectedActivities: Set<Activity>;
}

export default function ActivityPaginator(
  props: ActivityPaginatorProps
): JSX.Element {
  // TODO: Consider batch fetching with client-side pagination

  const {
    user,
    measurementSystem,
    handleChangeMeasurementSystem,
    makeReadableActivity,
    addActivity,
    selectedActivities,
  } = props;

  const [
    isLoading,
    activities,
    page,
    lastPage,
    handleNextPage,
    handlePrevPage,
  ] = useActivitiesPagination(user);
  const [displayType, setDisplayType] = useState(DisplayType.List);
  return (
    <>
      {isLoading ? (
        <GreekingLoading />
      ) : (
        <div className={css(styles.listing)}>
          <Grid
            container
            spacing={2}
            style={{ justifyContent: "space-between" }}
          >
            <Grid item>
              <DisplayTypeToggle
                displayType={displayType}
                handleChangeDisplayType={setDisplayType}
              />
            </Grid>
            <Grid item>
              <MeasurementToggle
                measurementSystem={measurementSystem}
                handleChangeMeasurementSystem={handleChangeMeasurementSystem}
              />
            </Grid>
          </Grid>
          <ActivityListing
            activities={activities}
            makeReadableActivity={makeReadableActivity}
            displayType={displayType}
            addActivity={addActivity}
            selectedActivities={selectedActivities}
          />
          <div className={css(styles.buttonContainer)}>
            {page !== 1 && (
              <Button
                variant="outlined"
                style={{ height: "36px" }}
                onClick={handlePrevPage}
              >
                Prev
              </Button>
            )}
            {page !== lastPage && (
              <Button
                variant="outlined"
                style={{ height: "36px", float: "right" }}
                onClick={handleNextPage}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  listing: {
    marginTop: "12px",
    marginBottom: "150px",
  },
  buttonContainer: {
    marginTop: "24px",
  },
});
