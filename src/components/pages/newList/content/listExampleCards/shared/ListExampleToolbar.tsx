import React from 'react';

interface props {
    title: string;
    size?: string;
}

const ListExampleToolbar: React.FC<props> = ({ title, size }) => {
    return (
        <ul className='exampleTitleBar'>
            <li className={`exampleTitleBar-title groupName ${size ? size : ''}`}>{title}</li>
            <li className='exampleTitleBar-controls'>
                <i className={`fas fa-ellipsis-v ${size ? size : ''}`}></i>
            </li>
            <hr className='exampleTitleBar-hr'></hr>
        </ul>
    );
};

export default ListExampleToolbar;
