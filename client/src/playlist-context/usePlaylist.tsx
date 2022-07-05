import {useCallback, useContext, useEffect, useReducer} from "react";
import {SocketContext} from "../socket-context/SocketContextProvider";
import {UserMessageContext} from "../app/App";

export interface IPlaylistContextValue {
    playlist: IPlaylistVideo[],
    addVideo: (youtubeURL: string) => void,
    removeVideo: (videoId: string) => void
}

export interface IPlaylistVideo {
    id: string,
    url: string,
    title: string,
    thumbnail_url: string,
    duration: string
}

enum REDUCER_ACTIONS {
    ADD_VIDEO = 'ADD_VIDEO',
    REMOVE_VIDEO = 'REMOVE_VIDEO',
    SET_PLAYLIST = 'SET_PLAYLIST'
}

type IReducerAction =
| {type: REDUCER_ACTIONS.ADD_VIDEO, video: IPlaylistVideo }
| {type: REDUCER_ACTIONS.REMOVE_VIDEO}
| {type: REDUCER_ACTIONS.SET_PLAYLIST, playlist: IPlaylistVideo[]}

const reducer = (playlist: IPlaylistVideo[], action: IReducerAction): IPlaylistVideo[] => {
    switch (action.type) {
        case REDUCER_ACTIONS.ADD_VIDEO:
            return [...playlist, action.video]
        case REDUCER_ACTIONS.REMOVE_VIDEO:
            return playlist.slice(1);
        case REDUCER_ACTIONS.SET_PLAYLIST:
            return action.playlist;
        default:
            // console.error('Invalid action', action);
            return playlist;
    }
}

const usePlaylist = (): IPlaylistContextValue => {
    const [playlist, dispatch] = useReducer(reducer, []);
    const socket = useContext(SocketContext);
    const userMessagesManager = useContext(UserMessageContext);

    useEffect(() => {
        socket.on("playlist", (playlistData: IPlaylistVideo[]) => {
            dispatch({ type: REDUCER_ACTIONS.SET_PLAYLIST, playlist: playlistData });
        });
        socket.on("playlist:add", (video: IPlaylistVideo) => {
            dispatch({ type: REDUCER_ACTIONS.ADD_VIDEO, video });
        });
        socket.on("playlist:add:failed", (reason: string) => {
            userMessagesManager?.showUserErrorMessage('Failed adding video' + (reason ? ': ' + reason : ''));
        });
        socket.on("playlist:remove", () => {
            dispatch({ type: REDUCER_ACTIONS.REMOVE_VIDEO });
        });

        socket.emit('playlist:get');

        return () => {
            socket.off("playlist");
            socket.off("playlist:add");
            socket.off("playlist:add:failed");
            socket.off("playlist:remove");
        }
    }, [socket, userMessagesManager]);

    const addVideo = useCallback((youtubeURL: string) => {
        socket.emit('playlist:add', {url: youtubeURL});
    }, [socket]);

    const removeVideo = useCallback(() => {
        socket.emit('playlist:remove');
    }, [socket]);

    return {
        playlist,
        addVideo,
        removeVideo
    };
}

export default usePlaylist;