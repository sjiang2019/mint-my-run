export const {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_PINATA_API_KEY,
  REACT_APP_PINATA_API_SECRET,
  REACT_APP_ETHERSCAN_API_TOKEN,
} = process.env;
const REDIRECT_URL = `${window.location.origin}/redirect`;
console.log(REDIRECT_URL);
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
export const MINT_PAGE_ROUTE = "/mint";
export const MINTED_ACTIVITIES_ROUTE = "/minted";

export const PIN_FILE_TO_IPFS_API = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
export const PIN_JSON_TO_IPFS_API = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

export const MINT_PRICE_WEI = 5000000000000000;

export const ROPSTEN_CONTRACT_ADDRESS =
  "0xee9BC9da1D539c9904EbA16c6C4200C82A734739";
export const RINKEBY_CONTRACT_ADDRESS =
  "0x0661824C07CaA34E8610fe3ef9598EA6eb280779";
export const OPTIMISM_KOVAN_CONTRACT_ADDRESS =
  "0xee9BC9da1D539c9904EbA16c6C4200C82A734739";
export const OPTIMISM_CONTRACT_ADDRESS =
  "0xC7adDfaf516751e1b3C068B763bcA13dDc5499F9";
