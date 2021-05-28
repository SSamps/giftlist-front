import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { TaddTestDataActionCreator, addTestDataActionCreator } from '../../../redux/actions/testDataActions';
import { IrootStateAuthed } from '../../../redux/reducers/root/rootReducer';
import { IUser } from '../../../types/models/User';
import Spinner from '../../misc/spinner';

interface Props {
    user: IUser;
    addTestDataActionCreator: TaddTestDataActionCreator;
}

const TestDataNew = ({ user, addTestDataActionCreator }: Props) => {
    const [formData, setFormData] = useState({
        testData: '',
        addingNew: false,
    });
    const [updateStatus, setUpdateStatus] = useState({
        waiting: false,
    });

    const { testData } = formData;
    const { waiting } = updateStatus;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUpdateStatus({ waiting: true });
        await addTestDataActionCreator(user._id, testData);
        setUpdateStatus({ waiting: false });
    };

    return (
        <Fragment>
            <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>
                        Add new data:
                        <input
                            type='text'
                            placeholder='new data'
                            name='testData'
                            value={testData}
                            onChange={onChange}
                            required
                        />
                    </label>
                </div>
                {!waiting ? (
                    <input type='submit' className='btn btn-primary' value='Add' />
                ) : (
                    <Spinner className='spinner-button'></Spinner>
                )}
            </form>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps, { addTestDataActionCreator })(TestDataNew);
