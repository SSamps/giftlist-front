import React, { Fragment } from 'react';
import NewListButton from './actions/NewListButton';
import ListOwnershipButton from './filters/listOwnership/ListOwnershipButton';
import ListTypeButton from './filters/listType/ListTypeButton';

const YourListsToolbar: React.FC = () => {
    return (
        <Fragment>
            <div className='dashboardFilterControlBar'>
                <NewListButton></NewListButton>
                <span className='dashboardFilterControlBar-filters'>
                    <ListOwnershipButton></ListOwnershipButton>
                    <ListTypeButton></ListTypeButton>
                </span>
            </div>
        </Fragment>
    );
};

export default YourListsToolbar;
