import * as React from "react";
import {Provider} from "mobx-react";
import stores from "../stores/stores";

export class AppProvider extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <div>
                    {this.props.children}
                </div>
            </Provider>
        )
    }
}