export const {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_PINATA_API_KEY,
  REACT_APP_PINATA_API_SECRET,
} = process.env;
const REDIRECT_URL = "http://localhost:3000/redirect";
const SCOPES = "read,activity:read";
export const STRAVA_AUTH_URL = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL}/exchange_token&approval_prompt=force&scope=${SCOPES}`;

export const DEFAULT_LOTTIE_OPTIONS = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const HOME_PAGE_ROUTE = "/";
export const STRAVA_REDIRECT_PAGE_ROUTE = "/redirect/*";
export const ACTIVITIES_PAGE_ROUTE = "/activities";
export const QUESTIONS_PAGE_ROUTE = "/#questions";
export const ABOUT_PAGE_ROUTE = "/#about";
export const MINT_PAGE_ROUTE = "/mint";

export enum Measurement {
  Metric = "metric",
  Imperial = "imperial",
}

export enum DisplayType {
  List,
  Gallery,
}
