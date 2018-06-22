export function validateText(value: any): boolean {
    return value === null || typeof value === "undefined" || value === "";
}