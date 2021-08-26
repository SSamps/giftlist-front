import React, { Fragment } from 'react';
import DropdownUnderlay from '../../pages/dashboard/yourLists/controlBar/filters/DropdownUnderlay';
import OverlayButtons from './OverlayButtons';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    submitForm: () => void;
    description: string;
    danger?: boolean;
}

const ConfirmationOverlay: React.FC<Props> = ({ setOpen, submitForm, description, danger }) => {
    return (
        <Fragment>
            <div className={`overlay ${danger ? 'overlay-danger' : ''}`}>
                <div className='overlayContainer'>
                    <div className='lead'>{description}</div>
                    <OverlayButtons submitForm={submitForm} setOpen={setOpen} danger={danger}></OverlayButtons>
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen} extraClasses={'underlay-focus'}></DropdownUnderlay>
        </Fragment>
    );
};

export default ConfirmationOverlay;
