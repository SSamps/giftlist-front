import { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthed } from '../../../../redux/reducers/root/rootReducer';
import { PERM_GROUP_DELETE, PERM_GROUP_OWNER, PERM_GROUP_RENAME } from '../../../../types/listGroupPermissions';
import { LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../../types/listVariants';
import DropdownUnderlay from '../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRenameGroupOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setInviteMembersOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setLeaveGroupOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setDeleteGroupOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    showOverlay: (overlayStatusSetter: React.Dispatch<React.SetStateAction<boolean>>) => void;
    currentListPermissions: string[] | undefined;
    currentListVariant: string;
}

const ListTitleBarMenuDropdown: React.FC<Props> = ({
    setOpen,
    setRenameGroupOverlayStatus,
    setInviteMembersOverlayStatus,
    setDeleteGroupOverlayStatus,
    setLeaveGroupOverlayStatus,
    showOverlay,
    currentListPermissions,
    currentListVariant,
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

    const renderDangerOptions = () => {
        let renderDelete = currentListPermissions?.includes(PERM_GROUP_DELETE);
        let renderLeave =
            !currentListPermissions?.includes(PERM_GROUP_OWNER) &&
            LIST_GROUP_ALL_TOP_LEVEL_VARIANTS.includes(currentListVariant);
        if (!renderDelete && !renderLeave) {
            return null;
        } else {
            return (
                <div className='dropDownItem-danger'>
                    {renderDelete ? (
                        <div className='dropDownItem ' onClick={showDeleteGroupOverlay}>
                            Delete Group
                        </div>
                    ) : (
                        renderLeave && (
                            <div className='dropDownItem ' onClick={showLeaveGroupOverlay}>
                                Leave Group
                            </div>
                        )
                    )}
                </div>
            );
        }
    };

    return (
        <Fragment>
            <div className='listMenuDropDown listMenuDropDown-leftCover '>
                {currentListPermissions?.includes(PERM_GROUP_RENAME) && (
                    <div className={`dropDownItem`} onClick={showRenameGroupOverlay}>
                        Rename Group
                    </div>
                )}
                <div className={`dropDownItem`} onClick={showInviteMembersOverlay}>
                    Members
                </div>
                {renderDangerOptions()}
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
