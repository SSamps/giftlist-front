import React, { Fragment } from 'react';
import DropdownUnderlay from '../../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InviteMembersOverlay: React.FC<Props> = ({ setOpen }) => {
    return (
        <Fragment>
            <div className='overlay'>
                <div className='overlayContainer'>Invite members</div>
            </div>
            <DropdownUnderlay setOpen={setOpen} extraClasses={'underlay-focus'}></DropdownUnderlay>
        </Fragment>
    );
};

export default InviteMembersOverlay;
