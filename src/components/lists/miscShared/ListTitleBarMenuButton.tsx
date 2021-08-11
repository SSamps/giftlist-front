import { useState } from 'react';
import ListTitleBarMenuDropdown from './ListTitleBarMenuDropdown';

const ListTitleBarMenuButton: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <li className={`ListTitleBar-controls ${open && 'ListTitleBar-controls-active'}`}>
            <span>
                <i
                    className='fas fa-ellipsis-v'
                    onClick={() => {
                        setOpen(!open);
                    }}
                ></i>
            </span>
            {open && <ListTitleBarMenuDropdown setOpen={setOpen}></ListTitleBarMenuDropdown>}
        </li>
    );
};

export default ListTitleBarMenuButton;
