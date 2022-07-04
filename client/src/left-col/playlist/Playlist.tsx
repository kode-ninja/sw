import EmptyPlaylist from "./EmptyPlaylist";
import {useContext} from "react";
import {PlaylistContext} from "../../playlist-context/PlaylistContextProvider";
import {ListGroup, ListGroupItem} from "reactstrap";
import Video from "./video/Video";


const Playlist = () => {
    const playlistContext = useContext(PlaylistContext) ;
    const playlistVideos = playlistContext?.playlist;

    if (!playlistVideos || playlistVideos.length === 0)
        return <EmptyPlaylist />

    return (
        <ListGroup>
            {
                playlistVideos.map((playlistVideo) => {
                    return (
                        <ListGroupItem key={playlistVideo.id}>
                            <Video thumbnail_url={playlistVideo.thumbnail_url} title={playlistVideo.title} duration={playlistVideo.duration} />
                        </ListGroupItem>
                    );
                })
            }
        </ListGroup>
    );
}

export default Playlist;