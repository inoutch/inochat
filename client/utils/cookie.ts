import Cookies from "universal-cookie";

export function cookie(req?: any) {
    return new Cookies(req ? req.headers.cookie : (typeof document !== "undefined" ? document.cookie : {}));
}

export function getCookie(req?: any) {
    return cookie(req).cookies;
}

export function setCookie(name: string, value: any, req?: any) {
    return cookie(req).set(name, value);
}