import React from 'react';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    submitForm: () => void;
}

const OverlayButtons: React.FC<Props> = ({ setOpen, submitForm }) => {
    return (
        <div className='overlayContainer-buttons'>
            <span className='btn-simple' onClick={() => submitForm()}>
                Confirm
            </span>
            <span className='btn-simple' onClick={() => setOpen(false)}>
                Cancel
            </span>
        </div>
    );
};

export default OverlayButtons;
