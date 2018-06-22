import * as React from "react";
import Link from "next/link";

import {redirect} from "../../utils/redirect";
import {validateText} from "../../utils/type";
import {post} from "../../utils/net";
import {graphqlEndpoint} from "../../constant/server";

import {Container, Header} from "../../components";
import {ChatForm, ChatRoom} from "../../components/ChatForm";
import {page} from "../../utils/page";
import {inject, observer} from "mobx-react";
import {UserStore} from "../../stores/UserStore";

interface ShowProps {
    chatRoom: ChatRoom;
    userStore?: UserStore;
}

interface ShowState {
    chatRoom: ChatRoom;
}

@inject("userStore")
@observer
class Show extends React.Component<ShowProps, ShowState> {
    static async getInitialProps({query, res, params}) {
        await new Promise((resolve) => {setTimeout(resolve, 1000)});
        if (validateText(query.id) && validateText(params.id)) {
            redirect("/", res);
            return {};
        }
        try {
            const chatRoom = await Show.fetchChatRoom(query.id, res);
            return {chatRoom: chatRoom.data.getChatRoom};
        } catch (e) {
            return {};
        }
    }

    static fetchChatRoom(id: number, res?: any) {
        const query = `
            query {
                getChatRoom(id: ${id}) {
                    id
                    name
                    chats {
                        user {
                            username
                        }
                        message
                    }
                }
            }
        `;
        return post(graphqlEndpoint(res), {query});
    }

    static fetchUser(token: string, res?: any) {
        const query = `
            query {
                getUser(token: "${token}") {
                    id
                    username
                }
            }
        `;
        return post(graphqlEndpoint(res), {query});
    }

    constructor(props: ShowProps) {
        super(props);
        this.state = {
            chatRoom: props.chatRoom,
        };
    }

    async refreshChats() {
        const {data} = await Show.fetchChatRoom(this.state.chatRoom.id);
        this.setState({chatRoom: data.getChatRoom});
    }

    render() {
        return (
            <div>
                <Header/>
                <Link href="/rooms"><a>チャット一覧</a></Link>
                <Container>
                    <ChatForm chatRoom={this.state.chatRoom} onRefresh={this.refreshChats.bind(this)}/>
                </Container>
            </div>
        );
    }
}

export default page(Show, true);