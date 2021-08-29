import React from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthed } from '../../../../../../redux/reducers/root/rootReducer';
import { TgiftListFieldsCensored } from '../../../../../../types/models/listGroups';
import { IUser } from '../../../../../../types/models/User';

interface props {
    child: TgiftListFieldsCensored;
    user: IUser;
}

const GiftGroupPreviewCardChild: React.FC<props> = ({ child, user }) => {
    const hasSelectedItem = () => {
        for (let i = 0; i < child.listItems.length; i++) {
            if (child.listItems[i].selectedBy?.includes(user._id)) {
                return true;
            }
        }

        if (child.secretListItems) {
            for (let i = 0; i < child.secretListItems.length; i++) {
                if (child.secretListItems[i].selectedBy?.includes(user._id)) {
                    return true;
                }
            }
        }
        return false;
    };

    return (
        <li className='listPreviewCard-body-child'>
            <span className='listPreviewCard-body-child-name'>{child.groupName}</span>
            <div className='listPreviewCard-body-child-selection'>{hasSelectedItem() ? '- Gift selected' : ''}</div>
        </li>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps)(GiftGroupPreviewCardChild);
