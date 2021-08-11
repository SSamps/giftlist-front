import React, { Fragment } from 'react';
import DropdownUnderlay from '../../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    submitForm: () => void;
    description: string;
}

const BasicListDeletionOverlay: React.FC<Props> = ({ setOpen, submitForm, description }) => {
    return (
        <Fragment>
            <div className='basicListOverlay'>
                <div className='basicListDeleteItemsOverlayContainer'>
                    <div className='lead'>{description}</div>
                    <div className='basicListDeleteItemsOverlayContainer-buttons'>
                        <span className='btn-simple' onClick={() => submitForm()}>
                            Confirm
                        </span>
                        <span className='btn-simple' onClick={() => setOpen(false)}>
                            Cancel
                        </span>
                    </div>
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen} classes={'underlay underlay-focus'}></DropdownUnderlay>
        </Fragment>
    );
};

export default BasicListDeletionOverlay;
