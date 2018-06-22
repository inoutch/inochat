import * as React from "react";
import Router from "next/router";
import {Window} from "../index";
import {UserStore} from "../../stores/UserStore";
import {post} from "../../utils/net";
import {graphqlEndpoint} from "../../constant/server";
import {inject, observer} from "mobx-react";

interface AddChatRoomProps {
    userStore?: UserStore;
}

interface AddChatRoomState {
    name: string;
}

@inject("userStore")
@observer
export default class AddChatRoomForm extends React.Component<AddChatRoomProps, AddChatRoomState> {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };
    }

    async add(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        const query = `
        mutation { 
            newChatRoom(token: \"${this.props.userStore.getToken()}\", name: \"${this.state.name}\") {
                id
            }
        }
        `;
        try {
            const {data} = await post(graphqlEndpoint(), {query});
            Router.push(`/rooms/show?id=${data.newChatRoom.id}`, `/rooms/${data.newChatRoom.id}`);
        } catch (e) {
            alert(e);
        }
    }

    render() {
        return (
            <Window title="部屋を作る">
                <form>
                    <label>
                        ルーム名
                        <input type="text"
                               value={this.state.name}
                               onChange={(e: React.ChangeEvent<any>) => this.setState({name: e.target.value})}/>
                    </label>
                    <input type="submit" onClick={this.add.bind(this)}/>
                </form>
            </Window>
        )
    }
}
