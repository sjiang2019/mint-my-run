import axios from "axios";

import {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
} from "../constants/constants";

export const getParamValues = (url: any) => {
  return url
    .slice(1)
    .split("&")
    .reduce((prev: any, curr: any) => {
      const [title, value] = curr.split("=");
      prev[title] = value;
      return prev;
    }, {});
};

export const cleanAuthToken = (str: string) => {
  return str.split("&")[1].slice(5);
};

export const authGetter = async (authTok: any) => {
  try {
    const response = await axios.post(
      `https://www.strava.com/api/v3/oauth/token?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&code=${authTok}&grant_type=authorization_code`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
