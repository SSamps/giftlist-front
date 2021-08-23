import React, { Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { IrootStateAuthedCurrentListLoaded } from '../../../../redux/reducers/root/rootReducer';
import { TListGroupAnyFields } from '../../../../types/models/listGroups';
import { TmessageAny } from '../../../../types/models/messages';
import ListChatForm from './ListChatForm';
import ListChatMessage from './ListChatMessage';
import ListChatNewMessageNotification from './ListChatNewMessageNotification';

interface Props {
    ownerName: string;
    token: string;
    currentList: TListGroupAnyFields;
}

const GiftListChat: React.FC<Props> = ({ ownerName, token, currentList }) => {
    const [socket, setSocket] = useState<undefined | Socket<DefaultEventsMap, DefaultEventsMap>>(undefined);
    const [messagesState, setMessagesState] = useState<{ messages: TmessageAny[]; firstUpdate: boolean }>({
        messages: [],
        firstUpdate: true,
    });
    const [newMessageNotification, setNewMessageNotification] = useState(false);
    const latestMessageRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const { messages, firstUpdate } = messagesState;

    useEffect(() => {
        const socket = io(process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:5000', {
            auth: { token: token },
            query: { groupId: currentList._id },
        });

        socket.on('connect_error', (err) => {
            console.log(err.message);
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
                    setNewMessageNotification(true);
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
            if (
                chatContainerRef.current.scrollHeight -
                    (chatContainerRef.current.scrollTop + chatContainerRef.current.offsetHeight) <
                50
            ) {
                setNewMessageNotification(false);
            }
        }
    };

    const testFunc = () => {
        setNewMessageNotification(!newMessageNotification);
    };

    return (
        <div className='listSectionContainer listChatContainerBorder'>
            <div className='btn-simple' onClick={testFunc}>
                Button
            </div>
            <div className='listSectionContentContainer'>
                <div className='systemMessage'>
                    <i className='fas fa-eye-slash danger'></i>{' '}
                    <span>
                        {ownerName} <strong>can't</strong> see your chat
                    </span>
                </div>
                <div ref={chatContainerRef} className='listChat' onScroll={onScroll}>
                    {renderMessages()}
                </div>
                <div className='listChatBottom'>
                    {newMessageNotification && (
                        <ListChatNewMessageNotification
                            onClick={scrollToLatestMessage}
                        ></ListChatNewMessageNotification>
                    )}
                </div>
                <ListChatForm submitForm={submitForm}></ListChatForm>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IrootStateAuthedCurrentListLoaded) => ({
    token: state.authReducer.token,
    currentList: state.listGroupReducer.currentList,
});

export default connect(mapStateToProps)(GiftListChat);
