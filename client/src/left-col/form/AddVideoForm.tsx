import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {useContext} from "react";
import {ConnectionContext} from "../../connection-context/ConnectionContextProvider";

const AddVideoForm = () => {
    const connection = useContext(ConnectionContext);

    return (
        <Form>
            <FormGroup row>
                <Col xs={9} >
                    <Label for="videoId" hidden>Video Id</Label>
                    <Input type="text" name="videoId" id="videoId" placeholder="Enter YouTube Video URL" />
                </Col>
                <Col>
                    <Button type="submit" color="primary" disabled={!(!!connection?.isConnected)}>Add</Button>
                </Col>
            </FormGroup>
        </Form>
    );
}

export default AddVideoForm;