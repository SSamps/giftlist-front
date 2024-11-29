import { Link, Navigate } from 'react-router-dom';
import GiftListExample from './newList/content/listExampleCards/giftList/GiftListExample';
import GiftListDescription from './newList/content/listDescriptions/GiftListDescription';
import { useAuth } from '../../context/authContext';

const Landing: React.FC = () => {
    const { user } = useAuth();

    if (user) {
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

export default Landing;
