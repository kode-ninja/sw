import React, {createContext} from "react";
import io from "socket.io-client";

const socket = io(`http://${window.location.hostname}:3001`); // TODO: fetch socket address from server

export const SocketContext = createContext(socket);

const SocketContextProvider = ({children}: {children: React.ReactNode}) => {

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketContextProvider;