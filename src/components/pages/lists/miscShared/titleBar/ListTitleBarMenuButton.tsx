import { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import MembersOverlay from './ListMenuOverlays.tsx/MembersOverlay';
import ListTitleBarMenuDropdown from './ListTitleBarMenuDropdown';
import { useHistory } from 'react-router-dom';
import { TbasicListFields, TgiftGroupFields, TgiftListFieldsCensored } from '../../../../../types/models/listGroups';
import {
    deleteListActionCreator,
    leaveListActionCreator,
    TdeleteListActionCreator,
    TleaveListActionCreator,
} from '../../../../../redux/actions/listGroupActions';
import ConfirmationOverlay from '../../../../misc/overlays/ConfirmationOverlay';
import RenameListOverlay from './ListMenuOverlays.tsx/RenameListOverlay';

interface Props {
    currentList: TgiftListFieldsCensored | TbasicListFields | TgiftGroupFields;
    deleteListActionCreator: TdeleteListActionCreator;
    leaveListActionCreator: TleaveListActionCreator;
}

const ListTitleBarMenuButton: React.FC<Props> = ({ deleteListActionCreator, leaveListActionCreator, currentList }) => {
    const history = useHistory();
    const [openDropdown, setOpenDropdown] = useState(false);
    const [renameGroupOverlayStatus, setRenameGroupOverlayStatus] = useState(false);
    const [inviteMembersOverlayStatus, setInviteMembersOverlayStatus] = useState(false);
    const [leaveGroupOverlayStatus, setLeaveGroupOverlayStatus] = useState(false);
    const [deleteGroupOverlayStatus, setDeleteGroupOverlayStatus] = useState(false);

    const showOverlay = (overlayStatusSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setOpenDropdown(false);
        overlayStatusSetter(true);
    };

    const deleteList = async () => {
        const success = await deleteListActionCreator(currentList._id.toString());
        success && history.push(`/dashboard`);
    };

    const leaveList = async () => {
        const success = await leaveListActionCreator(currentList._id.toString());
        success && history.push(`/dashboard`);
    };

    const renderOverlay = () => {
        if (renameGroupOverlayStatus) {
            return (
                <RenameListOverlay setOpen={setRenameGroupOverlayStatus} currentList={currentList}></RenameListOverlay>
            );
        } else if (inviteMembersOverlayStatus) {
            return <MembersOverlay setOpen={setInviteMembersOverlayStatus} currentList={currentList}></MembersOverlay>;
        } else if (deleteGroupOverlayStatus) {
            return (
                <ConfirmationOverlay
                    setOpen={setDeleteGroupOverlayStatus}
                    submitForm={deleteList}
                    description='Are you sure you want to delete this group?'
                    danger={true}
                ></ConfirmationOverlay>
            );
        } else if (leaveGroupOverlayStatus) {
            return (
                <ConfirmationOverlay
                    setOpen={setLeaveGroupOverlayStatus}
                    submitForm={leaveList}
                    description='Are you sure you want to leave this group?'
                    danger={true}
                ></ConfirmationOverlay>
            );
        } else {
            return null;
        }
    };

    return (
        <Fragment>
            <li
                className={`ListTitleBar-controls ${openDropdown && 'ListTitleBar-controls-active'}`}
                onClick={() => {
                    setOpenDropdown(!openDropdown);
                }}
            >
                <span>
                    <i className='fas fa-ellipsis-v'></i>
                </span>
                {openDropdown && (
                    <ListTitleBarMenuDropdown
                        setOpen={setOpenDropdown}
                        showOverlay={showOverlay}
                        setRenameGroupOverlayStatus={setRenameGroupOverlayStatus}
                        setInviteMembersOverlayStatus={setInviteMembersOverlayStatus}
                        setDeleteGroupOverlayStatus={setDeleteGroupOverlayStatus}
                        setLeaveGroupOverlayStatus={setLeaveGroupOverlayStatus}
                        currentListVariant={currentList.groupVariant}
                    ></ListTitleBarMenuDropdown>
                )}
            </li>
            {renderOverlay()}
        </Fragment>
    );
};

export default connect(null, { deleteListActionCreator, leaveListActionCreator })(ListTitleBarMenuButton);
