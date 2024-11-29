import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import Alerts from '../misc/Alerts';
import { useAuth } from '../../state/AuthState';

const Navbar: React.FC = () => {
    const { user, setUser, userLoading: loading, setToken } = useAuth();

    const logout = () => {
        setToken(null);
        // setUser(null);
    };

    const authedLinks = (
        <Fragment>
            <li>
                <Link to='/test'>
                    <span className=''>Test</span>
                </Link>
            </li>
            <li>
                <Link to='/dashboard'>
                    <span className=''>Your Lists</span>
                </Link>
            </li>
            <li>
                <Link to='/profile'>
                    <span className=''>Profile</span>
                </Link>
            </li>

            <li>
                <Link to='/' onClick={() => logout()}>
                    <span className=''>Logout</span>
                </Link>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    );

    return (
        <Fragment>
            <nav className='navbar'>
                <ul>
                    <li className='navLogo'>
                        <Link to='/'>
                            <span>Gift List</span>
                        </Link>
                    </li>
                    {!loading && <Fragment>{user ? authedLinks : guestLinks}</Fragment>}
                </ul>
            </nav>
            <div className='alert-placeholder'>
                <Alerts></Alerts>
            </div>
        </Fragment>
    );
};

export default Navbar;
