import * as React from "react";
import Link from "next/link";
import {post} from "../../utils/net";
import {graphqlEndpoint} from "../../constant/server";
import {AppProvider} from "../../components/app";
import {Header} from "../../components";
import {page} from "../../utils/page";

import ChatRooms from "../../components/ChatRoom";
import {ChatRoom} from "../../components/ChatForm";

interface ChatRoomsProps {
    chatRooms: ChatRoom[];
}

interface ChatRoomsState {
    chatRooms: ChatRoom[];
}

class Index extends React.Component<ChatRoomsProps, ChatRoomsState> {
    static async getInitialProps({res}) {
        const {data} = await Index.fetchChatRooms(res);
        return {chatRooms: data.findAllChatRooms};
    }

    static fetchChatRooms(res?: any) {
        const query = `
        query {
            findAllChatRooms {
                id
                name
                user {
                    id
                    username
                }
            }
        }
        `;
        return post(graphqlEndpoint(res), {query});
    }

    constructor(props: ChatRoomsProps) {
        super(props);
        this.state = {
            chatRooms: props.chatRooms,
        };
    }

    async updateChatRoom() {
        const {data} = await Index.fetchChatRooms();
        this.setState({chatRooms: data.findAllChatRooms});
    }

    render() {
        return (
            <AppProvider>
                <Header/>
                <Link href="/rooms/add"><a>部屋を作る</a></Link>
                <ChatRooms chatRooms={this.state.chatRooms}
                           onUpdateChatRooms={this.updateChatRoom.bind(this)}/>
            </AppProvider>
        );
    }
}

export default page(Index, true);