import React, { Fragment } from 'react';
import { TbasicListFields, TgiftGroupFields, TgiftListFieldsCensored } from '../../../../../types/models/listGroups';
import ListTitleBarMenuButton from './ListTitleBarMenuButton';

interface Props {
    currentList: TgiftListFieldsCensored | TbasicListFields | TgiftGroupFields;
}

const ListTitleBar: React.FC<Props> = ({ currentList }) => {
    return (
        <Fragment>
            <ul className='ListTitleBar'>
                <li className='ListTitleBar-title groupName'>{currentList.groupName}</li>
                <ListTitleBarMenuButton currentList={currentList}></ListTitleBarMenuButton>
                <hr className='ListTitleBar-hr'></hr>
            </ul>
        </Fragment>
    );
};
export default ListTitleBar;
