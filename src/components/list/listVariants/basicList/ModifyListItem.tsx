import React, { Fragment } from 'react';
import DropdownUnderlay from '../../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setModifyOverlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModifyListItem: React.FC<Props> = ({ setModifyOverlayStatus }) => {
    return (
        <Fragment>
            <div className='basicListModifyItemOverlay'></div>
            <DropdownUnderlay setOpen={setModifyOverlayStatus}></DropdownUnderlay>
        </Fragment>
    );
};

export default ModifyListItem;
