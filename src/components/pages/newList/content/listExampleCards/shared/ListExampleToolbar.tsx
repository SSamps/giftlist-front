import React from 'react';

interface props {
    title: string;
}

const ListExampleToolbar: React.FC<props> = ({ title }) => {
    return (
        <ul className='exampleTitleBar'>
            <li className='exampleTitleBar-title groupName'>{title}</li>
            <li className='exampleTitleBar-controls'>
                <i className='fas fa-ellipsis-v'></i>
            </li>
            <hr className='exampleTitleBar-hr'></hr>
        </ul>
    );
};

export default ListExampleToolbar;
