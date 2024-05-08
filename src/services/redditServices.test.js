import { fetchUserData, fetchNewPosts } from "./redditServices";

// Mock the global fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ data: "test data" }),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

// Test case for fetchUserData function
test("fetchUserData calls fetch with the right args and returns user data", async () => {
    const accessToken = "test token";

    // Mock the fetch function for this specific test
    fetch.mockImplementationOnce(() =>
        Promise.resolve({
            json: () => Promise.resolve({ data: "test data" }),
        })
    );

    const data = await fetchUserData(accessToken);

    console.log(data); // Log the returned data

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://oauth.reddit.com/api/v1/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "User-Agent": "web:reddit4code:v1.0.0 (by /u/DevLyz)",
        },
    });
    expect(data).toEqual({ data: "test data" });
});

test("fetchNewPosts calls fetch with the right args and returns new posts", async () => {
    const accessToken = "test token";
    const subreddit = "test subreddit";

    // Mock the fetch function for this specific test
    fetch.mockImplementationOnce(() =>
        Promise.resolve({
            json: () => Promise.resolve({ data: "test data" }),
        })
    );

    const data = await fetchNewPosts(subreddit, accessToken);

    console.log(data); // Log the returned data

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
        `https://oauth.reddit.com/r/${subreddit}/new`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "User-Agent": "web:reddit4code:v1.0.0 (by /u/DevLyz)",
            },
        }
    );
    expect(data).toEqual({ data: "test data" });
});
