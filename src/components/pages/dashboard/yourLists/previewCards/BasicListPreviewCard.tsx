import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IrootStateAuthedBasicListLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { TbasicListFields } from '../../../../../types/models/listGroups';
import { IUser } from '../../../../../types/models/User';
import { findOwnerInGroup } from '../../../../../utils/helperFunctions';
import PreviewCardFooter from './PreviewCardFooter';
import PreviewCardHeader from './PreviewCardHeader';

interface Props {
    list: TbasicListFields;
    user: IUser;
}

const BasicListPreviewCard: React.FC<Props> = ({ list }) => {
    const owner = findOwnerInGroup(list);

    return (
        <Link to={`list/${list._id}`} className='listPreviewCard'>
            <PreviewCardHeader listVariant='Basic list' list={list}></PreviewCardHeader>
            <div className='listPreviewCard-body'></div>
            <PreviewCardFooter list={list} owner={owner}></PreviewCardFooter>
        </Link>
    );
};

const mapStateToProps = (state: IrootStateAuthedBasicListLoaded) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps)(BasicListPreviewCard);
