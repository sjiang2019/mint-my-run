import { Card, Typography } from "@mui/material";

import { OFF_WHITE } from "../constants/styles";

export default function MetadataCard(props: { metadata: string }): JSX.Element {
  return (
    <Card
      sx={{
        height: "400px",
        overflow: "auto",
        backgroundColor: OFF_WHITE,
        boxShadow: 0,
        paddingLeft: 2,
      }}
    >
      <pre>
        <Typography variant="body2" color="text.secondary">
          {props.metadata}
        </Typography>
      </pre>
    </Card>
  );
}
