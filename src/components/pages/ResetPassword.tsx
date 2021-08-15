import axios from 'axios';
import React, { Fragment, useState } from 'react';
import Spinner from '../misc/spinner';

interface Props {
    match: {
        params: { token: string };
    };
}

const ResetPassword: React.FC<Props> = ({
    match: {
        params: { token },
    },
}) => {
    interface IformState {
        password: string;
        password2: string;
    }
    const [formState, setFormState] = useState<IformState>({ password: '', password2: '' });
    const [submitState, setSubmitState] = useState({ submitError: '', waiting: false, complete: false });

    const { password, password2 } = formState;
    const dontMatch = password !== password2;
    const tooShort = password.length < 8;

    const { submitError, waiting, complete } = submitState;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const onSubmit = async () => {
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
            setSubmitState({ submitError: err.response.data, waiting: false, complete: false });
        }
    };

    return (
        <Fragment>
            <div className='lead'>Set a new password</div>
            <div className='form'>
                <div className='form-group'>
                    <label>
                        Password
                        <input
                            className={tooShort || dontMatch ? 'form-error-field' : ''}
                            type='password'
                            name='password'
                            minLength={8}
                            value={password}
                            onChange={onChange}
                            required
                        />
                        {tooShort && <p className='form-error-message'>Password must be at least 8 characters</p>}
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Confirm Password
                        <input
                            className={tooShort || dontMatch ? 'form-error-field' : ''}
                            type='password'
                            name='password2'
                            minLength={8}
                            value={password2}
                            onChange={onChange}
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
                        <div onClick={onSubmit} className='btn-simple'>
                            Submit
                        </div>
                    )}
                </div>
                <div className='form-error-container'>
                    {submitError && <p className='form-error-message'>Error: {submitError}</p>}
                </div>
            </div>
        </Fragment>
    );
};

export default ResetPassword;
