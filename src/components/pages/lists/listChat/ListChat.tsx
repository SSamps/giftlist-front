import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { IrootStateAuthedCurrentListLoaded } from '../../../../redux/reducers/root/rootReducer';
import { TListGroupAnyFields } from '../../../../types/models/listGroups';
import { TmessageAny } from '../../../../types/models/messages';
import ListChatMessage from './ListChatMessage';

interface Props {
    ownerName: string;
    token: string;
    currentList: TListGroupAnyFields;
}

const GiftListChat: React.FC<Props> = ({ ownerName, token, currentList }) => {
    const [socket, setSocket] = useState<undefined | Socket<DefaultEventsMap, DefaultEventsMap>>(undefined);
    const [messages, setMessages] = useState<TmessageAny[]>([]);

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
            setMessages([...currentMessages]);
        });

        setSocket(socket);
    }, []);

    if (socket) {
        socket.on('giftListChat:postMessage-success', (newMessage) => {
            setMessages([...messages, newMessage]);
        });
    }

    const renderChatVisibilityMessage = () => {
        return (
            <div className='systemMessage'>
                <i className='fas fa-eye-slash danger'></i>{' '}
                <span>
                    {ownerName} <strong>can't</strong> see your chat
                </span>
            </div>
        );
    };

    // const testSocket = () => {
    //     socket && socket.emit('giftListChat:postMessage', { var1: 'test var1', var2: 'test var2' });
    // };

    const renderMessages = () => {
        return (
            <Fragment>
                {messages.map((message) => {
                    return <ListChatMessage key={message._id} message={message}></ListChatMessage>;
                })}
            </Fragment>
        );
    };
    return (
        <div className='listSectionContainer listChatContainerBorder'>
            <div className='listSectionContentContainer'>
                {renderChatVisibilityMessage()}
                <div className='listChat'>{renderMessages()}</div>
                <div className='listChatControlsContainer'>Here be buttons</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IrootStateAuthedCurrentListLoaded) => ({
    token: state.authReducer.token,
    currentList: state.listGroupReducer.currentList,
});

export default connect(mapStateToProps)(GiftListChat);
