import React, {createContext} from "react";
import useConnection, {IConnectionContextValue} from "./useConnection";

export const ConnectionContext = createContext<IConnectionContextValue | null>(null);

const ConnectionContextProvider = ({children}: {children: React.ReactNode}) => {
    const connectionValue = useConnection();

    return (
        <ConnectionContext.Provider value={connectionValue}>
            {children}
        </ConnectionContext.Provider>
    );
}

export default ConnectionContextProvider;