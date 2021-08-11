import React, { Fragment } from 'react';
import DropdownUnderlay from '../../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RenameListOverlay: React.FC<Props> = ({ setOpen }) => {
    return (
        <Fragment>
            <div className='basicListOverlay'>
                <div className='basicListDeleteItemsOverlayContainer'>Rename list</div>
            </div>
            <DropdownUnderlay setOpen={setOpen} extraClasses={'underlay-focus'}></DropdownUnderlay>
        </Fragment>
    );
};

export default RenameListOverlay;
