import React, { Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { IrootStateAuthedCurrentListLoaded } from '../../../../redux/reducers/root/rootReducer';
import { TListGroupAnyFields } from '../../../../types/models/listGroups';
import { TmessageAny } from '../../../../types/models/messages';
import ListChatForm from './ListChatForm';
import ListChatMessage from './ListChatMessage';

interface Props {
    ownerName: string;
    token: string;
    currentList: TListGroupAnyFields;
}

const GiftListChat: React.FC<Props> = ({ ownerName, token, currentList }) => {
    const [socket, setSocket] = useState<undefined | Socket<DefaultEventsMap, DefaultEventsMap>>(undefined);
    const [messages, setMessages] = useState<TmessageAny[]>([]);
    const latestMessageRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

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
            console.log('setting messages on joining the room');
            setMessages([...currentMessages]);
        });

        socket.on('giftListChat:postMessage-success', (newMessage) => {
            console.log('setting messages ofter posting');
            setMessages((messages) => [...messages, newMessage]);
        });

        setSocket(socket);
    }, []);

    useEffect(() => {
        scrollToLatestMessage();
    }, [messages]);

    const submitForm = (body: string) => {
        socket && socket.emit('giftListChat:postMessage', body);
    };

    const scrollToLatestMessage = () => {
        if (chatContainerRef.current && latestMessageRef.current) {
            chatContainerRef.current.scroll(0, latestMessageRef.current.offsetTop);
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

    return (
        <div className='listSectionContainer listChatContainerBorder'>
            <div className='listSectionContentContainer'>
                <div className='systemMessage'>
                    <i className='fas fa-eye-slash danger'></i>
                    <span>
                        {ownerName} <strong>can't</strong> see your chat
                    </span>
                </div>
                <div ref={chatContainerRef} className='listChat'>
                    {renderMessages()}
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
