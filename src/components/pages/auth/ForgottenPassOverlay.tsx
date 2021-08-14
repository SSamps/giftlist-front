import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import OverlayButtons from '../../misc/OverlayButtons';
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
        setSubmitState({ ...submitState, error: '' });
        e?.preventDefault();
        try {
            //axios request
            setSubmitState({ ...submitState, waiting: false, complete: true });
        } catch (err) {
            setSubmitState({ ...submitState, waiting: false, error: err.response.data });
        }
    };

    return (
        <Fragment>
            <div className='overlay'>
                <div className='overlayContainer'>
                    <span className='lead'>Recover your password</span>
                    <form className='form' onSubmit={submitForm}>
                        <label>
                            Email
                            <input type='text' value={email} onChange={onChange}></input>
                        </label>
                    </form>
                    <OverlayButtons submitForm={submitForm} setOpen={setOpen}></OverlayButtons>
                    {waiting ? (
                        <Spinner className='spinner-tiny'></Spinner>
                    ) : (
                        complete && <div>Password recovery email sent</div>
                    )}
                    {error.length > 0 && error}
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen} extraClasses={'underlay-focus'}></DropdownUnderlay>
        </Fragment>
    );
};

export default connect(null, {})(ForgottenPassOverlay);
