import React, { Fragment, useState } from 'react';
import validator from 'validator';
import { InviteElement } from '../../newList/content/listForms.tsx/InviteElement';

interface Props {
    inviteArray: string[];
    setInviteArray: React.Dispatch<React.SetStateAction<string[]>>;
}

const InviteFormInput: React.FC<Props> = ({ inviteArray, setInviteArray }) => {
    const [invitee, setinvitee] = useState('');

    const [inviteFormErrorData, setInviteFormErrorData] = useState({
        invalidEmail: false,
        duplicateEmail: false,
    });

    const { invalidEmail, duplicateEmail } = inviteFormErrorData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setinvitee(e.target.value);
    };

    const removeInvitee = (removalIndex: number) => {
        let newInviteArray = inviteArray.filter((_, index) => {
            return index !== removalIndex;
        });
        setInviteArray(newInviteArray);
    };

    const addInvitee = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (invitee.length > 1) {
                if (!validator.isEmail(invitee)) {
                    setInviteFormErrorData({ ...inviteFormErrorData, invalidEmail: true });
                } else if (inviteArray.includes(invitee)) {
                    setInviteFormErrorData({ ...inviteFormErrorData, duplicateEmail: true });
                } else {
                    setInviteFormErrorData({ ...inviteFormErrorData, invalidEmail: false, duplicateEmail: false });
                    let newInviteArray = [...inviteArray];
                    newInviteArray.push(invitee);
                    setInviteArray(newInviteArray);
                    setinvitee('');
                }
            }
        }
    };

    return (
        <Fragment>
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
        </Fragment>
    );
};

export default InviteFormInput;
