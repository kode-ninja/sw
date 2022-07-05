import {Button, Col, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {PlaylistContext} from "../../playlist-context/PlaylistContextProvider";
import {SocketContext} from "../../socket-context/SocketContextProvider";

const NO_VALIDATION_ERROR = '';

const AddVideoForm = () => {
    const [videoURL, setVideoURL] = useState('');
    const [validationError, setValidationError] = useState(NO_VALIDATION_ERROR);
    const socket = useContext(SocketContext);
    const playlistContext = useContext(PlaylistContext);

    const validateForm = () => {
        setValidationError(NO_VALIDATION_ERROR);

        if (videoURL.trim() === '') {
            setValidationError('Please Enter a YouTube Video URL');

            return false;
        }

        return true;
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm())
            return;

        playlistContext?.addVideo(videoURL);
        setVideoURL('');
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValidationError(NO_VALIDATION_ERROR);
        setVideoURL(e.target.value);
    }

    return (
        <Form onSubmit={e => onSubmit(e)}>
            <FormGroup row>
                <Col xs={9} >
                    <Label for="videoURL" hidden>YouTube Video URL</Label>
                    <Input
                        type="text"
                        name="videoURL"
                        id="videoURL"
                        placeholder="Enter YouTube Video URL"
                        onChange={(e) => onInputChange(e)}
                        value={videoURL}
                        invalid={!!validationError}
                    />
                    {validationError && <FormFeedback>{validationError}</FormFeedback>}
                </Col>
                <Col>
                    <Button type="submit" onClick={e => onSubmit(e)} color="primary" disabled={!socket.connected}>Add</Button>
                </Col>
            </FormGroup>
        </Form>
    );
}

export default AddVideoForm;