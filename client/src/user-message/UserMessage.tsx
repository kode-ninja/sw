import {Toast} from "reactstrap";
import styled from "styled-components";
import UserMessageHeader from "./UserMessageHeader";
import UserMessageBody from "./UserMessageBody";
import {TUserMessageText, TUserMessageToggle, TUserMessageType} from "./interfaces";

const ToastWrapper = styled.div`
position: fixed;
right: 1rem;
bottom: 1rem;
z-index: 11;
`

interface IUserMessageProps {
    type: TUserMessageType,
    text: TUserMessageText,
    isOpen: boolean,
    toggle: TUserMessageToggle
}

const UserMessage = ({type, text, isOpen, toggle}: IUserMessageProps) => {
    return (
        <ToastWrapper>
            <Toast isOpen={isOpen}>
                <UserMessageHeader type={type} toggle={toggle}/>
                <UserMessageBody type={type} text={text}/>
            </Toast>
        </ToastWrapper>
    );
}

export default UserMessage;