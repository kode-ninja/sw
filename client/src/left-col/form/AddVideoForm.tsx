import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

const AddVideoForm = () => {
    return (
        <Form>
            <FormGroup row>
                <Col xs={9} >
                    <Label for="videoId" hidden>Video Id</Label>
                    <Input type="text" name="videoId" id="videoId" placeholder="Enter Video Id" />
                </Col>
                <Col>
                    <Button type="submit" color="primary">Add</Button>
                </Col>
            </FormGroup>
        </Form>
    );
}

export default AddVideoForm;