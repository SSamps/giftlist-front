import React, { Fragment } from 'react';
import { useHistory } from 'react-router';
import { TbasicListFields, TgiftGroupFields, TgiftListFieldsCensored } from '../../../../../types/models/listGroups';
import ListTitleBarMenuButton from './ListTitleBarMenuButton';

interface Props {
    currentList: TgiftListFieldsCensored | TbasicListFields | TgiftGroupFields;
}

const ListTitleBar: React.FC<Props> = ({ currentList }) => {
    const history = useHistory();

    const returnToParent = (parentGroupId: string) => {
        history.push(`/list/${parentGroupId}`);
    };

    return (
        <Fragment>
            <ul className='ListTitleBar'>
                {'parentGroupId' in currentList && (
                    <li className='ListTitleBar-back' onClick={() => returnToParent(currentList.parentGroupId)}>
                        <i className='fas fa-arrow-left'></i>
                    </li>
                )}

                <li className='ListTitleBar-title groupName'>{currentList.groupName}</li>
                <ListTitleBarMenuButton currentList={currentList}></ListTitleBarMenuButton>
                <hr className='ListTitleBar-hr'></hr>
            </ul>
        </Fragment>
    );
};
export default ListTitleBar;
