import * as React from "react";
import renderer from "react-test-renderer";
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

import {ChatForm, ChatRoom} from "../components/ChatForm";
import {UserStore} from "../stores/UserStore";
import {Provider} from "mobx-react";

describe("ChatForm Test", () => {
    let chatRoom: ChatRoom;
    let userStore: UserStore;
    beforeEach(() => {
        chatRoom = {
            id: 1,
            name: "部屋名",
            user: {
                id: 1,
                username: "ユーザー名",
            },
            chats: [
                {
                    user: {id: 1, username: "John"},
                    message: "コメント1",
                },
                {
                    user: {id: 2, username: "Steve"},
                    message: "コメント2",
                }
            ]
        };
        userStore = new UserStore();
    });

    test("snapshot", () => {
        const onRefresh = () => {
        };
        const component = renderer.create(
            <Provider userStore={userStore}>
                <ChatForm chatRoom={chatRoom} onRefresh={onRefresh}/>
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("shallow", () => {
        const onRefresh = () => {
        };
        const component = enzyme.shallow(
            <Provider userStore={userStore}>
                <ChatForm chatRoom={chatRoom} onRefresh={onRefresh}/>
            </Provider>
        );
        expect(component).toMatchSnapshot();
    });
});