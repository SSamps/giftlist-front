import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootState } from '../../../redux/reducers/root/rootReducer';

interface Props {
    giftGroup: undefined | { _id: string };
}

export const GiftGroupContainer: React.FC<Props> = ({ giftGroup }) => {
    return (
        <Fragment>
            <div>
                <div>I am a list with id {giftGroup?._id}</div>
                {console.log(giftGroup)}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps)(GiftGroupContainer);
