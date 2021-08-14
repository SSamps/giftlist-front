import { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthed } from '../../../../redux/reducers/root/rootReducer';
import { TbasicListFields, TgiftListFields } from '../../../../types/models/listGroups';
import { IUser } from '../../../../types/models/User';
import DropdownUnderlay from '../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRenameGroupOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setInviteMembersOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setLeaveGroupOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setDeleteGroupOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    showOverlay: (overlayStatusSetter: React.Dispatch<React.SetStateAction<boolean>>) => void;
    user: IUser;
    currentList: TgiftListFields | TbasicListFields;
}

const ListTitleBarMenuDropdown: React.FC<Props> = ({
    setOpen,
    setRenameGroupOverlayStatus,
    setInviteMembersOverlayStatus,
    setDeleteGroupOverlayStatus,
    setLeaveGroupOverlayStatus,
    showOverlay,
}) => {
    const showRenameGroupOverlay = () => {
        showOverlay(setRenameGroupOverlayStatus);
    };
    const showInviteMembersOverlay = () => {
        showOverlay(setInviteMembersOverlayStatus);
    };
    const showLeaveGroupOverlay = () => {
        showOverlay(setLeaveGroupOverlayStatus);
    };
    const showDeleteGroupOverlay = () => {
        showOverlay(setDeleteGroupOverlayStatus);
    };

    return (
        <Fragment>
            <div className='dropDown dropDown-leftCover'>
                <div className={`dropDownItem`} onClick={showRenameGroupOverlay}>
                    Rename Group
                </div>
                <div className={`dropDownItem`} onClick={showInviteMembersOverlay}>
                    Members
                </div>
                <div className='dropDownItem-danger'>
                    <div className='dropDownItem ' onClick={showLeaveGroupOverlay}>
                        Leave Group
                    </div>
                    <div className='dropDownItem ' onClick={showDeleteGroupOverlay}>
                        Delete Group
                    </div>
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen}></DropdownUnderlay>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps)(ListTitleBarMenuDropdown);
