import { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthed } from '../../../../redux/reducers/root/rootReducer';
import { PERM_GROUP_ADMIN, PERM_GROUP_DELETE } from '../../../../types/listGroupPermissions';
import DropdownUnderlay from '../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRenameGroupOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setInviteMembersOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setLeaveGroupOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setDeleteGroupOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    showOverlay: (overlayStatusSetter: React.Dispatch<React.SetStateAction<boolean>>) => void;
    currentListPermissions: string[] | undefined;
}

const ListTitleBarMenuDropdown: React.FC<Props> = ({
    setOpen,
    setRenameGroupOverlayStatus,
    setInviteMembersOverlayStatus,
    setDeleteGroupOverlayStatus,
    setLeaveGroupOverlayStatus,
    showOverlay,
    currentListPermissions,
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
            <div className='listMenuDropDown listMenuDropDown-leftCover '>
                {currentListPermissions?.includes(PERM_GROUP_ADMIN) && (
                    <div className={`dropDownItem`} onClick={showRenameGroupOverlay}>
                        Rename Group
                    </div>
                )}
                <div className={`dropDownItem`} onClick={showInviteMembersOverlay}>
                    Members
                </div>
                <div className='dropDownItem-danger'>
                    {currentListPermissions?.includes(PERM_GROUP_DELETE) ? (
                        <div className='dropDownItem ' onClick={showDeleteGroupOverlay}>
                            Delete Group
                        </div>
                    ) : (
                        <div className='dropDownItem ' onClick={showLeaveGroupOverlay}>
                            Leave Group
                        </div>
                    )}
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen}></DropdownUnderlay>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    user: state.authReducer.user,
    currentListPermissions: state.listGroupReducer.currentListPermissions,
});

export default connect(mapStateToProps)(ListTitleBarMenuDropdown);
