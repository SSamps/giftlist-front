import React, { Fragment, useState } from 'react';
import { VALIDATION_USER_DISPLAY_NAME_MAX_LENGTH } from '../../../misc/validation';
import { IUser } from '../../../types/models/User';
import OverlayButtons from '../../misc/overlays/OverlayButtons';
import Spinner from '../../misc/spinner';
import DropdownUnderlay from '../dashboard/yourLists/controlBar/filters/DropdownUnderlay';
import { useMutation } from '@tanstack/react-query';
import { sendRenameUserRequestMut, useAuth } from '../../../context/authContext';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: IUser;
}

const RenameUserOverlay: React.FC<Props> = ({ setOpen, user }) => {
    const [formState, setFormState] = useState({ value: user.displayName, waiting: false });

    const { setUser } = useAuth();

    const renameUserMutation = useMutation({
        mutationFn: sendRenameUserRequestMut,
        onSuccess: (res: any) => {
            console.log(`renamed user - response: ${JSON.stringify(res.data)}`);
            setUser(res.data);
            setOpen(false);
        },
        onError: (err: any) => {
            //TODO handle error - previously action caused a error modal
            setFormState({ ...formState, waiting: false });
        },
    });

    const { value, waiting } = formState;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, value: e.target.value });
    };

    const submitForm = async (e?: React.FormEvent<HTMLFormElement>) => {
        setFormState({ ...formState, waiting: true });
        e?.preventDefault();

        renameUserMutation.mutate({ newName: value });
    };

    return (
        <Fragment>
            <div className='overlay'>
                <div className='overlayContainer'>
                    <span className='text-header'>Choose a new name</span>
                    <form className='form' onSubmit={submitForm}>
                        <input
                            type='text'
                            value={value}
                            onChange={onChange}
                            maxLength={VALIDATION_USER_DISPLAY_NAME_MAX_LENGTH}
                        ></input>
                    </form>
                    <OverlayButtons submitForm={submitForm} setOpen={setOpen}></OverlayButtons>
                    {waiting && <Spinner className='spinner-tiny'></Spinner>}
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen} extraClasses={'underlay-focus'}></DropdownUnderlay>
        </Fragment>
    );
};

export default RenameUserOverlay;
