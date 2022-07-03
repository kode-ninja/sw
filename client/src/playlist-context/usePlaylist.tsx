import React, {useContext, useEffect, useState} from "react";
import {ConnectionContext} from "../connection-context/ConnectionContextProvider";

export interface IPlaylistContextValue {
    playlist: any[]    // TODO: type the array
}

const usePlaylist = (): IPlaylistContextValue => {
    const [playlist, setPlaylist] = useState([]);
    const connection = useContext(ConnectionContext);

    useEffect(() => {
        /*TODO*/console.log('usePlaylist.useEffect[connection?.isConnected]', connection?.isConnected);
        if (connection?.isConnected) {
            connection.socket?.on("playlist:all", data => {
                /*TODO*/console.log('usePlaylist.on("playlist:all") data=', data);
                setPlaylist(data);
            });

            connection.socket?.emit('playlist:get');
        }

        return () => {
            connection?.socket?.off("playlist:all");
        }
    }, [connection?.isConnected]);


    return {
        playlist
    };
}

export default usePlaylist;