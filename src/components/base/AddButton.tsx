import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { NAVY_BLUE } from "../../constants/styles";

export default function AddButton(props: {
  onAdd: () => void;
  canAdd: boolean;
  fontSize: "small" | "large";
}): JSX.Element {
  return (
    <IconButton
      disabled={!props.canAdd}
      size="small"
      onClick={(e: any) => {
        e.stopPropagation();
        props.onAdd();
      }}
    >
      {props.canAdd ? (
        <AddIcon
          fontSize={props.fontSize}
          sx={{
            color: NAVY_BLUE,
          }}
        />
      ) : (
        <CheckIcon fontSize={props.fontSize} />
      )}
    </IconButton>
  );
}
