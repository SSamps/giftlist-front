import React from 'react';

interface props {}

const DevWarning: React.FC<props> = () => {
    return (
        <div className='registerDevWarning'>
            <div className='large'>Warning</div>
            <div>This is a personal project</div>
            <div>
                Your data could be wiped at any time without warning and there may be undiscovered security
                vulnerabilities
            </div>
            <div>Use at your own risk</div>
        </div>
    );
};

export default DevWarning;
