import {
  Activity,
  ActivityMetadata,
  ActivityTotal,
  ReadableActivity,
  User,
  UserStats,
} from "../constants/models";
import {
  dateToReadable,
  metersToFeet,
  metersToKm,
  metersToMiles,
  mpsToKmh,
  mpsToMph,
  secondsToReadable,
} from "./utils";

function parseActivityTotal(activityData: any): ActivityTotal {
  return {
    count: activityData.count,
    distance: activityData.distance,
    movingTime: activityData.moving_time,
    elapsedTime: activityData.elapsed_time,
    elevationGain: activityData.elevation_gain,
  };
}

export function parseUserData(tokens: any): User {
  return {
    id: tokens.athlete.id,
    accessToken: tokens.access_token,
    profileImageUrl: tokens.athlete.profile,
    firstName: tokens.athlete.firstname,
    lastName: tokens.athlete.lastname,
    username: tokens.athlete.username,
  };
}

export function parseUserStats(statsData: any): UserStats {
  return {
    swimTotal: parseActivityTotal(statsData.data.all_swim_totals),
    rideTotal: parseActivityTotal(statsData.data.all_ride_totals),
    runTotal: parseActivityTotal(statsData.data.all_run_totals),
  };
}

export function parseActivities(activitiesData: any): Array<Activity> {
  return activitiesData.data.map(
    (activity: any): Activity => ({
      id: activity.id,
      name: activity.name,
      date: activity.start_date,
      maxSpeed: activity.max_speed,
      duration: activity.moving_time,
      averageSpeed: activity.average_speed,
      type: activity.type,
      polyline: activity.map.summary_polyline,
      distance: activity.distance,
      totalElevationGain: activity.total_elevation_gain,
      elevationHigh: activity.elev_high,
      elevationLow: activity.elev_low,
    })
  );
}

export function transformActivityImperial(
  activity: Activity
): ReadableActivity {
  return {
    ...activity,
    date: dateToReadable(activity.date),
    duration: secondsToReadable(activity.duration),
    distance: { value: metersToMiles(activity.distance), unit: "miles" },
    maxSpeed: { value: mpsToMph(activity.maxSpeed), unit: "mph" },
    averageSpeed: { value: mpsToMph(activity.averageSpeed), unit: "mph" },
    totalElevationGain: {
      value: metersToFeet(activity.totalElevationGain),
      unit: "feet",
    },
    elevationHigh: {
      value: metersToFeet(activity.elevationHigh),
      unit: "feet",
    },
    elevationLow: { value: metersToFeet(activity.elevationLow), unit: "feet" },
  };
}

export function transformActivityMetric(activity: Activity): ReadableActivity {
  return {
    ...activity,
    date: dateToReadable(activity.date),
    duration: secondsToReadable(activity.duration),
    distance: { value: metersToKm(activity.distance), unit: "km" },
    maxSpeed: { value: mpsToKmh(activity.maxSpeed), unit: "kmh" },
    averageSpeed: { value: mpsToKmh(activity.averageSpeed), unit: "kmh" },
    totalElevationGain: {
      value: activity.totalElevationGain,
      unit: "meters",
    },
    elevationHigh: { value: activity.elevationHigh, unit: "meters" },
    elevationLow: { value: activity.elevationLow, unit: "meters" },
  };
}

export function makeActivityMetadata(
  readableActivity: ReadableActivity
): ActivityMetadata {
  return {
    name: readableActivity.name,
    description: readableActivity.description,
    attributes: [
      {
        trait_type: "Activity Name",
        value: readableActivity.name,
      },
      {
        trait_type: "Activity Type",
        value: readableActivity.type,
      },
      {
        trait_type: "Date",
        value: readableActivity.date,
      },
      {
        trait_type: "Duration (HH:MM:SS)",
        value: readableActivity.duration,
      },
      {
        display_type: "number",
        trait_type: `Distance (${readableActivity.distance.unit})`,
        value: readableActivity.distance.value,
      },
      {
        display_type: "number",
        trait_type: `Max Speed (${readableActivity.maxSpeed.unit})`,
        value: readableActivity.maxSpeed.value,
      },
      {
        display_type: "number",
        trait_type: `Average Speed (${readableActivity.averageSpeed.unit})`,
        value: readableActivity.averageSpeed.value,
      },
      {
        display_type: "number",
        trait_type: `Total Elevation Gain (${readableActivity.totalElevationGain.unit})`,
        value: readableActivity.totalElevationGain.value,
      },
      {
        display_type: "number",
        trait_type: `Elevation High (${readableActivity.elevationHigh.unit})`,
        value: readableActivity.elevationHigh.value,
      },
      {
        display_type: "number",
        trait_type: `Elevation Low (${readableActivity.elevationLow.unit})`,
        value: readableActivity.elevationLow.value,
      },
    ],
  };
}
