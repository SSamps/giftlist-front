import React, { Fragment, useState } from 'react';
import OverlayButtons from './OverlayButtons';
import Spinner from '../spinner';
import DropdownUnderlay from '../../pages/dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    initialValue?: string;
    submitAction: (newName: string) => Promise<boolean | void>;
    description: string;
    placeholder?: string;
}

const SingleTextFieldOverlay: React.FC<Props> = ({ setOpen, initialValue, submitAction, description, placeholder }) => {
    const [formState, setFormState] = useState({ value: initialValue || '', waiting: false });

    const { value, waiting } = formState;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, value: e.target.value });
    };

    const submitForm = async (e?: React.FormEvent<HTMLFormElement>) => {
        setFormState({ ...formState, waiting: true });
        e?.preventDefault();
        const success = await submitAction(value);
        if (success) {
            setFormState({ ...formState, waiting: false });
            setOpen(false);
        }
    };

    return (
        <Fragment>
            <div className='overlay'>
                <div className='overlayContainer'>
                    <span className='lead'>{description}</span>
                    <form className='form' onSubmit={submitForm}>
                        <input type='text' value={value} onChange={onChange} placeholder={placeholder}></input>
                    </form>
                    <OverlayButtons submitForm={submitForm} setOpen={setOpen}></OverlayButtons>
                    {waiting && <Spinner className='spinner-tiny'></Spinner>}
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen} extraClasses={'underlay-focus'}></DropdownUnderlay>
        </Fragment>
    );
};

export default SingleTextFieldOverlay;
