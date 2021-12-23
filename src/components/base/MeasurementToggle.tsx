import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Measurement } from "../../constants/models";

export default function MeasurementToggle(props: {
  measurementSystem: Measurement;
  handleChangeMeasurementSystem: (newMeasurement: Measurement) => void;
}): JSX.Element {
  return (
    <ToggleButtonGroup
      color="primary"
      value={props.measurementSystem}
      exclusive
      onChange={(e: any, newMeasurement: Measurement) =>
        props.handleChangeMeasurementSystem(newMeasurement)
      }
    >
      <ToggleButton style={{ height: "32px" }} value={Measurement.Metric}>
        Metric
      </ToggleButton>
      <ToggleButton style={{ height: "32px" }} value={Measurement.Imperial}>
        Imperial
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
