export function FormatLocalDate(date) {
    const options = {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
    };

    return new Date(date).toLocaleDateString(undefined, options);
}
