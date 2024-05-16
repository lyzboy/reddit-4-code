import { GenerateARandomString } from "../utils/utils";

const clientId = encodeURIComponent(process.env.REACT_APP_CLIENT_ID);
const redirectUri = encodeURIComponent("http://localhost:3000");
const scope = encodeURIComponent("identity read"); // Ensure read scope is included

export const redirectToRedditAuth = () => {
    console.log("Redirecting to Reddit authentication page...");
    const state = GenerateARandomString();
    sessionStorage.setItem("state", state);
    const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=token&state=${state}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = redditAuthUrl;
};

export const extractToken = () => {
    const fragment = window.location.hash.substring(1);
    if (!fragment) return null;
    const params = new URLSearchParams(fragment);
    const accessToken = params.get("access_token");
    const expiresIn = params.get("expires_in");
    const returnedState = params.get("state");
    const storedState = sessionStorage.getItem("state");
    if (returnedState !== storedState) {
        throw new Error("State mismatch: potential CSRF attack");
    }
    localStorage.setItem("accessToken", accessToken);
    const expirationTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem("expirationTime", expirationTime);
    return accessToken;
};

export const verifyTokenExpirationValid = () => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (!expirationTime) {
        localStorage.removeItem("accessToken");
        return false;
    }
    if (new Date().getTime() > expirationTime) {
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("accessToken");
        return false;
    }
    return true;
};

export const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("accessToken");
    window.location.href = "http://localhost:3000";
};
