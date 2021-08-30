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

    if (invitee.length < 1 && (invalidEmail || duplicateEmail)) {
        setInviteFormErrorData({
            invalidEmail: false,
            duplicateEmail: false,
        });
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setinvitee(e.target.value);
    };

    const removeInvitee = (removalIndex: number) => {
        let newInviteArray = inviteArray.filter((_, index) => {
            return index !== removalIndex;
        });
        setInviteArray(newInviteArray);
    };

    const addInvitee = () => {
        if (invitee.length > 0) {
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
    };

    const handleSpecialInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === ';') {
            e.preventDefault();
            addInvitee();
        }
    };

    return (
        <Fragment>
            <div className='form'>
                <div className='form-group'>
                    <label>
                        Invite others to your group
                        <div className='newListFormInviteeContainer'>
                            {inviteArray.length > 0 ? (
                                inviteArray.map((email, index) => {
                                    return (
                                        <InviteElement
                                            key={index}
                                            index={index}
                                            removeInvitee={removeInvitee}
                                            email={email}
                                        ></InviteElement>
                                    );
                                })
                            ) : (
                                <span className='system'>none</span>
                            )}
                        </div>
                        <div className='form-group-inputContainerWithSideControls'>
                            <input
                                type='text'
                                placeholder='Email'
                                name='invitee'
                                value={invitee}
                                onChange={onChange}
                                onKeyDown={handleSpecialInput}
                            />
                            <i className='fas fa-plus btn-simple' onClick={addInvitee}></i>
                        </div>
                    </label>
                    {invalidEmail && <div className='form-error-message'>Please supply a valid email</div>}
                    {duplicateEmail && <div className='form-error-message'>You have already added this person</div>}
                </div>
            </div>
        </Fragment>
    );
};

export default InviteFormInput;
