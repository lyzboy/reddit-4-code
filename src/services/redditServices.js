const userAgentData = "web:reddit4code:v1.0.0 (by /u/DevLyz)";

export const fetchUserData = async (accessToken) => {
    const response = await fetch("https://oauth.reddit.com/api/v1/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "User-Agent": userAgentData,
        },
    });

    if (!checkForTokenValidation(response.status)) {
        redirectToRedditAuth();
        return null;
    }

    return await response.json();
};

export const fetchNewPosts = async (subreddit, accessToken) => {
    const response = await fetch(
        `https://oauth.reddit.com/r/${subreddit}/new`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "User-Agent": userAgentData,
            },
        }
    );

    if (!checkForTokenValidation(response.status)) {
        redirectToRedditAuth();
        return null;
    }

    return await response.json();
};

const checkForTokenValidation = (responseStatus) => {
    if (responseStatus === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("expirationTime");
        return false;
    }

    return true;
};
