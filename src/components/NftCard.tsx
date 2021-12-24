import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  IconButtonProps,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LaunchIcon from "@mui/icons-material/Launch";

import { ActivityMetadata } from "../constants/models";
import MetadataCard from "../components/MetadataCard";
import { SEA_GREEN, OFF_WHITE } from "../constants/styles";

interface NftCardProps {
  nftMetadata: ActivityMetadata;
  tokenURI: string;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function NftCard(props: NftCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: SEA_GREEN }}>
      <CardHeader sx={{ color: OFF_WHITE }} title={props.nftMetadata.name} />
      <CardMedia component="img" image={props.nftMetadata.image} alt="" />
      {props.nftMetadata.description ?? (
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.nftMetadata.description}
          </Typography>
        </CardContent>
      )}
      <CardActions disableSpacing>
        <Typography sx={{ paddingLeft: "12px", color: OFF_WHITE }}>
          Metadata
        </Typography>
        <IconButton
          size="small"
          sx={{ marginTop: "1px", marginLeft: "2px", color: OFF_WHITE }}
          onClick={() => {
            window.open(props.tokenURI, "_blank");
          }}
        >
          <LaunchIcon sx={{ fontSize: "14px" }} />
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <ExpandMoreIcon sx={{ color: OFF_WHITE }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <MetadataCard
            metadata={JSON.stringify(
              {
                name: props.nftMetadata.name,
                description: props.nftMetadata.description,
                image: props.nftMetadata.image,
                attributes: [...props.nftMetadata.attributes],
              },
              null,
              2
            )}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
