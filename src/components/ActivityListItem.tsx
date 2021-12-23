import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Activity, ReadableActivity } from "../constants/models";
import MapView from "./MapView";
import { dateToReadable } from "../utils/utils";
import ActivityDataTable from "./ActivityDataTable";
import AddButton from "./base/AddButton";

interface ActivityListItemProps {
  activity: Activity;
  isExpanded: boolean;
  onChangeExpanded: (
    activityId: number
  ) => (event: any, expanded: boolean) => void;
  makeReadableActivity: (activity: Activity) => ReadableActivity;
  addActivity: (activity: Activity) => void;
  selectedActivities: Set<Activity>;
}

export default function ActivityListItem(
  props: ActivityListItemProps
): JSX.Element {
  const activity = props.activity;
  const readableActivity = props.makeReadableActivity(activity);
  const date = dateToReadable(activity.date);
  const canAddActivity = !props.selectedActivities.has(activity);
  return (
    <Accordion
      expanded={props.isExpanded}
      onChange={props.onChangeExpanded(activity.id)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <AddButton
          canAdd={canAddActivity}
          onAdd={() => props.addActivity(activity)}
          fontSize="small"
        />
        <Typography
          sx={{
            width: "33%",
            flexShrink: 0,
            paddingTop: "4px",
            paddingLeft: "12px",
          }}
        >
          {date}
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            paddingTop: "4px",
          }}
        >
          {readableActivity.name} · {readableActivity.type} ·{" "}
          {readableActivity.distance.value} {readableActivity.distance.unit}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <MapView polyline={activity.polyline} />
          </Grid>
          <Grid item xs={6}>
            <ActivityDataTable readableActivity={readableActivity} />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
