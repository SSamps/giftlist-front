import { Fragment } from 'react';

interface Props {
    removeInvitee: (index: number) => void;
    email: string;
    index: number;
}

export const InviteElement: React.FC<Props> = ({ index, removeInvitee, email }) => {
    return (
        <Fragment>
            <div className='inviteeElement'>
                <span className='inviteeElement-email'>{email} </span>
                <span className='inviteeElement-remove'>
                    <i className='fas fa-times' onClick={() => removeInvitee(index)}></i>
                </span>
            </div>
        </Fragment>
    );
};
