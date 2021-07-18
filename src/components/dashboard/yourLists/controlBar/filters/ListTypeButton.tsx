import { useState } from 'react';
import { connect } from 'react-redux';
import { setFiltersActionCreator } from '../../../../../redux/actions/dashboardActions';
import { IrootStateAuthed } from '../../../../../redux/reducers/root/rootReducer';
import { TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../../../types/listVariants';
import ListTypeDrop from './ListTypeDrop';

interface Props {
    listVariantFilter: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS[];
}

const ListTypeButton: React.FC<Props> = ({}) => {
    const [open, setOpen] = useState(false);

    return (
        <span
            className={`dashboardFilterContainer-item ${open && 'dashboardFilterContainer-item-active'}`}
            onClick={() => setOpen(!open)}
        >
            List types <i className='fas fa-angle-down'></i>
            {open && <ListTypeDrop setOpen={setOpen}></ListTypeDrop>}
        </span>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    listVariantFilter: state.dashboardReducer.listVariantFilter,
});

export default connect(mapStateToProps, { setFiltersActionCreator })(ListTypeButton);
