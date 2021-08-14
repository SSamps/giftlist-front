import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { renameListActionCreator, TrenameListActionCreator } from '../../../../../redux/actions/listGroupActions';
import { TbasicListFields, TgiftListFields } from '../../../../../types/models/listGroups';
import OverlayButtons from '../../../../misc/OverlayButtons';
import Spinner from '../../../../misc/spinner';
import DropdownUnderlay from '../../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentList: TgiftListFields | TbasicListFields;
    renameListActionCreator: TrenameListActionCreator;
}

const RenameListOverlay: React.FC<Props> = ({ setOpen, currentList, renameListActionCreator }) => {
    const [renameFormState, setRenameFormState] = useState({ newName: currentList.groupName, waiting: false });

    const { newName, waiting } = renameFormState;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRenameFormState({ ...renameFormState, newName: e.target.value });
    };

    const submitForm = async (e?: React.FormEvent<HTMLFormElement>) => {
        setRenameFormState({ ...renameFormState, waiting: true });
        e?.preventDefault();
        await renameListActionCreator(currentList._id, newName);
        setOpen(false);
    };

    return (
        <Fragment>
            <div className='overlay'>
                <div className='overlayContainer'>
                    <span className='lead'>Rename list</span>
                    <form className='form' onSubmit={submitForm}>
                        <input type='text' value={newName} onChange={onChange}></input>
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
