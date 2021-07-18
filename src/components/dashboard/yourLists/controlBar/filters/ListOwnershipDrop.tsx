import { Fragment } from 'react';
import { connect } from 'react-redux';
import { setFiltersActionCreator } from '../../../../../redux/actions/dashboardActions';
import { IrootStateAuthed } from '../../../../../redux/reducers/root/rootReducer';
import DropdownUnderlay from './DropdownUnderlay';

interface Props {
    listOwnershipFilter: 'anyone' | 'you' | 'others';
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListOwnershipDrop: React.FC<Props> = ({ listOwnershipFilter, setOpen }) => {
    return (
        <Fragment>
            <div className='dropDown'>
                <div className={`dropDownItem ${listOwnershipFilter === 'anyone' && 'dropDownItem-selected'}`}>
                    Owned by anyone
                </div>
                <div className={`dropDownItem ${listOwnershipFilter === 'you' && 'dropDownItem-selected'}`}>
                    Owned by you
                </div>
                <div className={`dropDownItem ${listOwnershipFilter === 'others' && 'dropDownItem-selected'}`}>
                    Owned by others
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen}></DropdownUnderlay>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    listOwnershipFilter: state.dashboardReducer.listOwnershipFilter,
});

export default connect(mapStateToProps, { setFiltersActionCreator })(ListOwnershipDrop);
