import Router from "next/router";

export function redirect(path: string, res?: any) {
    if (res) {
        res.writeHead(302, {Location: path});
        res.end();
        res.finished = true;
    } else {
        Router.push(path);
    }
}
