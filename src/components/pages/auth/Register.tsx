import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerActionCreator, TregisterActionCreator } from '../../../redux/actions/authActions';
import { IrootState } from '../../../redux/reducers/root/rootReducer';
import axios, { AxiosError, AxiosResponse } from 'axios';
import {
    VALIDATION_USER_DISPLAY_NAME_MAX_LENGTH,
    VALIDATION_USER_EMAIL_MAX_LENGTH,
    VALIDATION_USER_PASSWORD_MAX_LENGTH,
} from '../../../misc/validation';
import { isPasswordValid } from '../../../misc/helperFunctions';

interface Props {
    registerActionCreator: TregisterActionCreator;
    isAuthenticated: boolean | null;
}

const Register: React.FC<Props> = ({ registerActionCreator, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: '',
        password2: '',
    });

    const [formServerErrorData, setFormServerErrorData] = useState({
        emailErrorHighlight: false,
        emailErrorMessage: '',
        registerErrorMessage: '',
    });

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    const { displayName, email, password, password2 } = formData;

    const { registerErrorMessage, emailErrorHighlight, emailErrorMessage } = formServerErrorData;

    const passwordsMatch: boolean = password === password2;
    const passwordValid = isPasswordValid(password);

    const formHasErrors = (): boolean => {
        return !passwordsMatch || !passwordValid;
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetServerErrorState = () => {
        setFormServerErrorData({
            ...formServerErrorData,
            registerErrorMessage: '',
            emailErrorMessage: '',
            emailErrorHighlight: false,
        });
    };

    const handleRequestError = (err: AxiosResponse<AxiosError<any> | Error>) => {
        if (axios.isAxiosError(err) && err.response) {
            const status = err.response.status;
            const response: string = err.response.data;
            if (response.includes('An account already exists with that email address')) {
                setFormServerErrorData((prevFormServerErrorData) => ({
                    ...prevFormServerErrorData,
                    emailErrorMessage: 'An account already exists with that email address.',
                    emailErrorHighlight: true,
                }));
            } else {
                setFormServerErrorData((prevFormServerErrorData) => ({
                    ...prevFormServerErrorData,
                    registerErrorMessage: status + ' ' + response,
                }));
            }
        } else {
            setFormServerErrorData((prevFormServerErrorData) => ({
                ...prevFormServerErrorData,
                registerErrorMessage: 'Server error',
            }));
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formHasErrors()) {
            resetServerErrorState();
            var err = await registerActionCreator(displayName, email, password);
            if (err) {
                handleRequestError(err);
            }
        }
    };

    return (
        <Fragment>
            <p className='lead'>
                <i className='fas fa-user'></i> Create Your Account
            </p>
            <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>
                        Display Name
                        <input
                            type='text'
                            placeholder='Display Name'
                            name='displayName'
                            value={displayName}
                            onChange={onChange}
                            maxLength={VALIDATION_USER_DISPLAY_NAME_MAX_LENGTH}
                            required
                        />
                    </label>
                </div>
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
                            maxLength={VALIDATION_USER_EMAIL_MAX_LENGTH}
                            required
                        />
                    </label>
                </div>
                {emailErrorMessage && <p className='form-error-message'>{emailErrorMessage}</p>}
                <div className='form-group'>
                    <label>
                        Password
                        <input
                            className={!passwordsMatch ? 'form-error-field' : ''}
                            type='password'
                            placeholder='Password'
                            name='password'
                            minLength={8}
                            value={password}
                            onChange={onChange}
                            maxLength={VALIDATION_USER_PASSWORD_MAX_LENGTH}
                            required
                        />
                        {password.length > 0 && !passwordValid && (
                            <p className='form-error-message'>
                                Password must be at least 8 characters with one uppercase, lowercase and number.{' '}
                            </p>
                        )}
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Confirm Password
                        <input
                            className={!passwordsMatch ? 'form-error-field' : ''}
                            type='password'
                            placeholder='Confirm Password'
                            name='password2'
                            minLength={8}
                            value={password2}
                            onChange={onChange}
                            maxLength={VALIDATION_USER_PASSWORD_MAX_LENGTH}
                            required
                        />
                        {!passwordsMatch && <p className='form-error-message'>Passwords do not match</p>}
                    </label>
                </div>
                <input type='submit' className='btn-block' value='Register' />
                {registerErrorMessage && <p className='form-error-message'>{registerErrorMessage}</p>}
            </form>
            <p className='extraAuthButtonContainer'>
                <Link to='/login'>Sign In</Link>
            </p>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { registerActionCreator })(Register);
