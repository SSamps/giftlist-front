import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import GiftListExample from './newList/content/listExampleCards/giftList/GiftListExample';
import GiftListDescription from './newList/content/listDescriptions/GiftListDescription';

interface Props {
    isAuthenticated: boolean | null;
}

const landing: React.FC<Props> = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Navigate to='/dashboard' />;
    }

    return (
        <div className='landing-inner'>
            <div className='landingContentContainer'>
                <div className='landingHeadlineContainer'>
                    <div>
                        <h1 className='text-title'>Gift List</h1>
                        <p className='text-header'>Make gifting easy</p>
                    </div>
                    <div className='landingHeadlineContainer-buttons'>
                        <div className=''>
                            <Link to='/register' className='btn-block btn-spaced'>
                                Sign Up
                            </Link>
                        </div>
                        <div className=''>
                            <Link to='/login' className='btn-block btn-spaced'>
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='landingExampleContainer'>
                    <div className='newListExampleContainer-inner'>
                        <GiftListDescription></GiftListDescription>
                        <GiftListExample></GiftListExample>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IrootState) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps)(landing);
