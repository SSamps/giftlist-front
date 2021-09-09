import { useState } from 'react';
import { connect } from 'react-redux';
import { setFiltersActionCreator } from '../../../../../../../redux/actions/dashboardActions';
import { IrootStateAuthed } from '../../../../../../../redux/reducers/root/rootReducer';
import ListOwnershipDrop from './ListOwnershipDrop';

interface Props {
    listOwnershipFilter: 'anyone' | 'you' | 'others';
}

const ListOwnershipButton: React.FC<Props> = ({ listOwnershipFilter }) => {
    const [open, setOpen] = useState(false);

    return (
        <span className={`dashboardFilterControlBar-item ${open && 'dashboardFilterControlBar-item-active'}`}>
            <div
                onClick={() => {
                    setOpen(!open);
                }}
            >
                Owned by {listOwnershipFilter} <i className='fas fa-angle-down'></i>
            </div>
            {open && <ListOwnershipDrop setOpen={setOpen}></ListOwnershipDrop>}
        </span>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    listOwnershipFilter: state.dashboardReducer.listOwnershipFilter,
});

export default connect(mapStateToProps, { setFiltersActionCreator })(ListOwnershipButton);
