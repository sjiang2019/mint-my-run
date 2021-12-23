import { useState } from "react";
import { Map } from "leaflet";

import {
  Activity,
  ActivityData,
  ActivityMetadata,
  ReadableActivity,
} from "../constants/models";
import { makeActivityMetadata } from "../utils/parse";

export function UseUpdateActivitiesData(
  activities: Set<Activity>,
  makeReadableActivity: (activity: Activity) => ReadableActivity
): [
  Array<ActivityData>,
  (id: number) => void,
  (id: number, map: Map) => void,
  (id: number, metadata: ActivityMetadata) => void
] {
  const initialActivitiesData = (Array.from(activities) as Array<Activity>)
    .sort((a, b) => b.id - a.id)
    .reduce((state: Array<ActivityData>, activity: Activity) => {
      return [
        ...state,
        {
          activity: activity,
          map: null,
          metadata: makeActivityMetadata(makeReadableActivity(activity)),
        },
      ];
    }, []);
  const [activitiesData, setActivitiesData] = useState<Array<ActivityData>>(
    initialActivitiesData
  );

  const removeActivityById = (id: number): void => {
    setActivitiesData((prevState: Array<ActivityData>) =>
      prevState.filter((data: ActivityData) => data.activity.id !== id)
    );
  };
  const addMapById = (id: number, map: Map): void =>
    setActivitiesData((prevState: Array<ActivityData>) =>
      prevState.map((data: ActivityData) =>
        data.activity.id === id ? { ...data, map } : data
      )
    );
  const updateMetadataById = (id: number, metadata: ActivityMetadata): void => {
    setActivitiesData((prevState: Array<ActivityData>) =>
      prevState.map((data: ActivityData) =>
        data.activity.id === id ? { ...data, metadata } : data
      )
    );
  };
  return [activitiesData, removeActivityById, addMapById, updateMetadataById];
}
