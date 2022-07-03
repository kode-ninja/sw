import React, {createContext} from 'react';
import {Col, Container, Row} from "reactstrap";
import LeftColumn from "../left-col/LeftColumn";
import useUserMessage from "../user-message/useUserMessage";
import {TUserMessageText} from "../user-message/interfaces";

interface IUserMessageManagerContextValue {
    showUserSuccessMessage: (messageText: TUserMessageText, displayDuration?: number) => void,
    showUserErrorMessage: (messageText: TUserMessageText, displayDuration?: number) => void,
}

export const UserMessageManager = createContext<IUserMessageManagerContextValue | null>(null);

function App() {
    const {renderUserMessage, ...restOfUserMessageManager} = useUserMessage();

    return (
        <UserMessageManager.Provider value={restOfUserMessageManager}>
            <Container className="mt-5">
                <Row>
                    <Col xs={12} lg={4}>
                        <LeftColumn/>
                    </Col>
                    <Col xs={12} lg={8} className="order-first order-lg-last">

                    </Col>
                </Row>
            </Container>
            {renderUserMessage()}
        </UserMessageManager.Provider>
    );
}

export default App;
