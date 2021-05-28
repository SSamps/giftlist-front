import { connect } from 'react-redux';
import { Fragment, useState } from 'react';
import { IrootStateAuthed } from '../../../redux/reducers/root/rootReducer';
import { IUser } from '../../../types/models/User';
import { deleteTestDataActionCreator, TdeleteTestDataActionCreator } from '../../../redux/actions/testDataActions';
import Spinner from '../../misc/spinner';

interface Props {
    user: IUser;
    element: { _id: string; testVar: string };
    deleteTestDataActionCreator: TdeleteTestDataActionCreator;
}

const TestDataElement = ({ user, element, deleteTestDataActionCreator }: Props) => {
    const [removalStatus, setRemovalStatus] = useState({
        waiting: false,
    });

    const { waiting } = removalStatus;

    const onClickDelete = async () => {
        setRemovalStatus({ waiting: true });
        await deleteTestDataActionCreator(user._id, element._id);
    };

    return (
        <Fragment>
            <div>
                <button onClick={onClickDelete}>
                    {' '}
                    {!waiting ? <i className='fas fa-times'></i> : <Spinner className='spinner-tiny'></Spinner>}
                </button>{' '}
                {element.testVar}{' '}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps, { deleteTestDataActionCreator })(TestDataElement);
