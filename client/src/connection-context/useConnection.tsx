import {useContext, useEffect, useState} from "react";
import io from 'socket.io-client';
import {UserMessageContext} from "../app/App";

export interface IConnectionContextValue {
    socket: ReturnType<typeof io> | null,
    isConnected: boolean
}

const useConnection = (): IConnectionContextValue => {
    const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
    const userMessageManager = useContext(UserMessageContext);

    useEffect(() => {
        function onConnect() {
            console.log('useConnection.on("connect")'); // TODO: delete
            setSocket(newSocket);
        }

        function onDisconnect() {
            userMessageManager?.showUserErrorMessage('Disconnected from server');
            setSocket(null);
        }

        const newSocket = io(`http://${window.location.hostname}:3001`); // TODO: fetch socket address from server

        newSocket.on("connect", onConnect);
        newSocket.on("disconnect", onDisconnect);

        return () => {
            socket?.off("connect");
            socket?.off("disconnect");
        }
    }, [userMessageManager]);

    return {
        socket,
        isConnected: !!(socket && socket.connected),
    };
}

export default useConnection;