const userAgentData = "web:ReadIt4Code:v1.0.0 (by /u/DevLyz)";

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

    return await response.json();
};

export const fetchComments = async (subreddit, postId, accessToken) => {
    const limit = 10;
    const url = `https://oauth.reddit.com/r/${subreddit}/comments/${postId}.json?limit=${limit}`;
    console.log("Fetching comments with URL:", url); // Debugging
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "User-Agent": userAgentData,
        },
    });

    if (!response.ok) {
        console.error("Failed to fetch comments. Status:", response.status); // Debugging
        throw new Error(`Failed to fetch comments: ${response.status}`);
    }

    return await response.json();
};
