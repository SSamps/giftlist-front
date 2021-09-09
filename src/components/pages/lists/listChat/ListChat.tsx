import React, { Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import {
    checkForNewUserActionCreator,
    TcheckForNewUserActionCreator,
} from '../../../../redux/actions/listGroupActions';
import { IrootStateAuthedGiftListLoaded } from '../../../../redux/reducers/root/rootReducer';
import { TgiftListFieldsCensored } from '../../../../types/models/listGroups';
import { TmessageAny } from '../../../../types/models/messages';
import { findUserInGroup } from '../../../../misc/helperFunctions';
import ListChatForm from './ListChatForm';
import ListChatMessage from './ListChatMessage';
import ListChatReturnToBottomButton from './ListChatReturnToBottomButton';

interface Props {
    ownerName: string;
    token: string;
    currentList: TgiftListFieldsCensored;
    checkForNewUserActionCreator: TcheckForNewUserActionCreator;
}

const GiftListChat: React.FC<Props> = ({ ownerName, token, currentList, checkForNewUserActionCreator }) => {
    const [socket, setSocket] = useState<undefined | Socket<DefaultEventsMap, DefaultEventsMap>>(undefined);
    const [messagesState, setMessagesState] = useState<{ messages: TmessageAny[]; firstUpdate: boolean }>({
        messages: [],
        firstUpdate: true,
    });
    const [returnToBottomNotification, setreturnToBottomNotification] = useState('');
    const latestMessageRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const { messages, firstUpdate } = messagesState;

    useEffect(() => {
        const socket = io(process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:5000', {
            auth: { token: token },
            query: { groupId: currentList._id },
            transports: ['websocket'],
        });

        socket.on('connect_error', (err) => {
            console.error(err.message);
        });

        socket.emit('giftListChat:joinRoom');

        socket.on('giftListChat:joinRoom-success', (currentMessages) => {
            setMessagesState({ messages: [...currentMessages], firstUpdate: true });
        });

        socket.on('giftListChat:newMessage', (newMessage) => {
            setMessagesState((messagesState) => {
                return { messages: [...messagesState.messages, newMessage], firstUpdate: false };
            });
        });

        setSocket(socket);
    }, []);

    useEffect(() => {
        if (!firstUpdate) {
            if (chatContainerRef.current) {
                if (
                    chatContainerRef.current.scrollHeight -
                        (chatContainerRef.current.scrollTop + chatContainerRef.current.offsetHeight) <
                    300
                ) {
                    scrollToLatestMessage();
                } else {
                    setreturnToBottomNotification('New messages');
                }
            }
        } else {
            scrollToLatestMessage();
        }
    }, [messages]);

    const submitForm = (body: string) => {
        socket && socket.emit('giftListChat:postMessage', body);
        scrollToLatestMessage();
    };

    const scrollToLatestMessage = () => {
        if (chatContainerRef.current && latestMessageRef.current) {
            chatContainerRef.current.scroll(0, chatContainerRef.current.scrollHeight);
        }
    };

    const renderMessages = () => {
        return (
            <Fragment>
                {messages.map((message) => {
                    return <ListChatMessage key={message._id} message={message}></ListChatMessage>;
                })}
                <div ref={latestMessageRef}></div>
            </Fragment>
        );
    };

    const onScroll = () => {
        if (chatContainerRef.current) {
            const distanceToBottom =
                chatContainerRef.current.scrollHeight -
                (chatContainerRef.current.scrollTop + chatContainerRef.current.offsetHeight);
            if (distanceToBottom < 50) {
                setreturnToBottomNotification('');
            } else {
                if (distanceToBottom > 1000 && returnToBottomNotification !== 'New messages') {
                    setreturnToBottomNotification('Return to latest');
                }
            }
        }
    };

    // Hacky solution due to socket.io functionality being tacked on. Required in case a new user joins as that logic currently all uses rest not sockets.
    const verifyMessageAuthorsLoaded = () => {
        let foundMessageAuthorIds: string[] = [];
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            if ('author' in message && !foundMessageAuthorIds.includes(message.author)) {
                foundMessageAuthorIds.push(message.author);
            }
        }

        for (let i = 0; i < foundMessageAuthorIds.length; i++) {
            if (!findUserInGroup(currentList, foundMessageAuthorIds[i])) {
                checkForNewUserActionCreator(currentList._id, foundMessageAuthorIds[i]);
                break;
            }
        }
    };
    verifyMessageAuthorsLoaded();

    return (
        <div className='listSectionContainer listChatContainerBorder'>
            <div className='listSectionContentContainer'>
                <div className='systemMessage'>
                    <i className='fas fa-eye-slash'></i>{' '}
                    <span>
                        {ownerName} <strong>can't</strong> see your chat
                    </span>
                </div>
                <div ref={chatContainerRef} className='listChat' onScroll={onScroll}>
                    {renderMessages()}
                </div>
                <div className='listChatBottom'>
                    {returnToBottomNotification && (
                        <ListChatReturnToBottomButton
                            onClick={scrollToLatestMessage}
                            description={returnToBottomNotification}
                        ></ListChatReturnToBottomButton>
                    )}
                </div>
                <ListChatForm submitForm={submitForm}></ListChatForm>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IrootStateAuthedGiftListLoaded) => ({
    token: state.authReducer.token,
    currentList: state.listGroupReducer.currentList,
});

export default connect(mapStateToProps, { checkForNewUserActionCreator })(GiftListChat);
