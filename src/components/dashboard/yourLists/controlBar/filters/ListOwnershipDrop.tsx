import { connect } from 'react-redux';
import { setFiltersActionCreator } from '../../../../../redux/actions/dashboardActions';
import { IrootStateAuthed } from '../../../../../redux/reducers/root/rootReducer';

interface Props {
    listOwnershipFilter: 'anyone' | 'you' | 'others';
}

const ListOwnershipDrop: React.FC<Props> = ({ listOwnershipFilter }) => {
    return (
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
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    listOwnershipFilter: state.dashboardReducer.listOwnershipFilter,
});

export default connect(mapStateToProps, { setFiltersActionCreator })(ListOwnershipDrop);
