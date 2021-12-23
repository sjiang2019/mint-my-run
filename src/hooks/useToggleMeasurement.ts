import { useEffect, useState } from "react";

import { Activity, Measurement, ReadableActivity } from "../constants/models";
import {
  transformActivityImperial,
  transformActivityMetric,
} from "../utils/parse";

export function useToggleMeasurement(
  initialMeasurementSystem?: Measurement
): [
  Measurement,
  (newSystem: Measurement) => void,
  (activity: Activity) => ReadableActivity
] {
  const [measurementSystem, setMeasurementSystem] = useState(
    initialMeasurementSystem ?? Measurement.Metric
  );
  const [makeReadableActivity, setMakeReadableActivity] = useState<
    (activity: Activity) => ReadableActivity
  >(() => transformActivityMetric);
  useEffect(() => {
    const readableActivityFn =
      measurementSystem === Measurement.Metric
        ? transformActivityMetric
        : transformActivityImperial;
    setMakeReadableActivity(() => readableActivityFn);
  }, [measurementSystem]);

  const onChangeMeasureSystem = (newSystem: Measurement) => {
    setMeasurementSystem(newSystem);
  };

  return [measurementSystem, onChangeMeasureSystem, makeReadableActivity];
}
