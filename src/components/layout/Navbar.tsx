import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutActionCreator, TlogoutActionCreator } from '../../redux/actions/authActions';
import { Fragment } from 'react';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import Alerts from '../misc/Alerts';

interface Props {
    logoutActionCreator: TlogoutActionCreator;
    loading: boolean;
    isAuthenticated: boolean | null;
}

const Navbar: React.FC<Props> = ({ logoutActionCreator, loading, isAuthenticated }) => {
    const authedLinks = (
        <Fragment>
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
                <Link to='/' onClick={() => logoutActionCreator()}>
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
                    {!loading && <Fragment>{isAuthenticated ? authedLinks : guestLinks}</Fragment>}
                </ul>
            </nav>
            <div className='alert-placeholder'>
                <Alerts></Alerts>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    loading: state.authReducer.loading,
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { logoutActionCreator })(Navbar);
