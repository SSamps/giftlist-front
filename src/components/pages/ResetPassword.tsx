import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isAxiosError, isPasswordValid } from '../../misc/helperFunctions';
import { VALIDATION_USER_PASSWORD_MAX_LENGTH } from '../../misc/validation';
import Spinner from '../misc/spinner';

const ResetPassword: React.FC = () => {
    interface IformState {
        password: string;
        password2: string;
    }
    const { token } = useParams();

    const [formState, setFormState] = useState<IformState>({ password: '', password2: '' });
    const [submitState, setSubmitState] = useState({ submitError: '', waiting: false, complete: false });

    const { password, password2 } = formState;
    const dontMatch = password !== password2;
    const passwordValid = isPasswordValid(password);

    const { submitError, waiting, complete } = submitState;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitState({ submitError: '', waiting: true, complete: false });

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const body = JSON.stringify({ password: password });
            await axios.post(`/api/users/resetpassword/${token}`, body, config);
            setSubmitState({ submitError: '', waiting: false, complete: true });
        } catch (err) {
            if (isAxiosError(err)) {
                const errorMessage = err.response?.data
                    ? typeof err.response.data === 'string'
                        ? err.response.data
                        : JSON.stringify(err.response.data)
                    : 'Unknown error';

                setSubmitState({ submitError: errorMessage, waiting: false, complete: false });
            } else {
                setSubmitState({ submitError: 'Unknown error', waiting: false, complete: false });
            }
        }
    };

    return (
        <Fragment>
            <div className='text-header'>Set a new password</div>
            <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>
                        Password
                        <input
                            className={!passwordValid || dontMatch ? 'form-error-field' : ''}
                            type='password'
                            name='password'
                            minLength={8}
                            value={password}
                            onChange={onChange}
                            maxLength={VALIDATION_USER_PASSWORD_MAX_LENGTH}
                            required
                        />
                        {password.length > 0 && !passwordValid && (
                            <p className='form-error-message'>
                                Password must be at least 8 characters with one uppercase, lowercase and number.
                            </p>
                        )}
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Confirm Password
                        <input
                            className={!passwordValid || dontMatch ? 'form-error-field' : ''}
                            type='password'
                            name='password2'
                            minLength={8}
                            value={password2}
                            onChange={onChange}
                            maxLength={VALIDATION_USER_PASSWORD_MAX_LENGTH}
                            required
                        />
                        {dontMatch && <p className='form-error-message'>Passwords do not match</p>}
                    </label>
                </div>
                <div className='form-controls'>
                    {waiting ? (
                        <Spinner className='spinner-tiny'></Spinner>
                    ) : complete ? (
                        <div>Password successfully updated</div>
                    ) : (
                        <input type='submit' className='btn-block' value='Submit'></input>
                    )}
                </div>
                <div className='form-error-container'>
                    {submitError && <p className='form-error-message'>{submitError}</p>}
                </div>
            </form>
        </Fragment>
    );
};

export default ResetPassword;
