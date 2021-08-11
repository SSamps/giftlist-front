import React, { Fragment } from 'react';
import DropdownUnderlay from '../../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InviteMembersOverlay: React.FC<Props> = ({ setOpen }) => {
    return (
        <Fragment>
            <div className='basicListOverlay'>
                <div className='basicListDeleteItemsOverlayContainer'>Invite members</div>
            </div>
            <DropdownUnderlay setOpen={setOpen} extraClasses={'underlay-focus'}></DropdownUnderlay>
        </Fragment>
    );
};

export default InviteMembersOverlay;
