import React from 'react';

interface props {
    error: any;
}

export const UncaughtError: React.FC<props> = () => {
    return (
        <div className='errorPageContainer'>
            <div className='errorPageError'>
                <div>
                    <div className='text-header'>oh no! Something went wrong!</div>
                    <div>...but we don't know what. The error has been reported so we can investigate.</div>
                </div>

                <div className='btn-simple'>
                    <a href={'/dashboard'}>Return to dashboard</a>
                </div>
            </div>
        </div>
    );
};

export default UncaughtError;
