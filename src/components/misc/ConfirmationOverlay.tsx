import React, { Fragment } from 'react';
import DropdownUnderlay from '../pages/dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    submitForm: () => void;
    description: string;
}

const ConfirmationOverlay: React.FC<Props> = ({ setOpen, submitForm, description }) => {
    return (
        <Fragment>
            <div className='overlay'>
                <div className='overlayContainer'>
                    <div className='lead'>{description}</div>
                    <div className='overlayContainer-buttons'>
                        <span className='btn-simple' onClick={() => submitForm()}>
                            Confirm
                        </span>
                        <span className='btn-simple' onClick={() => setOpen(false)}>
                            Cancel
                        </span>
                    </div>
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen} extraClasses={'underlay-focus'}></DropdownUnderlay>
        </Fragment>
    );
};

export default ConfirmationOverlay;
