import React, { Fragment } from 'react';

const BasicListDeleteItems: React.FC = () => {
    return (
        <Fragment>
            <div className='basicListDeleteItemsContainer'>
                <span className='basicListDeleteItemsContainer-button'>
                    <span className='btn-simple'>Delete selected</span>
                </span>
                <span className='basicListDeleteItemsContainer-button'>
                    <span className='btn-simple'>Delete all</span>
                </span>
            </div>
        </Fragment>
    );
};

export default BasicListDeleteItems;
