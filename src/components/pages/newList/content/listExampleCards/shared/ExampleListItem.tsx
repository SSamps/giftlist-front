import React from 'react';

interface props {
    isSelected: boolean;
    selectedBy?: string[];
    body: string;
    link?: string;
    showControls: boolean;
}

const BasicListExampleItem: React.FC<props> = ({ isSelected, body, link, showControls, selectedBy }) => {
    const renderSelectedBy = () => {
        if (!selectedBy || selectedBy.length < 1) {
            return null;
        }

        return selectedBy.length === 1 ? (
            <div className='listItem-selected'>Selected by {selectedBy[0]}</div>
        ) : (
            <div className='listItem-selected'>
                <span>
                    Shared by <span className='btn-simple'>{selectedBy.length} people</span>
                </span>
            </div>
        );
    };

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
                {showControls && (
                    <span className='exampleItem-main-controlsContainer'>
                        <span className='exampleItem-main-controlsContainer-controls'>
                            <span className='fas fa-pen btn-simple-disabled'></span>
                            <span className='fas fa-times btn-simple-disabled'></span>
                        </span>
                    </span>
                )}
            </div>
            {link && (
                <div className='listItem-links'>
                    <span className='listItem-links-linkContainer'>
                        <span className='btn-simple-disabled'>{link}</span>
                    </span>
                </div>
            )}
            {renderSelectedBy()}
        </div>
    );
};

export default BasicListExampleItem;
