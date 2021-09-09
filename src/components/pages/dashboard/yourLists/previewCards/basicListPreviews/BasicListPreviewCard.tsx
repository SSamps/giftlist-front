import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IrootStateAuthedBasicListLoaded } from '../../../../../../redux/reducers/root/rootReducer';
import { TbasicListFields } from '../../../../../../types/models/listGroups';
import { IUser } from '../../../../../../types/models/User';
import { findOwnerInGroup } from '../../../../../../misc/helperFunctions';
import PreviewCardFooter from '../shared/PreviewCardFooter';
import PreviewCardHeader from '../shared/PreviewCardHeader';
import BasicListPreviewCardItem from './BasicListPreviewCardItem';

interface Props {
    list: TbasicListFields;
    user: IUser;
}

const BasicListPreviewCard: React.FC<Props> = ({ list }) => {
    const owner = findOwnerInGroup(list);

    return (
        <Link to={`list/${list._id}`} className='listPreviewCard'>
            <PreviewCardHeader listVariant='Basic list' list={list}></PreviewCardHeader>
            <div className='listPreviewCard-bodyContainer'>
                <ul className='listPreviewCard-body'>
                    {list.listItems.slice(0, 6).map((item) => {
                        return (
                            <BasicListPreviewCardItem
                                key={`previewItem${item._id}`}
                                item={item}
                            ></BasicListPreviewCardItem>
                        );
                    })}
                </ul>
                <div className='listPreviewCard-fade'></div>
            </div>
            <PreviewCardFooter list={list} owner={owner}></PreviewCardFooter>
        </Link>
    );
};

const mapStateToProps = (state: IrootStateAuthedBasicListLoaded) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps)(BasicListPreviewCard);
