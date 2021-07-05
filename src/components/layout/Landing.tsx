import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IrootState } from '../../redux/reducers/root/rootReducer';

interface Props {
    isAuthenticated: boolean | null;
}

const landing: React.FC<Props> = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <section className='landing'>
            <div className='landing-inner'>
                <h1 className='title'>Header</h1>
                <p className='lead'>Headline goes here</p>
                <div className='buttons'>
                    <Link to='/register' className='btn btn-primary'>
                        Sign Up
                    </Link>
                    <Link to='/login' className='btn btn-light'>
                        Login
                    </Link>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state: IrootState) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps)(landing);
