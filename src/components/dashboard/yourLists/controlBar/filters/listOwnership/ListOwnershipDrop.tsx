import { Fragment } from 'react';
import { connect } from 'react-redux';
import { setFiltersActionCreator, TsetFiltersActionCreator } from '../../../../../../redux/actions/dashboardActions';
import { IrootStateAuthed } from '../../../../../../redux/reducers/root/rootReducer';
import DropdownUnderlay from '../DropdownUnderlay';

interface Props {
    listOwnershipFilter: 'anyone' | 'you' | 'others';
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setFiltersActionCreator: TsetFiltersActionCreator;
}

const ListOwnershipDrop: React.FC<Props> = ({ listOwnershipFilter, setOpen, setFiltersActionCreator }) => {
    const onClick = (selection: 'anyone' | 'you' | 'others') => {
        setFiltersActionCreator('listOwnershipFilter', selection);
        setOpen(false);
    };

    return (
        <Fragment>
            <div className='dropDown'>
                <div
                    className={`dropDownItem ${listOwnershipFilter === 'anyone' && 'dropDownItem-selected'}`}
                    onClick={() => {
                        onClick('anyone');
                    }}
                >
                    Owned by anyone
                </div>
                <div
                    className={`dropDownItem ${listOwnershipFilter === 'you' && 'dropDownItem-selected'}`}
                    onClick={() => {
                        onClick('you');
                    }}
                >
                    Owned by you
                </div>
                <div
                    className={`dropDownItem ${listOwnershipFilter === 'others' && 'dropDownItem-selected'}`}
                    onClick={() => {
                        onClick('others');
                    }}
                >
                    Owned by others
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen} classes={'underlay'}></DropdownUnderlay>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    listOwnershipFilter: state.dashboardReducer.listOwnershipFilter,
});

export default connect(mapStateToProps, { setFiltersActionCreator })(ListOwnershipDrop);
