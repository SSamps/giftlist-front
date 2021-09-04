import React from 'react';
import { useState } from 'react';
import { TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../../../types/listVariants';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FormSubmissionStatus } from './FormSubmissionStatus';
import InviteFormInput from '../../../lists/miscShared/InviteFormInput';
import { VALIDATION_GROUP_NAME_MAX_LENGTH } from '../../../../../misc/validation';

interface Props {
    controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS;
}

const NewListForm: React.FC<Props> = ({ controllerState }) => {
    const [formData, setFormData] = useState({
        listName: '',
    });

    const [inviteArray, setInviteArray] = useState<string[]>([]);

    const [formErrorData, setFormErrorData] = useState({
        emptylistName: false,
    });

    const [formSubmitStatus, setFormSubmitStatus] = useState({
        creatingList: false,
        invitingMembers: false,
        submitError: undefined,
    });

    const history = useHistory();

    let { listName } = formData;
    let { emptylistName } = formErrorData;
    let { creatingList, invitingMembers, submitError } = formSubmitStatus;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (listName.length <= 0) {
                setFormErrorData({ ...formErrorData, emptylistName: true });
            } else {
                setFormErrorData({ ...formErrorData, emptylistName: false });
                const form = (e.target as HTMLInputElement).form as HTMLFormElement;
                const index = Array.prototype.indexOf.call(form, e.target);
                const nextElement = form.elements[index + 1] as HTMLElement;
                nextElement.focus();
            }
        }
    };

    const createList = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const createListBody = JSON.stringify({ groupVariant: controllerState, groupName: listName });

        try {
            setFormSubmitStatus({ creatingList: true, invitingMembers: false, submitError: undefined });
            const listCreationRes = await axios.post('/api/groups', createListBody, config);
            const newListId = listCreationRes.data._id;
            if (inviteArray.length > 0) {
                const inviteBody = JSON.stringify({ invitedEmails: inviteArray });

                setFormSubmitStatus({ creatingList: false, invitingMembers: true, submitError: undefined });
                await axios.post(`/api/groups/${newListId}/invite/send`, inviteBody, config);
            }
            history.push(`/list/${newListId}`);
        } catch (err) {
            setFormSubmitStatus({ creatingList: false, invitingMembers: false, submitError: err.response.status });
        }
    };

    return (
        <div className='newListFormContainer-inner'>
            {creatingList ? (
                <FormSubmissionStatus>Creating a new list</FormSubmissionStatus>
            ) : invitingMembers ? (
                <FormSubmissionStatus>Inviting members</FormSubmissionStatus>
            ) : (
                <form className='form'>
                    <div className='form-group'>
                        <label>
                            List Name
                            <input
                                type='text'
                                placeholder='List name'
                                name='listName'
                                value={listName}
                                onChange={onChange}
                                onKeyDown={nextInput}
                                maxLength={VALIDATION_GROUP_NAME_MAX_LENGTH}
                            />
                        </label>
                        {emptylistName && <div className='form-error-message'>You must provide a name</div>}
                    </div>
                    <InviteFormInput inviteArray={inviteArray} setInviteArray={setInviteArray}></InviteFormInput>
                    <input type='button' className='btn-block' value='Create group' onClick={createList} />
                    {submitError && <div className='form-error-message'>{submitError}</div>}
                </form>
            )}
        </div>
    );
};

export default NewListForm;
