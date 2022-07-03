import React, {useCallback, useEffect, useRef, useState} from "react";
import {TUserMessageText, TUserMessageType} from "./interfaces";
import UserMessage from "./UserMessage";

export const TYPE_SUCCESS = 'success';
export const TYPE_ERROR = 'error';

const DEFAULT_DISPLAY_DURATION = 3000;
const NO_USER_MESSAGE = null;

interface IUserMessage {
    type: TUserMessageType,
    text: TUserMessageText
}

const useUserMessage = (): {
    showUserSuccessMessage: (messageText: TUserMessageText, displayDuration?: number) => void,
    showUserErrorMessage: (messageText: TUserMessageText, displayDuration?: number) => void,
    renderUserMessage: () => React.ReactNode | null,
} => {

    const [userMessage, setUserMessage] = useState<IUserMessage | typeof NO_USER_MESSAGE>(NO_USER_MESSAGE);
    let timerId = useRef<ReturnType<typeof setTimeout>>()

    useEffect(() => {
        return () => {
            clearTimeout(timerId.current);
        }
    }, [])

    const showUserMessage = useCallback((messageType: TUserMessageType, messageText: TUserMessageText, displayDuration: number) => {
        setUserMessage({type: messageType, text: messageText});
        timerId.current = setTimeout(() => setUserMessage(NO_USER_MESSAGE), displayDuration);
    }, []);

    const showUserSuccessMessage = useCallback((messageText: TUserMessageText, displayDuration: number = DEFAULT_DISPLAY_DURATION) => {
        showUserMessage(TYPE_SUCCESS, messageText, displayDuration);
    }, [showUserMessage]);

    const showUserErrorMessage = useCallback((messageText: TUserMessageText, displayDuration: number = DEFAULT_DISPLAY_DURATION) => {
        showUserMessage(TYPE_ERROR, messageText, displayDuration);
    }, [showUserMessage]);

    const renderUserMessage = useCallback(() => {
        if (userMessage === NO_USER_MESSAGE)
            return null;
        else
            return <UserMessage {...userMessage} isOpen={userMessage !== NO_USER_MESSAGE} toggle={() => setUserMessage(NO_USER_MESSAGE)} />
    }, [userMessage]);

    return {
        showUserSuccessMessage,
        showUserErrorMessage,
        renderUserMessage
    };
}

export default useUserMessage;