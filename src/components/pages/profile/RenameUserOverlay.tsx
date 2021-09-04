import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { VALIDATION_USER_DISPLAY_NAME_MAX_LENGTH } from '../../../misc/validation';
import { renameUserActionCreator, TrenameUserActionCreator } from '../../../redux/actions/authActions';
import { IrootStateAuthed } from '../../../redux/reducers/root/rootReducer';
import { IUser } from '../../../types/models/User';
import OverlayButtons from '../../misc/overlays/OverlayButtons';
import Spinner from '../../misc/spinner';
import DropdownUnderlay from '../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    renameUserActionCreator: TrenameUserActionCreator;
    user: IUser;
}

const RenameUserOverlay: React.FC<Props> = ({ setOpen, renameUserActionCreator, user }) => {
    const [formState, setFormState] = useState({ value: user.displayName, waiting: false });

    const { value, waiting } = formState;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, value: e.target.value });
    };

    const submitForm = async (e?: React.FormEvent<HTMLFormElement>) => {
        setFormState({ ...formState, waiting: true });
        e?.preventDefault();
        const success = await renameUserActionCreator(value);
        if (success) {
            setOpen(false);
        } else {
            setFormState({ ...formState, waiting: false });
        }
    };

    return (
        <Fragment>
            <div className='overlay'>
                <div className='overlayContainer'>
                    <span className='lead'>Choose a new name</span>
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

const mapStateToProps = (state: IrootStateAuthed) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps, { renameUserActionCreator })(RenameUserOverlay);
