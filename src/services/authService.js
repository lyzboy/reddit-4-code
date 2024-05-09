import { GenerateARandomString } from "../utils/utils";

const clientId = encodeURIComponent(process.env.REACT_APP_CLIENT_ID);
const redirectUri = encodeURIComponent("http://localhost:3000");
const state = encodeURIComponent(GenerateARandomString());
const scope = encodeURIComponent("identity, read");

export const redirectToRedditAuth = () => {
    const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=token&state=${state}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = redditAuthUrl;
};

export const extractToken = () => {
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment);
    const accessToken = params.get("access_token");
    const expiresIn = params.get("expires_in"); // get the expires_in parameter
    const returnedState = params.get("state");
    console.log(`State: ${state}, Returned state: ${returnedState}`);
    if (returnedState !== state) {
        throw new Error("State mismatch: potential CSRF attack");
    }

    const expirationTime = new Date().getTime() + expiresIn * 1000; // calculate the expiration time
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("expirationTime", expirationTime); // store the expiration time
    return accessToken;
};

export const getStoredToken = () => {
    const token = localStorage.getItem("accessToken");
    const expirationTime = localStorage.getItem("expirationTime"); // get the stored expiration time

    if (new Date().getTime() > expirationTime) {
        // if the current time is greater than the expiration time
        localStorage.removeItem("accessToken"); // remove the expired token
        localStorage.removeItem("expirationTime"); // remove the expired time
        redirectToRedditAuth(); // redirect to authenticate again
        return null;
    }

    return token;
};

export const isAuthenticated = () => {
    const token = getStoredToken();
    return !!token;
};
