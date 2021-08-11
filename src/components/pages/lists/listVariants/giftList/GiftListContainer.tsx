import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootState } from '../../../../../redux/reducers/root/rootReducer';

interface Props {
    giftList: undefined | { _id: string };
}

export const GiftListContainer: React.FC<Props> = ({ giftList }) => {
    return (
        <Fragment>
            <div>
                <div>I am a list with id {giftList?._id}</div>
                {console.log(giftList)}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps)(GiftListContainer);
