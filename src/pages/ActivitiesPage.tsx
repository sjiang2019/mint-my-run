import { StyleSheet, css } from "aphrodite";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Fab, Grid } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";

import { NavBar } from "../components/base/NavBar";
import UserProfile from "../components/UserProfileCard";
import { Activity, User, UserStats } from "../constants/models";
import { getUserStats } from "../utils/fetch";
import { parseUserStats } from "../utils/parse";
import { NAVY_BLUE, OFF_WHITE, WHITE } from "../constants/styles";
import ActivityPaginator from "../components/ActivityPaginator";
import { GreekingLoading } from "../components/base/GreekingLoading";
import { useToggleMeasurement } from "../hooks/useToggleMeasurement";
import { AddActivityToast } from "../components/base/AlertToast";
import SelectedActivitiesDrawer from "../components/SelectedActivitiesDrawer";
import { redirectToStravaAuth } from "../utils/utils";

interface UserRoutesProps {
  user: User;
}

const ActivitiesPage = ({ user }: UserRoutesProps) => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "info" | "warning">(
    "success"
  );
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const statsResponse = await getUserStats(user.id, user.accessToken);
        const stats: UserStats = parseUserStats(statsResponse);
        setStats(stats);
      } catch (e: unknown) {
        redirectToStravaAuth();
      }
    };
    fetchUserStats();
  }, [user]);
  const [measurementSystem, onChangeMeasurementSystem, makeReadableActivity] =
    useToggleMeasurement();
  const [selectedActivities, setSelectedActivities] = useState<Set<Activity>>(
    new Set()
  );

  const removeActivity = (oldActivity: Activity) => {
    setSelectedActivities((prev: Set<Activity>) => {
      prev.delete(oldActivity);
      return new Set(prev);
    });
  };
  const addActivity = (newActivity: Activity) => {
    if (selectedActivities.has(newActivity)) {
      setAlertType("info");
      setShowAlert(true);
    } else {
      setSelectedActivities(
        (prev: Set<Activity>) => new Set(prev.add(newActivity))
      );
      setAlertType("success");
      setShowAlert(true);
    }
  };
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  return (
    <div>
      <NavBar />
      <div className={css(styles.container)}>
        {stats != null ? (
          <div className={css(styles.innerContainer)}>
            <Grid
              container
              style={{ justifyContent: "center", marginBottom: "36px" }}
            >
              <UserProfile user={user} stats={stats} />
            </Grid>
            <ActivityPaginator
              user={user}
              measurementSystem={measurementSystem}
              handleChangeMeasurementSystem={onChangeMeasurementSystem}
              makeReadableActivity={makeReadableActivity}
              addActivity={addActivity}
              selectedActivities={selectedActivities}
            />
            <AddActivityToast
              showAlert={showAlert}
              handleClose={(event: any) => setShowAlert(false)}
              alertType={alertType}
            />
            <Fab
              variant="extended"
              sx={{
                margin: 0,
                bottom: "auto",
                right: 40,
                top: 60,
                left: "auto",
                position: "fixed",
                textTransform: "none",
                zIndex: 1000,
                backgroundColor: NAVY_BLUE,
                color: WHITE,
                "&:hover": { backgroundColor: NAVY_BLUE },
              }}
              onClick={() => setIsDrawerOpen(true)}
            >
              <CollectionsIcon sx={{ mr: 1 }} />
              View activities
            </Fab>
            <SelectedActivitiesDrawer
              isOpen={isDrawerOpen}
              handleClose={() => setIsDrawerOpen(false)}
              selectedActivities={selectedActivities}
              makeReadableActivity={makeReadableActivity}
              removeSelectedActivity={removeActivity}
            />
          </div>
        ) : (
          <GreekingLoading />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: { user: User }) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ActivitiesPage);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: OFF_WHITE,
    minHeight: "100%",
  },
  innerContainer: {
    width: "85%",
  },
});
