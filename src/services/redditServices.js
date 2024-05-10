const userAgentData = "web:reddit4code:v1.0.0 (by /u/DevLyz)";

export const fetchUserData = async (accessToken) => {
    const response = await fetch("https://oauth.reddit.com/api/v1/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "User-Agent": userAgentData,
        },
    });

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
    if (response.status !== 200) {
        throw new Error("Failed to fetch new posts");
    }
    return await response.json();
};
