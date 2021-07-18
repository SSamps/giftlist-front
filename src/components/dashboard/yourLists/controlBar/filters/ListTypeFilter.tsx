import { useState } from 'react';
import { connect } from 'react-redux';
import { setFiltersActionCreator } from '../../../../../redux/actions/dashboardActions';
import { IrootStateAuthed } from '../../../../../redux/reducers/root/rootReducer';
import { TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../../../types/listVariants';
import ListOwnershipDrop from './ListOwnershipDrop';

interface Props {
    listVariantFilter: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS[];
}

const ListTypeFilter: React.FC<Props> = ({}) => {
    const [open, setOpen] = useState(false);

    return (
        <span className='dashboardFilterContainer-item' onClick={() => setOpen(!open)}>
            Type filter <i className='fas fa-angle-down'></i>
            {open && <ListOwnershipDrop></ListOwnershipDrop>}
        </span>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    listVariantFilter: state.dashboardReducer.listVariantFilter,
});

export default connect(mapStateToProps, { setFiltersActionCreator })(ListTypeFilter);
