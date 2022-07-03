import usePlaylist, {IPlaylistContextValue} from "./usePlaylist";
import React, {createContext} from "react";

export const PlaylistContext = createContext<IPlaylistContextValue | null>(null);

const PlaylistContextProvider = ({children}: {children: React.ReactNode}) => {
    const playlistContextValue = usePlaylist();

    return (
        <PlaylistContext.Provider value={playlistContextValue}>
            {children}
        </PlaylistContext.Provider>
    );
}

export default PlaylistContextProvider;