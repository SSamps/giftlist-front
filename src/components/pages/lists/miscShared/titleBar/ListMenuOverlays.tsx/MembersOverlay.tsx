import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addAlertThunkActionCreator, TaddAlertThunkActionCreator } from '../../../../../../redux/actions/alertActions';
import { TbasicListFields, TgiftListFields } from '../../../../../../types/models/listGroups';
import OverlayButtons from '../../../../../misc/overlays/OverlayButtons';
import Spinner from '../../../../../misc/spinner';
import DropdownUnderlay from '../../../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';
import InviteFormInput from '../../InviteFormInput';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentList: TgiftListFields | TbasicListFields;
    addAlertThunkActionCreator: TaddAlertThunkActionCreator;
}

const MembersOverlay: React.FC<Props> = ({ setOpen, currentList, addAlertThunkActionCreator }) => {
    const [inviteArray, setInviteArray] = useState<string[]>([]);
    const [inviteArrayError, setInviteArrayError] = useState('');
    const [submitState, setSubmitState] = useState({ loading: false, completed: false });
    const { loading, completed } = submitState;

    useEffect(() => {
        if (inviteArray.length > 0) {
            setInviteArrayError('');
        }
    }, [inviteArray]);

    const submitForm = async () => {
        if (inviteArray.length < 1) {
            setInviteArrayError('You must specify at least one invitee');
            return;
        }

        setSubmitState({ ...submitState, loading: true });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const inviteBody = JSON.stringify({ invitedEmails: inviteArray });
        try {
            await axios.post(`/api/groups/${currentList._id}/invite/send`, inviteBody, config);
            setSubmitState({ loading: false, completed: true });
        } catch (err) {
            addAlertThunkActionCreator('error', `${err.response.status} ${err.response.data}`);
            setSubmitState({ loading: false, completed: false });
        }
    };

    const renderCurrentMembers = () => {
        return currentList.members.map((member, index) => {
            return <span key={'member' + index}>{member.displayName}</span>;
        });
    };

    return (
        <Fragment>
            <div className='overlay'>
                <div className='overlayContainer'>
                    <span className='lead'>Members</span>
                    <div className='memberList'>{renderCurrentMembers()}</div>
                    <InviteFormInput inviteArray={inviteArray} setInviteArray={setInviteArray}></InviteFormInput>
                    {loading ? (
                        <Spinner className='spinner-tiny'></Spinner>
                    ) : completed ? (
                        <div>Invite sent</div>
                    ) : (
                        <OverlayButtons setOpen={setOpen} submitForm={submitForm}></OverlayButtons>
                    )}
                    {inviteArrayError && <div className='form-error-message'>{inviteArrayError}</div>}
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen} extraClasses={'underlay-focus'}></DropdownUnderlay>
        </Fragment>
    );
};

export default connect(null, { addAlertThunkActionCreator })(MembersOverlay);
