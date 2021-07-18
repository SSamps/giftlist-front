import React, { Fragment } from 'react';
import NewListButton from './actions/NewListButton';
import ListOwnershipFilter from './filters/ListOwnershipFilter';
import ListTypeFilter from './filters/ListTypeFilter';

export const YourListsToolbar: React.FC = () => {
    return (
        <Fragment>
            <div className='dashboardFilterContainer'>
                <NewListButton></NewListButton>
                <span className='dashboardFilterContainer-filters'>
                    <ListOwnershipFilter></ListOwnershipFilter>
                    <ListTypeFilter></ListTypeFilter>
                </span>
                <hr className='dashboardFilterContainer-hr'></hr>
            </div>
        </Fragment>
    );
};
