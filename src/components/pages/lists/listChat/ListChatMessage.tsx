import React from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthedGiftListLoaded } from '../../../../redux/reducers/root/rootReducer';

import { TmessageAny } from '../../../../types/models/messages';
import { IUser } from '../../../../types/models/User';
import { formatMessageDateTag } from '../../../../misc/helperFunctions';

interface props {
    message: TmessageAny;
    user: IUser;
}

const ListChatMessage: React.FC<props> = ({ user, message }) => {
    const getMessageType = () => {
        if (message.messageVariant === 'USER_MESSAGE') {
            if (message.authorId === user._id) {
                return 'currentUser';
            }
            return 'otherUser';
        } else {
            return 'system';
        }
    };

    const messageType = getMessageType();

    return (
        <div className={`messageContainerOuter messageContainerOuter-${messageType}`}>
            {'authorName' in message ? (
                <div className='messageContainerInner'>
                    <div className='message-label'>
                        {messageType === 'currentUser' ? 'You' : message.authorName}{' '}
                        <span className='systemMessage-tag'>{formatMessageDateTag(message.creationDate)}</span>
                    </div>
                    <div className={`message message-${messageType}`}>{message.body}</div>
                </div>
            ) : (
                <div className='messageContainerInner'>
                    <div className={`message message-${messageType}`}>
                        <span className='systemMessage-tag-small'>{formatMessageDateTag(message.creationDate)}</span>
                        <span>
                            {message.userName ? message.body.replace('{userName}', message.userName) : message.body}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state: IrootStateAuthedGiftListLoaded) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps)(ListChatMessage);
