import axios from 'axios';
import { useState } from 'react';
import Spinner from '../../misc/spinner';
import { isAxiosError } from '../../../misc/helperFunctions';

const VerifyNotification = () => {
    const [submitState, setSubmitState] = useState({ sending: false, sendingError: '', sent: false });

    const { sending, sendingError, sent } = submitState;

    const onClick = () => {
        setSubmitState({ sending: true, sendingError: '', sent: false });
        try {
            axios.post('api/users/sendverification');
            setSubmitState({ sending: false, sendingError: '', sent: true });
        } catch (err) {
            if (isAxiosError(err)) {
                setSubmitState({
                    sending: false,
                    sendingError: `Error: ${err.response!.status} ${err.response!.statusText}`,
                    sent: false,
                });
            } else {
                setSubmitState({ sending: false, sendingError: `Error: Unknown error`, sent: false });
            }
        }
    };

    return (
        <div className='dashboardVerifyContainer'>
            <div className='dashboardVerifyBody'>
                <div className='text-header'>Verify your email mum</div>
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
