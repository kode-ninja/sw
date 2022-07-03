import {Card, CardText} from "reactstrap";

const EmptyPlaylist = () => {
    return (
        <Card body>
            <CardText>
                There are no videos in the playlist.
            </CardText>
            <CardText>
                Please use the form above to add the first video to the playlist.
            </CardText>
        </Card>
    );
}

export default EmptyPlaylist;