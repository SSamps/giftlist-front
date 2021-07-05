import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginActionCreator, TloginActionCreator } from '../../redux/actions/authActions';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface Props {
    loginActionCreator: TloginActionCreator;
    isAuthenticated: boolean | null;
}

const Login: React.FC<Props> = ({ loginActionCreator, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        loginError: '',
    });

    const [formServerErrorData, setFormServerErrorData] = useState({
        loginErrorMessage: '',
        passwordErrorHighlight: false,
        emailErrorHighlight: false,
    });

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    const { email, password } = formData;
    const { loginErrorMessage, emailErrorHighlight, passwordErrorHighlight } = formServerErrorData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetServerErrorState = () => {
        setFormServerErrorData({
            ...formServerErrorData,
            loginErrorMessage: '',
            passwordErrorHighlight: false,
            emailErrorHighlight: false,
        });
    };

    const handleRequestError = (err: AxiosResponse<AxiosError<any> | Error>) => {
        if (axios.isAxiosError(err) && err.response) {
            let status = err.response.status;
            switch (status) {
                case 400:
                    setFormServerErrorData((prevFormServerErrorData) => ({
                        ...prevFormServerErrorData,
                        loginErrorMessage: 'Incorrect email or password',
                        emailErrorHighlight: true,
                        passwordErrorHighlight: true,
                    }));
                    break;
                default:
                    setFormServerErrorData((prevFormServerErrorData) => ({
                        ...prevFormServerErrorData,
                        loginErrorMessage: 'Server error: Code ' + status,
                    }));
            }
        } else {
            setFormServerErrorData((prevFormServerErrorData) => ({
                ...prevFormServerErrorData,
                loginErrorMessage: 'Server error',
            }));
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        resetServerErrorState();
        var err = await loginActionCreator(email, password);
        if (err) {
            handleRequestError(err);
        }
    };

    return (
        <Fragment>
            <p className='lead'>
                <i className='fas fa-user'></i> Sign in to your account
            </p>
            <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>
                        Email
                        <input
                            className={emailErrorHighlight ? 'form-error-field' : ''}
                            type='email'
                            placeholder='Email Address'
                            name='email'
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Password
                        <input
                            className={passwordErrorHighlight ? 'form-error-field' : ''}
                            type='password'
                            placeholder='Password'
                            name='password'
                            minLength={8}
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </label>
                </div>
                {<p className='form-error-message'>{loginErrorMessage}</p>}
                <input type='submit' className='btn btn-primary' value='Login' />
            </form>
            <p className='my-1'>
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { loginActionCreator })(Login);
