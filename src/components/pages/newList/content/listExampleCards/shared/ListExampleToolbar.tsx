import React from 'react';

interface props {
    title: string;
    size?: 'small';
}

const ListExampleToolbar: React.FC<props> = ({ title, size }) => {
    return (
        <ul className={`exampleTitleBar ${size && 'exampleTitleBar-' + size}`}>
            <li className={`exampleTitleBar-title text-groupName ${size ? 'text-' + size : ''}`}>{title}</li>
            <hr className='exampleTitleBar-hr'></hr>
        </ul>
    );
};

export default ListExampleToolbar;
