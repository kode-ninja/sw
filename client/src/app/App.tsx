import React, {createContext} from 'react';
import {Col, Container, Row} from "reactstrap";
import LeftColumn from "../left-col/LeftColumn";
import useUserMessage from "../user-message/useUserMessage";
import {TUserMessageText} from "../user-message/interfaces";
import PlaylistContextProvider from "../playlist-context/PlaylistContextProvider";
import SocketContextProvider from "../socket-context/SocketContextProvider";

interface IUserMessageManagerContextValue {
    showUserSuccessMessage: (messageText: TUserMessageText, displayDuration?: number) => void,
    showUserErrorMessage: (messageText: TUserMessageText, displayDuration?: number) => void,
}

export const UserMessageContext = createContext<IUserMessageManagerContextValue | null>(null);

function App() {
    const {renderUserMessage, ...restOfUserMessageManager} = useUserMessage();

    return (
        <UserMessageContext.Provider value={restOfUserMessageManager}>
            <SocketContextProvider>
                <PlaylistContextProvider>
                    <Container className="mt-5">
                        <Row>
                            <Col xs={12} lg={5}>
                                <LeftColumn/>
                            </Col>
                            <Col className="order-first order-lg-last">

                            </Col>
                        </Row>
                    </Container>
                    {renderUserMessage()}
                </PlaylistContextProvider>
            </SocketContextProvider>
        </UserMessageContext.Provider>
    );
}

export default App;
