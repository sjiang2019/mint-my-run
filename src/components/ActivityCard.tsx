import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Tab,
  Box,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { Activity, ReadableActivity } from "../constants/models";
import { dateToReadable } from "../utils/utils";
import ActivityDataTable from "./ActivityDataTable";
import MapView from "./MapView";
import { useState } from "react";
import AddButton from "./base/AddButton";

const MAP_TAB = "0";
const DETAILS_TAB = "1";

const cardStyle = {
  boxShadow: 2,
  paddingLeft: 4,
  paddingRight: 4,
  paddingBottom: 1,
  marginBottom: 4,
  borderRadius: "12px",
};

interface ActivityCardProps {
  activity: Activity;
  makeReadableActivity: (activity: Activity) => ReadableActivity;
  addActivity: (activity: Activity) => void;
  selectedActivities: Set<Activity>;
}
export default function ActivityCard(props: ActivityCardProps): JSX.Element {
  const [tab, setTab] = useState(MAP_TAB);

  const activity = props.activity;
  const readableActivity = props.makeReadableActivity(activity);
  const date = dateToReadable(activity.date);
  const canAddActivity = !props.selectedActivities.has(activity);
  return (
    <Card sx={cardStyle}>
      <CardHeader
        title={readableActivity.name}
        subheader={`${date} · ${readableActivity.type} · ${readableActivity.distance.value} ${readableActivity.distance.unit}`}
        style={{ padding: "16px" }}
        action={
          <AddButton
            canAdd={canAddActivity}
            onAdd={() => props.addActivity(activity)}
            fontSize="large"
          />
        }
      />
      <CardContent style={{ paddingTop: "0px" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={(event: any, newTab: string) => setTab(newTab)}>
              <Tab label="Map" value={MAP_TAB} />
              <Tab label="Details" value={DETAILS_TAB} />
            </TabList>
          </Box>
          <TabPanel value={MAP_TAB} sx={{ padding: "12px 0px 0px 0px" }}>
            <MapView polyline={activity.polyline} />
          </TabPanel>
          <TabPanel value={DETAILS_TAB}>
            <ActivityDataTable readableActivity={readableActivity} />
          </TabPanel>
        </TabContext>
      </CardContent>
      <CardActions
        disableSpacing
        style={{ justifyContent: "flex-end" }}
      ></CardActions>
    </Card>
  );
}
