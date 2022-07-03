import {ToastBody} from "reactstrap";
import {TYPE_ERROR} from "./useUserMessage";
import {TUserMessageText, TUserMessageType} from "./interfaces";

interface IUserMessageBodyProps {
    type: TUserMessageType,
    text: TUserMessageText,
}

const UserMessageBody = ({type, text}: IUserMessageBodyProps) => {
    return (
        <ToastBody className={'text-white ' + (type === TYPE_ERROR ? 'bg-danger' : 'bg-success')}>
            {text}
        </ToastBody>
    );
}

export default UserMessageBody;