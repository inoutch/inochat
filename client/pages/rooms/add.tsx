import * as React from "react";
import {Container, Header} from "../../components";
import AddChatRoomForm from "../../components/AddChatRoomForm";
import {page} from "../../utils/page";

class Add extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Container>
                    <AddChatRoomForm/>
                </Container>
            </div>
        );
    }
}

export default page(Add, true);