import * as React from "react";
import Link from "next/link";
import {graphqlEndpoint} from "../../constant/server";
import {post} from "../../utils/net";
import {UserStore} from "../../stores/UserStore";
import {inject, observer} from "mobx-react";
import {User} from "../ChatForm";

interface ChatRoomProps {
    chatRooms: ChatRoom[];
    userStore?: UserStore;
    onUpdateChatRooms: () => void;
}

interface ChatRoom {
    id: number;
    name: string;
    user: User;
}

@inject("userStore")
@observer
export default class extends React.Component<ChatRoomProps> {
    removeChatRooms(token: string, id: number, res?: any) {
        const query = `
        mutation {
            removeChatRoom(token: "${token}", chatRoomId: ${id})
        }
        `;
        return post(graphqlEndpoint(res), {query});
    }

    remove(id: number) {
        this.removeChatRooms(this.props.userStore.getToken(), id)
            .then(this.props.onUpdateChatRooms)
            .catch(() => {});
    }

    render() {
        return (
            <table>
                <thead>
                <tr>
                    <td>部屋名</td>
                    <td>所有者</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                {this.props.chatRooms.map((chatRoom, i) =>
                    <tr key={i}>
                        <td>{chatRoom.name}</td>
                        <td>{chatRoom.user.username}</td>
                        <td>
                            <Link as={`/rooms/${chatRoom.id}`} href={`/rooms/show?id=${chatRoom.id}`}>
                                <a className="table-link">閲覧</a>
                            </Link>
                            {chatRoom.user.id === this.props.userStore.getUserId() ?
                                <button onClick={() => this.remove(chatRoom.id)}>削除</button> : null}
                        </td>
                    </tr>)}
                </tbody>
                <style jsx>{`
                table {
                    border-collapse: collapse;
                    margin: 0 auto;
                }
                table, td {
                    border: 1px solid gray;
                }
                td {
                    padding: 18px;
                    min-width: 250px;
                }
                .table-link {
                    padding: 0 8px;
                }
                `}</style>
            </table>
        );
    }
}