import { connect } from 'react-redux';
import { setFiltersActionCreator } from '../../../../../redux/actions/dashboardActions';
import { IrootStateAuthed } from '../../../../../redux/reducers/root/rootReducer';
import { TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../../../types/listVariants';

interface Props {
    listVariantFilter: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS[];
}

const ListTypeDrop: React.FC<Props> = () => {
    return (
        <div className='dropDown'>
            <div className='dropDownItem'>Basic List</div>
            <div className='dropDownItem'>Gift List</div>
            <div className='dropDownItem'>Gift Group</div>
        </div>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    listVariantFilter: state.dashboardReducer.listVariantFilter,
});

export default connect(mapStateToProps, { setFiltersActionCreator })(ListTypeDrop);
