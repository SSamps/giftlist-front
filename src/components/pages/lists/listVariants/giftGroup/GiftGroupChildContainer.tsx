import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootState } from '../../../../../redux/reducers/root/rootReducer';

interface Props {
    giftGroupChild: undefined | { _id: string };
}

export const GiftGroupChildContainer: React.FC<Props> = ({ giftGroupChild }) => {
    return (
        <Fragment>
            <div>
                <div>I am a list with id {giftGroupChild?._id}</div>
                {console.log(giftGroupChild)}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps)(GiftGroupChildContainer);
