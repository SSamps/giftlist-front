import { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthedUnknownListLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { PERM_GROUP_DELETE, PERM_GROUP_OWNER, PERM_GROUP_RENAME } from '../../../../../types/listGroupPermissions';
import { LIST_GROUP_ALL_TOP_LEVEL_VARIANTS, LIST_GROUP_PARENT_VARIANTS } from '../../../../../types/listVariants';
import { IbasicListMember, IgiftGroupMember, IgiftListMember } from '../../../../../types/models/listGroups';
import DropdownUnderlay from '../../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRenameGroupOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setInviteMembersOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setLeaveGroupOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setDeleteGroupOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    showOverlay: (overlayStatusSetter: React.Dispatch<React.SetStateAction<boolean>>) => void;
    currentListUser: IbasicListMember | IgiftListMember | IgiftGroupMember;
    currentListVariant: string;
}

const ListTitleBarMenuDropdown: React.FC<Props> = ({
    setOpen,
    setRenameGroupOverlayStatus,
    setInviteMembersOverlayStatus,
    setDeleteGroupOverlayStatus,
    setLeaveGroupOverlayStatus,
    showOverlay,
    currentListUser,
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
        let renderDelete = currentListUser.permissions.includes(PERM_GROUP_DELETE);
        let renderLeave =
            !currentListUser.permissions.includes(PERM_GROUP_OWNER) &&
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
                {currentListUser.permissions.includes(PERM_GROUP_RENAME) && (
                    <div className={`dropDownItem`} onClick={showRenameGroupOverlay}>
                        {LIST_GROUP_PARENT_VARIANTS.includes(currentListVariant) ? 'Rename Group' : 'Rename List'}
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

const mapStateToProps = (state: IrootStateAuthedUnknownListLoaded) => ({
    user: state.authReducer.user,
    currentListUser: state.listGroupReducer.currentListUser,
});

export default connect(mapStateToProps)(ListTitleBarMenuDropdown);
