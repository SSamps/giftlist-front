import React, { Fragment } from 'react';
import NewListButton from './actions/NewListButton';
import ListOwnershipButton from './filters/ListOwnershipButton';
import ListTypeButton from './filters/ListTypeButton';

export const YourListsToolbar: React.FC = () => {
    return (
        <Fragment>
            <div className='dashboardFilterContainer'>
                <NewListButton></NewListButton>
                <span className='dashboardFilterContainer-filters'>
                    <ListOwnershipButton></ListOwnershipButton>
                    <ListTypeButton></ListTypeButton>
                </span>
                <hr className='dashboardFilterContainer-hr'></hr>
            </div>
        </Fragment>
    );
};
