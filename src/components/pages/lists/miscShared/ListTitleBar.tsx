import React, { Fragment } from 'react';
import { TbasicListFields, TgiftListFields } from '../../../../types/models/listGroups';
import ListTitleBarMenuButton from './ListTitleBarMenuButton';

interface Props {
    currentList: TgiftListFields | TbasicListFields;
}

const ListTitleBar: React.FC<Props> = ({ currentList }) => {
    return (
        <Fragment>
            <ul className='ListTitleBar'>
                <li className='ListTitleBar-title lead'>{currentList.groupName}</li>
                <ListTitleBarMenuButton currentList={currentList}></ListTitleBarMenuButton>
                <hr className='ListTitleBar-hr'></hr>
            </ul>
        </Fragment>
    );
};
export default ListTitleBar;
