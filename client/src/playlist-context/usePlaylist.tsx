import {useCallback, useContext, useEffect, useState} from "react";
import {ConnectionContext} from "../connection-context/ConnectionContextProvider";

export interface IPlaylistContextValue {
    playlist: any[]    // TODO: type the array
    addVideo: (youtubeURL: string) => void
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
    }, [connection?.isConnected, connection?.socket]);

    const addVideo = useCallback((youtubeURL: string) => {
        connection?.socket?.emit('playlist:add', {url: youtubeURL});
    }, [connection?.socket]);


    return {
        playlist,
        addVideo
    };
}

export default usePlaylist;