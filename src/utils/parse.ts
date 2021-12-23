import { Measurement } from "../constants/constants";
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
    name: activity.name,
    type: activity.type,
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
    measurementSystem: Measurement.Metric,
  };
}

export function transformActivityMetric(activity: Activity): ReadableActivity {
  return {
    name: activity.name,
    type: activity.type,
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
    measurementSystem: Measurement.Imperial,
  };
}

export function makeActivityMetadata(
  readableActivity: ReadableActivity,
  description?: string
): ActivityMetadata {
  return {
    image: "ipfs url here",
    name: readableActivity.name,
    description: description,
    attributes: [
      {
        display_type: "string",
        trait_type: "Activity Name",
        value: readableActivity.name,
      },
      {
        display_type: "string",
        trait_type: "Activity Type",
        value: readableActivity.type,
      },
      {
        display_type: "date",
        trait_type: "Date",
        value: readableActivity.date,
      },
      {
        display_type: "HH:MM:SS",
        trait_type: "Duration",
        value: readableActivity.duration,
      },
      {
        display_type: readableActivity.distance.unit,
        trait_type: "Distance",
        value: readableActivity.distance.value,
      },
      {
        display_type: readableActivity.maxSpeed.unit,
        trait_type: "Max Speed",
        value: readableActivity.maxSpeed.value,
      },
      {
        display_type: readableActivity.averageSpeed.unit,
        trait_type: "Average Speed",
        value: readableActivity.averageSpeed.value,
      },
      {
        display_type: readableActivity.totalElevationGain.unit,
        trait_type: "Total Elevation Gain",
        value: readableActivity.totalElevationGain.value,
      },
      {
        display_type: readableActivity.elevationHigh.unit,
        trait_type: "Elevation High",
        value: readableActivity.elevationHigh.value,
      },
      {
        display_type: readableActivity.elevationLow.unit,
        trait_type: "Elevation Low",
        value: readableActivity.elevationLow.value,
      },
    ],
  };
}
