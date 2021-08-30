import React from 'react';

interface props {
    isSelected: boolean;
    body: string;
    link?: string;
}

const BasicListExampleItem: React.FC<props> = ({ isSelected, body, link }) => {
    return (
        <div className='exampleItem'>
            <div className='exampleItem-main'>
                <span className='exampleItem-main-select'>
                    {isSelected ? (
                        <i className='far fa-check-square btn-simple-disabled'></i>
                    ) : (
                        <i className='far fa-square btn-simple-disabled'></i>
                    )}
                </span>
                <span className='exampleItem-main-body'>{body}</span>
                <span className='exampleItem-main-controlsContainer'>
                    <span className='exampleItem-main-controlsContainer-controls'>
                        <span className='fas fa-pen btn-simple-disabled'></span>
                        <span className='fas fa-times btn-simple-disabled'></span>
                    </span>
                </span>
            </div>
            {link && (
                <div className='listItem-links'>
                    <span className='listItem-links-linkContainer'>
                        <span className='btn-simple-disabled'>{link}</span>
                    </span>
                </div>
            )}
        </div>
    );
};

export default BasicListExampleItem;
