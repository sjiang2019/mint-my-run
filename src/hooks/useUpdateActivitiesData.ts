import { useState } from "react";
import { Map } from "leaflet";

import { Activity, ActivityData } from "../constants/models";

export function UseUpdateActivitiesData(
  activities: Set<Activity>
): [
  Array<ActivityData>,
  (id: number) => void,
  (id: number, map: Map) => void,
  (id: number, updates: Partial<Activity>) => void
] {
  const initialActivitiesData = (Array.from(activities) as Array<Activity>)
    .sort((a, b) => b.id - a.id)
    .reduce((state: Array<ActivityData>, activity: Activity) => {
      return [
        ...state,
        {
          activity: activity,
          map: null,
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
  const updateActivityById = (id: number, updates: Partial<Activity>): void => {
    setActivitiesData((prevState: Array<ActivityData>) =>
      prevState.map((data: ActivityData) =>
        data.activity.id === id
          ? {
              ...data,
              activity: {
                ...data.activity,
                ...updates,
              },
            }
          : data
      )
    );
  };
  return [activitiesData, removeActivityById, addMapById, updateActivityById];
}
