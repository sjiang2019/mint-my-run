import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMemo } from "react";

import { Activity, Measurement, ReadableActivity } from "../constants/models";
import { Button } from "./base/Button";
import { useNavigate } from "react-router-dom";
import { WHITE } from "../constants/styles";
import { MINT_PAGE_ROUTE } from "../constants/constants";
import { Typography } from "@mui/material";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

interface SelectedActivitiesDrawerProps {
  isOpen: boolean;
  handleClose: () => void;
  selectedActivities: Set<Activity>;
  makeReadableActivity: (activity: Activity) => ReadableActivity;
  measurementSystem: Measurement;
  removeSelectedActivity: (activity: Activity) => void;
}

export default function SelectedActivitiesDrawer(
  props: SelectedActivitiesDrawerProps
) {
  const theme = useTheme();
  const {
    isOpen,
    handleClose,
    selectedActivities,
    makeReadableActivity,
    measurementSystem,
    removeSelectedActivity,
  } = props;
  const activitiesList = useMemo(() => {
    return Array.from(selectedActivities).sort((a, b) => b.id - a.id);
  }, [selectedActivities]);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={isOpen}
      >
        <DrawerHeader>
          <IconButton onClick={handleClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {selectedActivities.size > 0 ? (
          <>
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                maxHeight: "100%",
                overflow: "auto",
              }}
            >
              {activitiesList.map((activity: Activity) => {
                const readableActivity = makeReadableActivity(activity);
                return (
                  <div key={`${activity.id}-div`}>
                    <ListItem
                      key={`${activity.id}-list-item`}
                      secondaryAction={
                        <IconButton
                          onClick={() => removeSelectedActivity(activity)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={`${readableActivity.type} (${readableActivity.distance.value} ${readableActivity.distance.unit}) on ${readableActivity.date} — ${readableActivity.name}`}
                      />
                    </ListItem>
                    <Divider component="li" key={`${activity.id}-divider`} />
                  </div>
                );
              })}
            </List>

            <DrawerHeader>
              <Button
                style={{
                  marginLeft: "24px",
                  paddingLeft: "32px",
                  paddingRight: "32px",
                  color: WHITE,
                }}
                onClick={() =>
                  navigate(MINT_PAGE_ROUTE, {
                    state: {
                      activities: selectedActivities,
                      initialMeasurementSystem: measurementSystem,
                    },
                  })
                }
              >
                Proceed to mint
              </Button>
            </DrawerHeader>
          </>
        ) : (
          <Typography
            sx={{
              color: "text.secondary",
              padding: "24px",
            }}
          >
            No activities selected. Select some activities by clicking the +
            icon.
          </Typography>
        )}
      </Drawer>
    </Box>
  );
}
