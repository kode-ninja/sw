import {Card} from "reactstrap";
import AddVideoForm from "./form/AddVideoForm";
import Playlist from "./playlist/Playlist";

const LeftColumn = () => {
    return (
        <Card body>
            <AddVideoForm />
            <Playlist />
        </Card>
    );
}

export default LeftColumn;