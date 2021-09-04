import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import GiftListExample from './newList/content/listExampleCards/giftList/GiftListExample';
import GiftListDescription from './newList/content/listDescriptions/GiftListDescription';

interface Props {
    isAuthenticated: boolean | null;
}

const landing: React.FC<Props> = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div className='landing-inner'>
            <div className='landingContentContainer'>
                <div className='landingHeadlineContainer'>
                    <div>
                        <h1 className='title'>Gift List</h1>
                        <p className='lead'>Make gifting easy</p>
                    </div>
                    <div className=''>
                        <Link to='/register' className='btn-block btn-spaced'>
                            Sign Up
                        </Link>
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
