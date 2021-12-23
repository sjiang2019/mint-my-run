import moment from "moment";
import { STRAVA_AUTH_URL } from "../constants/constants";

export function pluralize(
  count: number,
  noun: string,
  suffix: string = "s"
): string {
  return `${count} ${noun}${count !== 1 ? suffix : ""}`;
}

export function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

export function roundToOneDecimal(num: number): number {
  return Math.round(num * 10) / 10;
}

export function metersToFeet(meters: number): number {
  return roundToOneDecimal(meters / 3.28084);
}

export function metersToMiles(meters: number): number {
  return roundToOneDecimal(meters * 0.000621371);
}

export function metersToKm(meters: number): number {
  return roundToOneDecimal(meters / 1000);
}

export function mpsToKmh(mps: number): number {
  return roundToOneDecimal((mps * 60 * 60) / 1000);
}

export function mpsToMph(mps: number): number {
  return roundToOneDecimal(mps * 2.23694);
}

export function secondsToReadable(seconds: number): string {
  let measuredTime = new Date(seconds * 1000);
  return measuredTime.toISOString().substr(11, 8);
}

export function dateToReadable(date: string): string {
  return moment(date).format("MMMM DD, YYYY");
}

export function lowerFirstLetter(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function redirectToStravaAuth() {
  window.location.href = STRAVA_AUTH_URL;
}
