import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { deleteListActionCreator, TdeleteListActionCreator } from '../../../../redux/actions/listGroupActions';
import { TbasicListFields, TgiftListFields } from '../../../../types/models/listGroups';
import ConfirmationOverlay from '../../../misc/ConfirmationOverlay';
import InviteMembersOverlay from './ListMenuOverlays.tsx/InviteMembersOverlay';
import RenameListOverlay from './ListMenuOverlays.tsx/RenameListOverlay';
import ListTitleBarMenuDropdown from './ListTitleBarMenuDropdown';
import { useHistory } from 'react-router-dom';

interface Props {
    currentList: TgiftListFields | TbasicListFields;
    deleteListActionCreator: TdeleteListActionCreator;
}

const ListTitleBarMenuButton: React.FC<Props> = ({ deleteListActionCreator, currentList }) => {
    const history = useHistory();
    const [openDropdown, setOpenDropdown] = useState(false);
    const [renameGroupOverlayStatus, setRenameGroupOverlayStatus] = useState(false);
    const [inviteMembersOverlayStatus, setInviteMembersOverlayStatus] = useState(false);
    const [deleteGroupOverlayStatus, setDeleteGroupOverlayStatus] = useState(false);

    const showOverlay = (overlayStatusSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setOpenDropdown(false);
        overlayStatusSetter(true);
    };

    const deleteList = async () => {
        await deleteListActionCreator(currentList._id.toString());
        history.push(`/dashboard`);
    };

    const renderOverlay = () => {
        return (
            <Fragment>
                {renameGroupOverlayStatus ? (
                    <RenameListOverlay setOpen={setRenameGroupOverlayStatus}></RenameListOverlay>
                ) : inviteMembersOverlayStatus ? (
                    <InviteMembersOverlay setOpen={setInviteMembersOverlayStatus}></InviteMembersOverlay>
                ) : (
                    deleteGroupOverlayStatus && (
                        <ConfirmationOverlay
                            setOpen={setDeleteGroupOverlayStatus}
                            submitForm={deleteList}
                            description='Are you sure you want to delete this list?'
                        ></ConfirmationOverlay>
                    )
                )}
            </Fragment>
        );
    };

    return (
        <Fragment>
            <li className={`ListTitleBar-controls ${openDropdown && 'ListTitleBar-controls-active'}`}>
                <span>
                    <i
                        className='fas fa-ellipsis-v'
                        onClick={() => {
                            setOpenDropdown(!openDropdown);
                        }}
                    ></i>
                </span>
                {openDropdown && (
                    <ListTitleBarMenuDropdown
                        setOpen={setOpenDropdown}
                        showOverlay={showOverlay}
                        setRenameGroupOverlayStatus={setRenameGroupOverlayStatus}
                        setInviteMembersOverlayStatus={setInviteMembersOverlayStatus}
                        setDeleteGroupOverlayStatus={setDeleteGroupOverlayStatus}
                    ></ListTitleBarMenuDropdown>
                )}
            </li>
            {renderOverlay()}
        </Fragment>
    );
};

export default connect(null, { deleteListActionCreator })(ListTitleBarMenuButton);
