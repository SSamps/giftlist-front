import { useState } from 'react';
import ListOwnershipDrop from './ListOwnershipDrop';

const ListOwnershipFilter: React.FC = ({}) => {
    const [open, setOpen] = useState(false);

    return (
        <span className='dashboardFilterContainer-item' onClick={() => setOpen(!open)}>
            Ownership filter <i className='fas fa-angle-down'></i>
            {open && <ListOwnershipDrop></ListOwnershipDrop>}
        </span>
    );
};

export default ListOwnershipFilter;
