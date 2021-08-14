import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { TbasicListFields, TgiftListFields } from '../../../../../types/models/listGroups';
import OverlayButtons from '../../../../misc/OverlayButtons';
import Spinner from '../../../../misc/spinner';
import DropdownUnderlay from '../../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';
import InviteFormInput from '../InviteFormInput';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentList: TgiftListFields | TbasicListFields;
}

const MembersOverlay: React.FC<Props> = ({ setOpen, currentList }) => {
    const [inviteArray, setInviteArray] = useState<string[]>([]);
    const [submitState, setSubmitState] = useState({ loading: false, completed: false, error: '' });
    const { loading, completed, error } = submitState;

    const submitForm = async () => {
        setSubmitState({ ...submitState, loading: true, error: '' });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const inviteBody = JSON.stringify({ invitedEmails: inviteArray });
        try {
            await axios.post(`/api/groups/${currentList._id}/invite/send`, inviteBody, config);
            setSubmitState({ loading: false, completed: true, error: '' });
        } catch (err) {
            setSubmitState({ loading: false, completed: false, error: err.response.data });
        }
    };

    return (
        <Fragment>
            <div className='overlay'>
                <div className='overlayContainer'>
                    <span className='lead'>Members</span>
                    <div></div>
                    <InviteFormInput inviteArray={inviteArray} setInviteArray={setInviteArray}></InviteFormInput>
                    {loading ? (
                        <Spinner className='spinner-tiny'></Spinner>
                    ) : error ? (
                        <div>{console.log(error)}Error</div>
                    ) : completed ? (
                        <div>Invite sent</div>
                    ) : (
                        <OverlayButtons setOpen={setOpen} submitForm={submitForm}></OverlayButtons>
                    )}
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen} extraClasses={'underlay-focus'}></DropdownUnderlay>
        </Fragment>
    );
};

export default MembersOverlay;
