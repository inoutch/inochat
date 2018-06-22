import * as React from "react";

import {post} from "../utils/net";
import {page} from "../utils/page";

class Index extends React.Component {
    static async getInitialProps() {
        const ret = await post("http://localhost:8080/graphql", {query: "query { version }"});
        return {version: ret.data.version}
    }

    render() {
        return (
            <div>
                <h1>Sandbox Page</h1>
            </div>
        );
    }
}

export default page(Index);