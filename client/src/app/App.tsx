import React, {createContext} from 'react';
import {Col, Container, Row} from "reactstrap";
import LeftColumn from "../left-col/LeftColumn";
import useUserMessage from "../user-message/useUserMessage";
import {TUserMessageText} from "../user-message/interfaces";
import ConnectionContextProvider from "../connection-context/ConnectionContextProvider";
import PlaylistContextProvider from "../playlist-context/PlaylistContextProvider";

interface IUserMessageManagerContextValue {
    showUserSuccessMessage: (messageText: TUserMessageText, displayDuration?: number) => void,
    showUserErrorMessage: (messageText: TUserMessageText, displayDuration?: number) => void,
}

export const UserMessageContext = createContext<IUserMessageManagerContextValue | null>(null);

function App() {
    const {renderUserMessage, ...restOfUserMessageManager} = useUserMessage();

    return (
        <UserMessageContext.Provider value={restOfUserMessageManager}>
            <ConnectionContextProvider>
                <PlaylistContextProvider>
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
                </PlaylistContextProvider>
            </ConnectionContextProvider>
        </UserMessageContext.Provider>
    );
}

export default App;
