import EmptyPlaylist from "./EmptyPlaylist";
import {useContext} from "react";
import {PlaylistContext} from "../../playlist-context/PlaylistContextProvider";
import {ListGroup, ListGroupItem} from "reactstrap";
import Video from "./video/Video";
import styled from "styled-components";

const StyledPlaylist = styled(ListGroup)`
overflow: scroll;
max-height: 70vh;
`

const Playlist = () => {
    const playlistContext = useContext(PlaylistContext) ;
    const playlistVideos = playlistContext?.playlist;

    if (!playlistVideos || playlistVideos.length === 0)
        return <EmptyPlaylist />

    return (
        <StyledPlaylist>
            {
                playlistVideos.map((playlistVideo) => {
                    return (
                        <ListGroupItem key={playlistVideo.id}>
                            <Video thumbnail_url={playlistVideo.thumbnail_url} title={playlistVideo.title} duration={playlistVideo.duration} />
                        </ListGroupItem>
                    );
                })
            }
        </StyledPlaylist>
    );
}

export default Playlist;