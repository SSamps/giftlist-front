import { Fragment } from 'react';

interface Props {
    removeInvitee: (index: number) => void;
    email: string;
    index: number;
}

export const InviteElement: React.FC<Props> = ({ index, removeInvitee, email }) => {
    return (
        <Fragment>
            <span className='inviteeElement'>
                <span className='inviteeElement-remove'>
                    <i className='fas fa-times' onClick={() => removeInvitee(index)}></i>
                </span>
                <span className='inviteeElement-email'>{email} </span>
            </span>
        </Fragment>
    );
};
