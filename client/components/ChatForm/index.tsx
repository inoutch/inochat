import * as React from "react";
import {joint} from "../../utils/collection";
import {UserStore} from "../../stores/UserStore";

import {Window, Divider} from "../";
import {graphqlEndpoint} from "../../constant/server";
import {post} from "../../utils/net";
import {inject, observer} from "mobx-react";

export interface ChatRoom {
    id: number;
    name: string;
    user: User;
    chats: Chat[];
}

export interface Chat {
    user: User;
    message: string;
}

export interface User {
    id: number;
    username: string;
}

interface ChatFormProps {
    userStore?: UserStore;
    chatRoom: ChatRoom;
    onRefresh: () => void;
}

interface ChatFormState {
    message: string;
    chatRoom: ChatRoom;
}

@inject("userStore")
@observer
export class ChatForm extends React.Component<ChatFormProps, ChatFormState> {
    constructor(props: ChatFormProps) {
        super(props);
        this.state = {
            message: "",
            chatRoom: props.chatRoom,
        };
    }

    async chat(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        const token = this.props.userStore.getToken();
        const message = this.state.message;
        const query = `
            mutation {
                newChat(token: \"${token}\", chatRoomId: ${this.props.chatRoom.id}, message: \"${message}\") {
                    user {
                        username
                    }
                    message
                }
            }
        `;
        try {
            await post(graphqlEndpoint(), {query});
            this.props.onRefresh();
        } catch (e) {
            console.log(e);
            alert("エラー");
        }
    }

    render() {
        return (
            <Window title={this.props.chatRoom.name}>
                <div>チャット({this.props.chatRoom.chats.length})</div>
                <div>
                    <style jsx>{`
                            padding: 12px;
                            `}</style>
                    {joint(this.props.chatRoom.chats.map((chat, i) =>
                        <div key={i*2}>
                            <label>{chat.user.username}</label>
                            <p>{chat.message}</p>
                        </div>
                    ), (_, j) => <Divider key={j}/>)}
                </div>
                <form>
                    <label>チャット内容を入力してください</label>
                    <div>
                        {this.props.userStore.getUsername()}
                    </div>
                    <div>
                        <input type="text"
                               value={this.state.message}
                               onChange={(e) => this.setState({message: e.target.value})}/>
                        <input type="submit" onClick={this.chat.bind(this)}/>
                    </div>
                </form>
            </Window>
        );
    }
}