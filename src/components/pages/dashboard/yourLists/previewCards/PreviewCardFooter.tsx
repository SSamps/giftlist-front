import React from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthedUnknownListLoaded } from '../../../../../redux/reducers/root/rootReducer';
import {
    IbasicListMember,
    IgiftGroupChildMember,
    IgiftGroupMember,
    IgiftListMember,
    TbasicListFields,
    TgiftGroupChildFieldsCensored,
    TgiftGroupFields,
    TgiftListFieldsCensored,
} from '../../../../../types/models/listGroups';
import { IUser } from '../../../../../types/models/User';

interface props {
    owner: IbasicListMember | IgiftListMember | IgiftGroupMember | IgiftGroupChildMember | null;
    user: IUser;
    list: TbasicListFields | TgiftListFieldsCensored | TgiftGroupFields | TgiftGroupChildFieldsCensored;
}

const PreviewCardFooter: React.FC<props> = ({ owner, user, list }) => {
    return (
        <div className='listPreviewCard-footer'>
            <ul>
                <li className='listPreviewCard-footer-row'>
                    <i className='fas fa-crown listPreviewCard-footer-row-icon'></i> Owned by{' '}
                    {owner?.userId === user._id ? 'you' : owner?.displayName}
                </li>
                {list.members.length > 1 ? (
                    <li className='listPreviewCard-footer-row'>
                        <i className='fas fa-users listPreviewCard-footer-row-icon'></i>{' '}
                        <span>{list.members.length} members</span>
                    </li>
                ) : (
                    <li className='listPreviewCard-footer-row'>
                        <i className='fas fa-user listPreviewCard-footer-row-icon'></i>{' '}
                        <span>{list.members.length} member</span>
                    </li>
                )}
            </ul>
        </div>
    );
};

const mapStateToProps = (state: IrootStateAuthedUnknownListLoaded) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps)(PreviewCardFooter);
