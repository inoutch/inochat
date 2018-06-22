import * as React from "react";
import Link from "next/link";
import {inject, observer} from "mobx-react";
import {UserStore} from "../../stores/UserStore";
import {makeBasicHeader, get} from "../../utils/net";
import {endpoint} from "../../constant/server";
import {Window} from "../index";
import {redirect} from "../../utils/redirect";

interface LoginFormProps {
    userStore?: UserStore,
}

interface LoginFormState {
    username: string;
    password: string;
}

@inject("userStore")
@observer
export default class RegisterForm extends React.Component<LoginFormProps, LoginFormState> {
    constructor(props: LoginFormProps) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    async postUsername(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        try {
            const {token, userId, username} = await get(endpoint() + "/api/login", makeBasicHeader(this.state.username, this.state.password));
            this.props.userStore.setToken(token);
            this.props.userStore.setUsername(username);
            this.props.userStore.setUserId(userId);
            redirect("/rooms");
        } catch (e) {
            alert("エラー");
        }
    }

    render() {
        return (
            <Window title="ログイン">
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
                    <div>
                        <Link href="/register">
                            <a>新規登録</a>
                        </Link>
                    </div>
                    <input type="submit" onClick={this.postUsername.bind(this)}/>
                </form>
            </Window>
        );
    }
}