import { Fragment } from 'react';
import DropdownUnderlay from '../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRenameGroupOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setInviteMembersOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setDeleteGroupOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    showOverlay: (overlayStatusSetter: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

const ListTitleBarMenuDropdown: React.FC<Props> = ({
    setOpen,
    setRenameGroupOverlayStatus,
    setInviteMembersOverlayStatus,
    setDeleteGroupOverlayStatus,
    showOverlay,
}) => {
    const showRenameGroupOverlay = () => {
        showOverlay(setRenameGroupOverlayStatus);
    };
    const showInviteMembersOverlay = () => {
        showOverlay(setInviteMembersOverlayStatus);
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
                    <div className='dropDownItem ' onClick={showDeleteGroupOverlay}>
                        Delete Group
                    </div>
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen}></DropdownUnderlay>
        </Fragment>
    );
};

export default ListTitleBarMenuDropdown;
