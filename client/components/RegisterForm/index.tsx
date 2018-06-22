import * as React from "react";
import {inject, observer} from "mobx-react";
import {UserStore} from "../../stores/UserStore";
import {makeBasicHeader, post, get} from "../../utils/net";
import {endpoint, graphqlEndpoint} from "../../constant/server";
import {Window} from "../index";
import {redirect} from "../../utils/redirect";

interface RegisterFormProps {
    userStore?: UserStore,
}

interface RegisterFormState {
    username: string;
    password: string;
}

@inject("userStore")
@observer
export default class RegisterForm extends React.Component<RegisterFormProps, RegisterFormState> {
    constructor(props: RegisterFormProps) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    async postUsername(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        const query = `
        mutation {
            newUser(username: \"${this.state.username}\", password: \"${this.state.password}\") {
                username
            }
        }`;
        try {
            await post(graphqlEndpoint(), {query});
            const {token} = await get(endpoint() + "/api/login", makeBasicHeader(this.state.username, this.state.password));
            this.props.userStore.setToken(token);
            redirect("/rooms");
        } catch (e) {
            alert("エラー");
        }
    }

    render() {
        return (
            <Window title="登録">
                <form>
                    <div>
                        <label>ユーザー名</label>
                        <input type="text"
                               value={this.state.username}
                               onChange={(e) => this.setState({username: e.target.value})}/>
                    </div>
                    <div>
                        <label>パスワード</label>
                        <input type="password"
                               value={this.state.password}
                               onChange={(e) => this.setState({password: e.target.value})}/>
                    </div>
                    <input type="submit" onClick={this.postUsername.bind(this)}/>
                </form>
            </Window>
        );
    }
}