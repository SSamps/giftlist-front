import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import OverlayButtons from '../../misc/overlays/OverlayButtons';
import Spinner from '../../misc/spinner';
import DropdownUnderlay from '../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgottenPassOverlay: React.FC<Props> = ({ setOpen }) => {
    const [email, setEmail] = useState('');
    const [submitState, setSubmitState] = useState({ waiting: false, error: '', complete: false });

    const { waiting, error, complete } = submitState;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const submitForm = async (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setSubmitState({ ...submitState, error: '', waiting: true });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const body = JSON.stringify({ email: email });
            await axios.post(`/api/users/resetpassword`, body, config);
            setSubmitState({ error: '', waiting: false, complete: true });
        } catch (err) {
            setSubmitState({ ...submitState, waiting: false, error: err.response.data });
        }
    };

    return (
        <Fragment>
            <div className='overlay'>
                <div className='overlayContainer'>
                    <span className='text-header'>Recover your password</span>
                    <form className='form' onSubmit={submitForm}>
                        <label>
                            Email
                            <input type='text' value={email} onChange={onChange}></input>
                        </label>
                    </form>
                    {complete ? (
                        <div>Password recovery email sent</div>
                    ) : (
                        <OverlayButtons submitForm={submitForm} setOpen={setOpen}></OverlayButtons>
                    )}
                    {waiting && <Spinner className='spinner-tiny'></Spinner>}
                    {error.length > 0 && <div className='form-error-message'>{error}</div>}
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen} extraClasses={'underlay-focus'}></DropdownUnderlay>
        </Fragment>
    );
};

export default connect(null, {})(ForgottenPassOverlay);
