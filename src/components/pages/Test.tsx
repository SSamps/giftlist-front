import { Link } from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {testQuery} from '../../tanstack/testQueries';

// interface Props {
//     isAuthenticated: boolean | null;
// }

// want access to auth / some other state
const test: React.FC = () => {
    // if (isAuthenticated) {
    //     return <Navigate to='/dashboard' />;
    // }

    const query = useQuery({ queryKey: ['testdata'], queryFn:  testQuery})

    if (query.isLoading) {
        console.log('loading query');
    }

    if (query.isError){
        console.log('error query');
    }

    return (
        <div className='landing-inner'>
            <div className='landingContentContainer'>
                <div className='landingHeadlineContainer'>
                    <div>
                        <h1 className='text-title'>Test Page</h1>
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
                        {query.isLoading ? <h1>Loading</h1> : <h1>Some content</h1>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default test;