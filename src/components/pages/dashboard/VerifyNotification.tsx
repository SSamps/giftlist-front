import axios from 'axios';
import { useState } from 'react';
import Spinner from '../../misc/spinner';

const VerifyNotification = () => {
    const [submitState, setSubmitState] = useState({ sending: false, sendingError: undefined, sent: false });

    const { sending, sendingError, sent } = submitState;

    const onClick = () => {
        setSubmitState({ sending: true, sendingError: undefined, sent: false });
        try {
            axios.post('api/users/sendverification');
            setSubmitState({ sending: false, sendingError: undefined, sent: true });
        } catch (err) {
            setSubmitState({ sending: false, sendingError: err.response.status, sent: false });
        }
    };

    return (
        <div className='dashboardVerifyContainer'>
            <div className='dashboardVerifyBody'>
                <div className='lead'>Verify your email</div>
                <div>Please follow the instructions in your welcome email</div>
            </div>
            {sending ? (
                <Spinner className='spinner-tiny'></Spinner>
            ) : (
                <div>
                    {sent ? (
                        <div>Sent new verification email</div>
                    ) : (
                        <input
                            type='button'
                            className='btn-block'
                            value='Resend verification email'
                            onClick={onClick}
                        />
                    )}
                    {sendingError && <div className='form-error-message'>{sendingError}</div>}
                </div>
            )}
        </div>
    );
};

export default VerifyNotification;
