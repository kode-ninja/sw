import {ToastHeader} from "reactstrap";
import {TYPE_ERROR} from "./useUserMessage";
import {TUserMessageToggle, TUserMessageType} from "./interfaces";

interface IUserMessageHeaderProps {
    type: TUserMessageType,
    toggle: TUserMessageToggle
}

const UserMessageHeader = ({type, toggle}: IUserMessageHeaderProps) => {
    return (
        <ToastHeader toggle={toggle} className={type === TYPE_ERROR ? 'text-danger' : 'text-success'}>
            {type === TYPE_ERROR ? 'Error' : 'Success'}
        </ToastHeader>
    );
}

export default UserMessageHeader;