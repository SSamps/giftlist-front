import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteAccountActionCreator, TdeleteAccountActionCreator } from '../../../redux/actions/authActions';
import { IrootStateAuthed } from '../../../redux/reducers/root/rootReducer';
import { IUser } from '../../../types/models/User';
import { formatJoinDate } from '../../../utils/helperFunctions';
import ConfirmationOverlay from '../../misc/overlays/ConfirmationOverlay';
import ProfileRow from './ProfileRow';
import RenameUserOverlay from './RenameUserOverlay';

interface props {
    user: IUser;
    deleteAccountActionCreator: TdeleteAccountActionCreator;
}

const Profile: React.FC<props> = ({ user, deleteAccountActionCreator }) => {
    const [changeNameOverlayStatus, setChangeNameOverlayStatus] = useState(false);
    const [deleteAccountOverlayStatus, setDeleteAccountOverlayStatus] = useState(false);

    const joinedDate = formatJoinDate(user.registrationDate);

    const deleteAccount = async () => {
        return await deleteAccountActionCreator();
    };

    const renderOverlays = () => {
        if (changeNameOverlayStatus) {
            return <RenameUserOverlay setOpen={setChangeNameOverlayStatus}></RenameUserOverlay>;
        } else if (deleteAccountOverlayStatus) {
            return (
                <ConfirmationOverlay
                    setOpen={setDeleteAccountOverlayStatus}
                    submitForm={deleteAccount}
                    description={'Are you sure you want to delete your account?'}
                    danger={true}
                ></ConfirmationOverlay>
            );
        }
    };

    return (
        <div className='profileContainer'>
            {renderOverlays()}
            <div className='profileNameContainer title'>{user.displayName}</div>
            <div className='profileBodyContainer'>
                <div className='profileSection-container'>
                    <div className='profileSection-label lead'>Info</div>
                    <div className='profileSection-body'>
                        <ProfileRow label='Member since' body={joinedDate}></ProfileRow>
                    </div>
                </div>
                <div className='profileSection-container'>
                    <div className='profileSection-label lead'>Settings</div>
                    <div className='profileSection-body'>
                        <ProfileRow
                            label='Display name'
                            body='Change what your name appears as throughout the app'
                            controlLabel='Change display name'
                            controlAction={setChangeNameOverlayStatus}
                        ></ProfileRow>
                    </div>
                </div>
                <div className='profileSection-container'>
                    <div className='profileSection-label lead'>Danger</div>
                    <div className='profileSection-body profileSection-body-danger'>
                        <ProfileRow
                            label='Delete account'
                            body='Delete your account, all lists you own and any lists inside your Gift Groups. '
                            controlLabel='Delete account'
                            controlAction={setDeleteAccountOverlayStatus}
                            danger={true}
                        ></ProfileRow>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps, { deleteAccountActionCreator })(Profile);
