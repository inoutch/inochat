import * as React from "react";

import {post} from "../utils/net";
import RegisterForm from "../components/RegisterForm";
import {Container, Header} from "../components";
import {page} from "../utils/page";

class Register extends React.Component {
    static async getInitialProps() {
        const ret = await post("http://localhost:8080/graphql", {query: "query { version }"});
        return {version: ret.data.version}
    }

    render() {
        return (
            <div>
                <Header/>
                <Container>
                    <RegisterForm/>
                </Container>
            </div>
        );
    }
}

export default page(Register);