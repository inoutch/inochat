import * as React from "react";
import {getCookie} from "./cookie";
import {redirect} from "./redirect";
import {validateText} from "./type";
import {AppProvider} from "../components/app";

export const page = (Page, auth: boolean = false) => class WrappedPage extends React.Component {
    static async getInitialProps(params: any = {}) {
        const token = getCookie(params.req).token;
        const props = Page.getInitialProps && Page.getInitialProps({...params, token});
        if (auth && validateText(token)) {
            redirect("/", params.res);
        }
        return props || {};
    }
    render() {
        return (
            <AppProvider>
                <Page {...this.props}/>
            </AppProvider>
        );
    }
};