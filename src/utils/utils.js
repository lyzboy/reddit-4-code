export function FormatLocalDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
    const options = {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
}
export function GenerateARandomString() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
}

export const subredditList = [
    "programming",
    "react",
    "reduxjs",
    "web_programming",
    "csharp",
    "compsci",
];
