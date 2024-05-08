export function FormatLocalDate(date) {
    const options = {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
    };

    return new Date(date).toLocaleDateString(undefined, options);
}

export function GenerateARandomString() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
}
