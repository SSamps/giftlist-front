import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootState } from '../../../redux/reducers/root/rootReducer';

interface Props {
    basicList: undefined | { _id: string };
}

export const BasicListContainer: React.FC<Props> = ({ basicList }) => {
    return (
        <Fragment>
            <div>
                <div>I am a list with id {basicList?._id}</div>
                {console.log(basicList)}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps)(BasicListContainer);
