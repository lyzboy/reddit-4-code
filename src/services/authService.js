import { GenerateARandomString } from "../utils/utils";

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = encodeURIComponent("http://localhost:3000");
const state = GenerateARandomString();
const scope = encodeURIComponent("identity, read");

export const redirectToRedditAuth = () => {
    const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=token&state=${state}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = redditAuthUrl;
};

export const extractToken = () => {
    // get the fragment data from the hash and remove the # symbol
    const fragment = window.location.hash.substring(1);
    // get the search params from the fragment
    const params = new URLSearchParams(fragment);
    // retrieve the access token from the params
    const accessToken = params.get("access_token");
    // retrieve the random state provided during auth
    const returnedState = params.get("state");
    if (returnedState !== state) {
        throw new Error("State mismatch: potential CSRF attack");
    }

    return accessToken;
};
