export function endpoint(res?: any) {
    // set different endpoint if graphql endpoint is same as server and client
    if (res == null) {
        // ex. /graphql
        return "http://127.0.0.1:8080";
    }
    return "http://127.0.0.1:8080";
}

export function graphqlEndpoint(res?: any) {
    return endpoint(res) + "/graphql";
}
