import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerActionCreator, TregisterActionCreator } from '../../redux/actions/authActions';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import axios, { AxiosError, AxiosResponse } from 'axios';

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

    const formHasErrors = (): boolean => {
        let errors: boolean[] = [!passwordsMatch];
        return errors.every((v) => v);
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
            let status = err.response.status;
            switch (status) {
                case 400:
                    setFormServerErrorData((prevFormServerErrorData) => ({
                        ...prevFormServerErrorData,
                        emailErrorMessage: 'An account already exists with that email address.',
                        emailErrorHighlight: true,
                    }));
                    break;
                default:
                    setFormServerErrorData((prevFormServerErrorData) => ({
                        ...prevFormServerErrorData,
                        registerErrorMessage: 'Server error: Code ' + status,
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
                            required
                        />
                    </label>
                </div>
                {<p className='form-error-message'>{emailErrorMessage}</p>}
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
                            required
                        />
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
                            required
                        />
                    </label>
                </div>
                {<p className='form-error-message'>{!passwordsMatch ? 'Passwords do not match' : ''}</p>}
                <input type='submit' className='btn btn-primary' value='Register' />
                {<p className='form-error-message'>{registerErrorMessage}</p>}
            </form>
            <p className='my-1'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { registerActionCreator })(Register);
