import { connect } from 'react-redux';
import { IrootStateAuthed } from '../../../redux/reducers/root/rootReducer';
import { getTestDataActionCreator, TgetTestDataActionCreator } from '../../../redux/actions/testDataActions';
import React, { Fragment, useEffect } from 'react';
import { ItestDataState } from '../../../redux/reducers/testDataReducer';
import { IUser } from '../../../types/models/User';
import TestDataElement from './TestDataElement';
import TestDataNew from './TestDataNew';

interface Props extends ItestDataState {
    user: IUser;
    getTestDataActionCreator: TgetTestDataActionCreator;
}

export const TestData: React.FC<Props> = ({ user, getTestDataActionCreator, testData }: Props) => {
    useEffect(() => {
        getTestDataActionCreator(user?._id);
    }, [user?._id, getTestDataActionCreator]);

    return (
        <Fragment>
            <div>
                <TestDataNew></TestDataNew>
                <div className={'smallContainer'}>
                    {testData ? (
                        testData.map((element) => (
                            <TestDataElement key={element._id} element={element}></TestDataElement>
                        ))
                    ) : (
                        <p>No test data</p>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    loading: state.testDataReducer.loading,
    testData: state.testDataReducer.testData,
    error: state.testDataReducer.error,
    user: state.authReducer.user,
});

export default connect(mapStateToProps, { getTestDataActionCreator })(TestData);
