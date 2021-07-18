import { Fragment } from 'react';
import { connect } from 'react-redux';
import { setFiltersActionCreator } from '../../../../../redux/actions/dashboardActions';
import { IrootStateAuthed } from '../../../../../redux/reducers/root/rootReducer';
import { TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../../../types/listVariants';
import DropdownUnderlay from './DropdownUnderlay';

interface Props {
    listVariantFilter: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListTypeDrop: React.FC<Props> = ({ setOpen }) => {
    return (
        <Fragment>
            <div className='dropDown'>
                <div className='dropDownItem'>Basic List</div>
                <div className='dropDownItem'>Gift List</div>
                <div className='dropDownItem'>Gift Group</div>
            </div>
            <DropdownUnderlay setOpen={setOpen}></DropdownUnderlay>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    listVariantFilter: state.dashboardReducer.listVariantFilter,
});

export default connect(mapStateToProps, { setFiltersActionCreator })(ListTypeDrop);
