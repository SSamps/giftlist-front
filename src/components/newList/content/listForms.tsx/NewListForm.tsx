import React from 'react';
import { useState } from 'react';
import { TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../../types/listVariants';
import validator from 'validator';
import { InviteElement } from './InviteElement';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FormSubmissionStatus } from './FormSubmissionStatus';

interface Props {
    controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS;
}

interface IformState {
    listName: string;
    invitee: string;
    inviteArray: string[];
}

const NewListForm: React.FC<Props> = ({ controllerState }) => {
    const [formData, setFormData] = useState<IformState>({
        listName: '',
        invitee: '',
        inviteArray: [],
    });

    const [formErrorData, setFormErrorData] = useState({
        emptylistName: false,
        invalidEmail: false,
        duplicateEmail: false,
    });

    const [formSubmitStatus, setFormSubmitStatus] = useState({
        creatingList: false,
        invitingMembers: false,
        submitError: undefined,
    });

    const history = useHistory();

    let { listName, invitee, inviteArray } = formData;
    let { invalidEmail, emptylistName, duplicateEmail } = formErrorData;
    let { creatingList, invitingMembers, submitError } = formSubmitStatus;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addInvitee = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (invitee.length > 1) {
                if (!validator.isEmail(invitee)) {
                    setFormErrorData({ ...formErrorData, invalidEmail: true });
                } else if (inviteArray.includes(invitee)) {
                    setFormErrorData({ ...formErrorData, invalidEmail: true });
                } else {
                    setFormErrorData({ ...formErrorData, invalidEmail: false, duplicateEmail: false });
                    inviteArray.push(invitee);
                    setFormData({ ...formData, inviteArray: inviteArray, invitee: '' });
                }
            } else {
                setFormErrorData({ ...formErrorData, invalidEmail: false, duplicateEmail: false });
                createList();
            }
        }
    };

    const removeInvitee = (index: number) => {
        console.log(index);
        inviteArray.splice(index, 1);
        setFormData({ ...formData, inviteArray });
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

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
            if (inviteArray.length > 0) {
                setFormSubmitStatus({ creatingList: false, invitingMembers: true, submitError: undefined });
                // await axios.post('/api/users', body, config);
            }
            history.push(`/list/${listCreationRes.data._id}`);
            // return <Redirect to={`list/${listCreationRes.data._id}`} />;
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
                <form className='form' onSubmit={onSubmit}>
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
                            />
                        </label>
                        {emptylistName && <div className='form-error-message'>You must provide a name</div>}
                    </div>
                    <div className='form-group'>
                        <label>
                            Invite others to your group
                            {inviteArray.length > 0 && (
                                <div className='newListFormInviteeContainer'>
                                    {inviteArray.map((email, index) => {
                                        return (
                                            <InviteElement
                                                key={index}
                                                index={index}
                                                removeInvitee={removeInvitee}
                                                email={email}
                                            ></InviteElement>
                                        );
                                    })}
                                </div>
                            )}
                            <input
                                type='text'
                                placeholder='Email'
                                name='invitee'
                                value={invitee}
                                onChange={onChange}
                                onKeyDown={addInvitee}
                            />
                        </label>
                        {invalidEmail && <div className='form-error-message'>Please supply a valid email</div>}
                        {duplicateEmail && <div className='form-error-message'>You have already added this person</div>}
                    </div>
                    <input type='button' className='btn btn-primary' value='Create group' onClick={createList} />
                    {submitError && <div className='form-error-message'>{submitError}</div>}
                </form>
            )}
        </div>
    );
};

export default NewListForm;
