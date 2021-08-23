import React from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthedCurrentListLoaded } from '../../../../redux/reducers/root/rootReducer';
import { TListGroupAnyFields } from '../../../../types/models/listGroups';
import { TmessageAny } from '../../../../types/models/messages';
import { IUser } from '../../../../types/models/User';
import { findUserInGroup, getPrettyDate } from '../../../../utils/helperFunctions';

interface props {
    message: TmessageAny;
    user: IUser;
    currentList: TListGroupAnyFields;
}

const ListChatMessage: React.FC<props> = ({ user, message, currentList }) => {
    const getMessageType = () => {
        if (message.messageVariant === 'USER_MESSAGE') {
            if (message.author === user._id) {
                return 'currentUser';
            }
            return 'otherUser';
        } else {
            return 'system';
        }
    };

    const messageType = getMessageType();

    const getAuthorName = () => {
        if (message.messageVariant === 'USER_MESSAGE') {
            return findUserInGroup(currentList, message.author)?.displayName;
        }
    };

    const authorName = getAuthorName();

    return (
        <div className={`messageContainerOuter messageContainerOuter-${messageType}`}>
            <div className='messageContainerInner'>
                {authorName && (
                    <div className='message-label'>
                        {messageType === 'currentUser' ? 'You' : authorName}{' '}
                        <span className='systemMessage-tag'>{getPrettyDate(message.creationDate)}</span>
                    </div>
                )}
                <div className={`message message-${messageType}`}>{message.body}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IrootStateAuthedCurrentListLoaded) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
});

export default connect(mapStateToProps)(ListChatMessage);
