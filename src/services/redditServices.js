const userAgentData = "web:reddit4code:v1.0.0 (by /u/DevLyz)";

export const fetchUserData = async (accessToken) => {
    // form the response for the user data
    const response = await fetch("https://oauth.reddit.com/api/v1/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "User-Agent": userAgentData,
        },
    });

    return await response.json();
};

export const fetchNewPosts = async (subreddit, accessToken) => {
    // form the response for the new posts
    const response = await fetch(
        `https://oauth.reddit.com/r/${subreddit}/new`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "User-Agent": userAgentData,
            },
        }
    );

    return await response.json();
};
