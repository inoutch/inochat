import * as React from "react";

import {post} from "../utils/net";
import LoginForm from "../components/LoginForm";
import {Container, Header} from "../components";
import {page} from "../utils/page";

class Index extends React.Component {
    static async getInitialProps() {
        const ret = await post("http://localhost:8080/graphql", {query: "query { version }"});
        return {version: ret.data.version}
    }

    render() {
        return (
            <div>
                <Header/>
                <Container>
                    <LoginForm/>
                </Container>
            </div>
        );
    }
}

export default page(Index);