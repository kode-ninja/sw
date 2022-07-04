import {useCallback, useContext, useEffect, useState} from "react";
import {SocketContext} from "../socket-context/SocketContextProvider";

export interface IPlaylistContextValue {
    playlist: any[],    // TODO: type the array
    addVideo: (youtubeURL: string) => void
}

const usePlaylist = (): IPlaylistContextValue => {
    const [playlist, setPlaylist] = useState([]);
    const socket = useContext(SocketContext);

    useEffect(() => {
        /*TODO*/console.log('usePlaylist.useEffect[] subscribing to "playlist:refresh"');
        socket.on("playlist:refresh", data => {
            /*TODO*/console.log('usePlaylist.on("playlist:refresh") data=', data);
            setPlaylist(data);
        });
        /*TODO*/console.log('usePlaylist.useEffect[] emit(\'playlist:get\')');
        socket.emit('playlist:get');

        return () => {
            socket.off("playlist:refresh");
        }
    }, [socket]);

    const addVideo = useCallback((youtubeURL: string) => {
        socket.emit('playlist:add', {url: youtubeURL});
    }, [socket]);


    return {
        playlist,
        addVideo
    };
}

export default usePlaylist;