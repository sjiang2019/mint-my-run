import { Grid } from "@mui/material";
import React from "react";
import LazyLoad from "react-lazyload";

import { Activity, DisplayType, ReadableActivity } from "../constants/models";
import ActivityListItem from "./ActivityListItem";
import ActivityCard from "./ActivityCard";

interface ActivityListingProps {
  activities: Array<Activity>;
  makeReadableActivity: (activity: Activity) => ReadableActivity;
  displayType: DisplayType;
  addActivity: (activity: Activity) => void;
  selectedActivities: Set<Activity>;
}

export default function ActivityListing(
  props: ActivityListingProps
): JSX.Element {
  const {
    activities,
    makeReadableActivity,
    displayType,
    addActivity,
    selectedActivities,
  } = props;
  const [expandedId, setExpandedId] = React.useState<null | number>(null);

  const handleChange =
    (activityId: number) => (event: any, expanded: boolean) => {
      setExpandedId(expanded ? activityId : null);
    };

  return (
    <Grid
      container
      spacing={displayType === DisplayType.List ? 1 : 4}
      style={{ marginTop: "12px" }}
    >
      {activities.map((activity: Activity) => {
        const isActivityExpanded = expandedId === activity.id;
        return displayType === DisplayType.List ? (
          <Grid item xs={12} key={`${activity.id}_list`}>
            <LazyLoad height={50} once>
              <ActivityListItem
                activity={activity}
                isExpanded={isActivityExpanded}
                onChangeExpanded={handleChange}
                makeReadableActivity={makeReadableActivity}
                addActivity={addActivity}
                selectedActivities={selectedActivities}
              />
            </LazyLoad>
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            md={6}
            xl={3}
            key={`${activity.id}_card`}
            style={{ paddingTop: 3 }}
          >
            <LazyLoad height={250} once>
              <ActivityCard
                activity={activity}
                makeReadableActivity={makeReadableActivity}
                addActivity={addActivity}
                selectedActivities={selectedActivities}
              />
            </LazyLoad>
          </Grid>
        );
      })}
    </Grid>
  );
}
