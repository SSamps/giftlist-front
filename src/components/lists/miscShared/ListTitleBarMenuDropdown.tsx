import { Fragment } from 'react';
import DropdownUnderlay from '../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListOwnershipDrop: React.FC<Props> = ({ setOpen }) => {
    const testFunc = () => {};

    return (
        <Fragment>
            <div className='dropDown dropDown-leftCover'>
                <div className={`dropDownItem`} onClick={testFunc}>
                    Rename Group
                </div>
                <div className={`dropDownItem`} onClick={testFunc}>
                    Invite Members
                </div>
                <div className='dropDownItem-danger'>
                    <div className='dropDownItem ' onClick={testFunc}>
                        Delete Group
                    </div>
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen}></DropdownUnderlay>
        </Fragment>
    );
};

export default ListOwnershipDrop;
