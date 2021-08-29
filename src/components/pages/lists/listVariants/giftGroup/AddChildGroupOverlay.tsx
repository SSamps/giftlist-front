import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { addAlertThunkActionCreator, TaddAlertThunkActionCreator } from '../../../../../redux/actions/alertActions';
import { IrootStateAuthedGiftGroupLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { TgiftGroupFields } from '../../../../../types/models/listGroups';
import { IUser } from '../../../../../types/models/User';
import OverlayButtons from '../../../../misc/overlays/OverlayButtons';
import Spinner from '../../../../misc/spinner';
import DropdownUnderlay from '../../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentList: TgiftGroupFields;
    user: IUser;
    addAlertThunkActionCreator: TaddAlertThunkActionCreator;
}

const AddChildGroupOverlay: React.FC<Props> = ({ setOpen, currentList, user, addAlertThunkActionCreator }) => {
    const history = useHistory();
    const [formState, setFormState] = useState({ value: '', waiting: false });

    const { value, waiting } = formState;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, value: e.target.value });
    };

    const addList = async (newListName: string) => {
        const reqConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const reqBody = JSON.stringify({
            groupVariant: 'GIFT_GROUP_CHILD',
            groupName: newListName,
            parentGroupId: currentList._id,
        });
        try {
            const res = await axios.post('/api/groups', reqBody, reqConfig);
            const newListId = res.data._id;
            history.push(`/list/${newListId}`);
        } catch (err) {
            addAlertThunkActionCreator('error', `${err.response.status} ${err.response.data}`);
            setFormState({ ...formState, waiting: false });
        }
    };

    const submitForm = async (e?: React.FormEvent<HTMLFormElement>) => {
        setFormState({ ...formState, waiting: true });
        e?.preventDefault();
        await addList(value);
    };

    return (
        <Fragment>
            <div className='overlay'>
                <div className='overlayContainer'>
                    <span className='lead'>Give your new list a name</span>
                    <form className='form' onSubmit={submitForm}>
                        <input
                            type='text'
                            value={value}
                            onChange={onChange}
                            placeholder={`${user.displayName}'s list`}
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

const mapStateToProps = (state: IrootStateAuthedGiftGroupLoaded) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps, { addAlertThunkActionCreator })(AddChildGroupOverlay);
