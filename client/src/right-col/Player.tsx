import {useContext} from "react";
import {PlaylistContext} from "../playlist-context/PlaylistContextProvider";
import YouTube from 'react-youtube';
import "./Player.css";

const reactYouTubeOptions = {
    width: '100%',
    height: '100%',
    playerVars: {
        autoplay: 1,
    }
}

const Player = () => {
    const playlistContext = useContext(PlaylistContext) ;
    const playlistVideos = playlistContext?.playlist;

    if (!playlistVideos || playlistVideos.length === 0)
        return null;

    const firstPlaylistVideo = playlistVideos[0];

    return (
        <YouTube className="player" videoId={firstPlaylistVideo.id} opts={reactYouTubeOptions} />
    );
}

export default Player;