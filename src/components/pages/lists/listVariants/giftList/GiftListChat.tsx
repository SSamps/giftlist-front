import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { IrootStateAuthedCurrentListLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { TListGroupAnyFields } from '../../../../../types/models/listGroups';

interface Props {
    ownerName: string;
    token: string;
    currentList: TListGroupAnyFields;
}

const GiftListChat: React.FC<Props> = ({ ownerName, token, currentList }) => {
    let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    useEffect(() => {
        socket = io(process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:5000', {
            auth: { token: token },
            query: { groupId: currentList._id },
        });

        socket.on('connect_error', (err) => {
            console.log(err.message);
        });

        socket.emit('giftListChat:joinRoom');

        socket.on('giftListChat:joinRoom-success', () => {
            console.log('I have joined the room!');
        });

        socket.on('giftListChat:message', (data) => {
            console.log(data);
        });
    }, []);

    const renderChatVisibilityMessage = () => {
        return (
            <div className='giftListVisibilityMessage systemMessage'>
                <i className='fas fa-eye-slash danger'></i>{' '}
                <span>
                    {ownerName} <strong>can't</strong> see your chat
                </span>
            </div>
        );
    };

    const testSocket = () => {
        socket.emit('Button clicked', { var1: 'test var1', var2: 'test var2' });
    };

    return (
        <div className='giftListChatContainer'>
            {renderChatVisibilityMessage()}
            <div>
                <span className='btn-simple' onClick={testSocket}>
                    Test Me
                </span>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IrootStateAuthedCurrentListLoaded) => ({
    token: state.authReducer.token,
    currentList: state.listGroupReducer.currentList,
});

export default connect(mapStateToProps)(GiftListChat);
