import React, { useState } from 'react';
import { formatJoinDate } from '../../../misc/helperFunctions';
import ConfirmationOverlay from '../../misc/overlays/ConfirmationOverlay';
import ProfileRow from './ProfileRow';
import RenameUserOverlay from './RenameUserOverlay';
import { sendDeleteUserRequest, useAuth } from '../../../state/AuthState';
import { Navigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const Profile: React.FC = () => {
    const [changeNameOverlayStatus, setChangeNameOverlayStatus] = useState(false);
    const [deleteAccountOverlayStatus, setDeleteAccountOverlayStatus] = useState(false);
    const { getAuthedUser, setUser, setToken } = useAuth();
    const user = getAuthedUser();

    const deleteAccountMutation = useMutation({
        mutationFn: sendDeleteUserRequest,
        onSuccess: () => {
            setToken(null);
            setUser(null);
        },
        onError: (err: any) => {
            // TODO handle error
        },
    });

    // Should be caught by PrivateRoute
    if (!user) {
        console.error('Accessed profile page without a user');
        return <Navigate to='/login'></Navigate>;
    }

    const joinedDate = formatJoinDate(user.registrationDate);

    const deleteAccount = async () => {
        deleteAccountMutation.mutate();
    };

    const renderOverlays = () => {
        if (changeNameOverlayStatus) {
            return <RenameUserOverlay setOpen={setChangeNameOverlayStatus} user={user}></RenameUserOverlay>;
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
            <div className='profileNameContainer text-lead'>{user.displayName}</div>
            <div className='profileBodyContainer'>
                <div className='profileSection-container'>
                    <div className='profileSection-label text-header'>Info</div>
                    <div className='profileSection-body'>
                        <ProfileRow label='Member since' body={joinedDate}></ProfileRow>
                    </div>
                </div>
                <div className='profileSection-container'>
                    <div className='profileSection-label text-header'>Settings</div>
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
                    <div className='profileSection-label text-header'>Danger Zone</div>
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

export default Profile;
