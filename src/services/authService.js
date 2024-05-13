import { GenerateARandomString } from "../utils/utils";

const clientId = encodeURIComponent(process.env.REACT_APP_CLIENT_ID);
const redirectUri = encodeURIComponent("http://localhost:3000");
let state = null;
const scope = encodeURIComponent("identity read");

export const redirectToRedditAuth = () => {
    console.log("Redirecting to Reddit authentication page...");
    state = GenerateARandomString();
    sessionStorage.setItem("state", state);
    const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=token&state=${state}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = redditAuthUrl;
};

export const extractToken = () => {
    const fragment = window.location.hash.substring(1);
    if (!fragment) return false;
    const params = new URLSearchParams(fragment);
    const accessToken = params.get("access_token");
    const expiresIn = params.get("expires_in"); // get the expires_in parameter
    const returnedState = params.get("state");
    const storedState = sessionStorage.getItem("state");
    console.log(
        `stored State: ${storedState}, Returned state: ${returnedState}`
    );
    if (returnedState !== storedState) {
        throw new Error("State mismatch: potential CSRF attack");
    }

    const expirationTime = new Date().getTime() + expiresIn * 1000; // calculate the expiration time
    localStorage.setItem("expirationTime", expirationTime); // store the expiration time
    return accessToken;
};

export const verifyTokenExpirationValid = () => {
    const expirationTime = localStorage.getItem("expirationTime"); // get the stored expiration time
    if (!expirationTime) return false; // if there is no expiration time, return false
    if (new Date().getTime() > expirationTime) {
        // if the current time is greater than the expiration time
        localStorage.removeItem("expirationTime"); // remove the expired time
        //redirectToRedditAuth(); // redirect to authenticate again
        return false;
    }

    return true;
};

export const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("expirationTime");
    window.location.href = "http://localhost:3000";
};
