import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Map } from "leaflet";

import { Activity, ActivityData, ActivityMetadata } from "../constants/models";
import MapView from "./MapView";
import { EditNameDescriptionModal } from "./EditNameDescriptionModal";
import MetadataCard from "./MetadataCard";

function EditMetadataButton(props: { onClick: () => void }): JSX.Element {
  return (
    <>
      <Typography>
        Edit metadata
        <IconButton
          sx={{
            marginLeft: "2px",
            marginBottom: "4px",
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "transparent" },
          }}
          disableFocusRipple={true}
          disableRipple={true}
          onClick={props.onClick}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Typography>
    </>
  );
}

interface MintActivityListItemProps {
  activityData: ActivityData;
  onCreateMap: (map: Map) => void;
  makeActivityMetadata: (activity: Activity) => ActivityMetadata;
  onChangeActivityData: (updates: Partial<Activity>) => void;
  onRemove: () => void;
}

export default function MintActivityListItem(
  props: MintActivityListItemProps
): JSX.Element {
  const {
    activityData,
    onCreateMap,
    makeActivityMetadata,
    onChangeActivityData,
    onRemove,
  } = props;
  const { activity } = activityData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSaveModal = (name: string, description: string) => {
    onChangeActivityData({ ...activity, name, description });
    setIsModalOpen(false);
  };
  return (
    <Accordion expanded={true}>
      <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
        <IconButton
          sx={{
            marginRight: "2px",
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "transparent" },
          }}
          onClick={onRemove}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ paddingTop: "7px" }}>{activity.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table aria-label="simple table">
            <colgroup>
              <col style={{ width: "50%" }} />y
              <col style={{ width: "50%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>Drag map to desired snapshot</Typography>
                </TableCell>
                <TableCell align="left">
                  <EditMetadataButton onClick={() => setIsModalOpen(true)} />
                </TableCell>
                <EditNameDescriptionModal
                  initialName={activity.name}
                  initialDescription={activity.description ?? ""}
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSave={handleSaveModal}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={"row"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <MapView
                    polyline={activity.polyline}
                    onCreateMap={onCreateMap}
                  />
                </TableCell>
                <TableCell align="left">
                  <MetadataCard
                    metadata={JSON.stringify(
                      makeActivityMetadata(activity),
                      null,
                      2
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}
