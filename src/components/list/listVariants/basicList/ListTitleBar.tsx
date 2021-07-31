import React, { Fragment } from 'react';
import { TListGroupAnyFields } from '../../../../types/models/listGroups';

interface Props {
    currentList: TListGroupAnyFields;
}

const ListTitleBar: React.FC<Props> = ({ currentList }) => {
    return (
        <Fragment>
            <ul className='ListTitleBar'>
                <li className='ListTitleBar-title lead'>{currentList.groupName}</li>
                <li className='ListTitleBar-controls'>
                    <span>
                        <i className='fas fa-ellipsis-v'></i>
                    </span>
                </li>
                <hr className='ListTitleBar-hr'></hr>
            </ul>
        </Fragment>
    );
};
export default ListTitleBar;