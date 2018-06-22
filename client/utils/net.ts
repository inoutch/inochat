import "isomorphic-unfetch";

const baseHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

export function isJSON(text: any) {
    text = (typeof text === "function") ? text() : text;
    if (typeof text !== "string") {
        return false;
    }
    try {
        (!JSON) ? eval("(" + text + ")") : JSON.parse(text);
        return true;
    } catch (e) {
        return false;
    }
}

export function post(url: string, data: any, optionalHeaders?: any) {
    const method = "POST";
    const body = JSON.stringify(data);
    const headers = Object.assign(baseHeaders, optionalHeaders);
    return makePromise(url, {method, headers, body});
}

export function get(url: string, optionalHeaders?: any) {
    const method = "GET";
    const headers = Object.assign(baseHeaders, optionalHeaders);
    return makePromise(url, {method, headers});
}

export function makePromise(url: string, init: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let func = resolve;
        fetch(url, init)
            .then((res: any) => {
                if (res.status !== 200) {
                    func = reject;
                }
                return res.text();
            })
            .then((text: any) => {
                if (isJSON(text)) {
                    func(JSON.parse(text));
                } else {
                    func(text);
                }
            })
            .catch(e => reject({response: null, message: e}));
    });
}

export function makeBasicHeader(username: string, password: string) {
    return {
        'Authorization': 'Basic ' + btoa(username + ':' + password),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    };
}