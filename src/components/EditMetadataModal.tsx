import { Box, Grid, Modal, TextField, Typography } from "@mui/material";

import { OFF_WHITE } from "../constants/styles";
import { Button } from "./base/Button";
import { ChangeEvent, useState } from "react";

interface EditMetadataModalProps {
  initialName: string;
  initialDescription: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
}

export function EditMetadataModal(props: EditMetadataModalProps): JSX.Element {
  const handleClose = (event: any, reason: string) => {
    if (reason !== "backdropClick") {
      props.onClose();
    }
  };
  const [name, setName] = useState(props.initialName);
  const [description, setDescription] = useState(props.initialDescription);
  return (
    <Modal
      open={props.isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: OFF_WHITE,
          border: 0,
          borderRadius: "6px",
          boxShadow: 2,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Metadata
        </Typography>
        <TextField
          label="Name"
          error={name.length === 0}
          id="outlined-size-small"
          defaultValue={props.initialName}
          size="small"
          fullWidth={true}
          sx={{ marginTop: "12px" }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
          required
        />
        <TextField
          label="Description"
          defaultValue={props.initialDescription}
          fullWidth={true}
          placeholder=""
          multiline
          rows={2}
          maxRows={4}
          sx={{ marginTop: "18px", marginBottom: "18px" }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setDescription(e.target.value);
          }}
        />
        <Grid container justifyContent="space-between">
          <Button
            variant="outlined"
            style={{ height: "32px", backgroundColor: OFF_WHITE }}
            onClick={props.onClose}
          >
            Cancel
          </Button>
          <Button
            style={{ height: "32px" }}
            onClick={() => {
              if (name.length > 0) {
                props.onSave(name, description);
              }
            }}
          >
            Save
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}
