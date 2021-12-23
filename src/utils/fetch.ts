import axios from "axios";

export const getUserStats = async (userID: any, accessToken: any) => {
  try {
    const response = await axios.get(
      `https://www.strava.com/api/v3/athletes/${userID}/stats`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUserActivities = async (
  userId: any,
  accessToken: any,
  page: number
) => {
  try {
    const response = await axios.get(
      `https://www.strava.com/api/v3/athletes/${userId}/activities?per_page=100&page=${page}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
