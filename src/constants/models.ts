import { Map } from "leaflet";

export interface Activity {
  id: number;
  name: string;
  date: string;
  maxSpeed: number;
  duration: number;
  averageSpeed: number;
  type: string;
  polyline: string;
  distance: number;
  totalElevationGain: number;
  elevationHigh: number;
  elevationLow: number;
}

export interface MetadataAttribute {
  display_type: string;
  trait_type: string;
  value: string | number;
}

export interface ActivityMetadata {
  name: string;
  attributes: Array<MetadataAttribute>;
  image?: string;
  description?: string;
}

export interface ActivityData {
  activity: Activity;
  map: Map | null;
  metadata: ActivityMetadata;
}

interface ReadableMeasurement {
  value: number;
  unit: string;
}

export interface ReadableActivity {
  name: string;
  date: string;
  type: string;
  duration: string;
  distance: ReadableMeasurement;
  maxSpeed: ReadableMeasurement;
  averageSpeed: ReadableMeasurement;
  totalElevationGain: ReadableMeasurement;
  elevationHigh: ReadableMeasurement;
  elevationLow: ReadableMeasurement;
  measurementSystem: string;
}

export interface UserAuth {
  userId: string;
  accessToken: string;
}

export interface ActivityTotal {
  count: number;
  distance: number;
  movingTime: number;
  elapsedTime: number;
  elevationGain: number;
}

export interface User {
  id: string;
  accessToken: string;
  profileImageUrl: string;
  firstName: string;
  lastName: string;
  username: string;
}
export interface UserStats {
  rideTotal: ActivityTotal;
  runTotal: ActivityTotal;
  swimTotal: ActivityTotal;
}
