import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { renameListActionCreator, TrenameListActionCreator } from '../../../../../../redux/actions/listGroupActions';
import { TbasicListFields, TgiftGroupFields, TgiftListFieldsCensored } from '../../../../../../types/models/listGroups';
import OverlayButtons from '../../../../../misc/overlays/OverlayButtons';
import Spinner from '../../../../../misc/spinner';
import DropdownUnderlay from '../../../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentList: TgiftListFieldsCensored | TbasicListFields | TgiftGroupFields;
    renameListActionCreator: TrenameListActionCreator;
}

const RenameListOverlay: React.FC<Props> = ({ setOpen, currentList, renameListActionCreator }) => {
    const [formState, setFormState] = useState({ value: currentList.groupName, waiting: false });

    const { value, waiting } = formState;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, value: e.target.value });
    };

    const submitForm = async (e?: React.FormEvent<HTMLFormElement>) => {
        setFormState({ ...formState, waiting: true });
        e?.preventDefault();
        const success = await renameListActionCreator(currentList._id, value);
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
                    <span className='lead'>Rename list</span>
                    <form className='form' onSubmit={submitForm}>
                        <input type='text' value={value} onChange={onChange}></input>
                    </form>
                    <OverlayButtons submitForm={submitForm} setOpen={setOpen}></OverlayButtons>
                    {waiting && <Spinner className='spinner-tiny'></Spinner>}
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen} extraClasses={'underlay-focus'}></DropdownUnderlay>
        </Fragment>
    );
};

export default connect(null, { renameListActionCreator })(RenameListOverlay);
