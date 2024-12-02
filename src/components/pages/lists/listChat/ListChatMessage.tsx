import React from 'react';

import { TmessageAny } from '../../../../types/models/messages';
import { formatMessageDateTag } from '../../../../misc/helperFunctions';
import { useAuth } from '../../../../state/AuthState';

interface props {
    message: TmessageAny;
}

const ListChatMessage: React.FC<props> = ({ message }) => {

    const user = useAuth().getAuthedUser();

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

export default ListChatMessage;
