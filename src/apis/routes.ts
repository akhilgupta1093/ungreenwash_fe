const local = process.env.NODE_ENV === "development";
export const domain = local ? "http://localhost:8000" : "https://ugw-backend.herokuapp.com";

export function getURL(path: string) {
    return domain + path;
}