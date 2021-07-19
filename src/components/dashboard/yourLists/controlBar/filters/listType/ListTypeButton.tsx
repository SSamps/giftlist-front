import { Fragment, useState } from 'react';
import ListTypeDrop from './ListTypeDrop';

const ListTypeButton: React.FC = ({}) => {
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <span className={`dashboardFilterControlBar-item ${open && 'dashboardFilterControlBar-item-active'}`}>
                <div onClick={() => setOpen(true)}>
                    {' '}
                    List types <i className='fas fa-angle-down'></i>
                </div>

                {open && <ListTypeDrop setOpen={setOpen}></ListTypeDrop>}
            </span>
        </Fragment>
    );
};

export default ListTypeButton;
