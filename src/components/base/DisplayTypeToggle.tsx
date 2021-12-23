import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DisplayType } from "../../constants/models";

export default function DisplayTypeToggle(props: {
  displayType: DisplayType;
  handleChangeDisplayType: (newDisplayType: DisplayType) => void;
}): JSX.Element {
  return (
    <ToggleButtonGroup
      color="primary"
      value={props.displayType}
      exclusive
      onChange={(event: any, newDisplayType: DisplayType) =>
        props.handleChangeDisplayType(newDisplayType)
      }
    >
      <ToggleButton style={{ height: "32px" }} value={DisplayType.List}>
        List
      </ToggleButton>
      <ToggleButton style={{ height: "32px" }} value={DisplayType.Gallery}>
        Gallery
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
