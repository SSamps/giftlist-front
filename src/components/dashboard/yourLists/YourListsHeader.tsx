import React from 'react';

export const YourListsHeader: React.FC = () => {
    return (
        <div className={'smallContainer'}>
            <span>Your Lists </span>
            <span>Ownership filter </span>
            <span>Type filter </span>
            <span>Sorting method </span>
            <hr></hr>
        </div>
    );
};
