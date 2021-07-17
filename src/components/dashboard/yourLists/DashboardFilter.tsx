import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const YourListsToolbar: React.FC = () => {
    return (
        <Fragment>
            <div className='dashboardFilterContainer'>
                <span className='dashboardFilterContainer-newList'>
                    <Link to='/list/variants' className='dashboardFilterContainer-item'>
                        {' '}
                        <i className='fas fa-plus'></i> Add a new list
                    </Link>
                </span>
                <span className='dashboardFilterContainer-filters'>
                    <span className='dashboardFilterContainer-item'>Ownership filter </span>
                    <span className='dashboardFilterContainer-item'>Type filter </span>
                    <span className='dashboardFilterContainer-item'>Sorting method </span>
                </span>
                <hr className='dashboardFilterContainer-hr'></hr>
            </div>
        </Fragment>
    );
};
