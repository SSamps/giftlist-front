import React from 'react';

interface props {
    isSelected: boolean;
    selectedBy?: string[];
    body: string;
    links?: string[];
    showControls: boolean;
    size?: 'small' | 'tiny';
    longBody?: boolean;
    longLinks?: boolean;
}

const ExampleListItem: React.FC<props> = ({
    isSelected,
    body,
    links,
    showControls,
    selectedBy,
    longBody,
    longLinks,
    size,
}) => {
    const renderSelectedBy = () => {
        if (!selectedBy || selectedBy.length < 1) {
            return null;
        }

        return selectedBy.length === 1 ? (
            <div className={`exampleListItem-selected ${size}`}>Selected by {selectedBy[0]}</div>
        ) : (
            <div className='exampleListItem-selected'>
                <span className={`${size}`}>
                    Shared by <span className='btn-simple-disabled'>{selectedBy.length} people</span>
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
                <span className={`exampleItem-main-body ${longBody ? 'exampleItem-main-body-long' : ''} ${size}`}>
                    {body}
                </span>
                {showControls && (
                    <span className='exampleItem-main-controlsContainer'>
                        <span className='exampleItem-main-controlsContainer-controls'>
                            <span className='fas fa-pen btn-simple-disabled'></span>
                            <span className='fas fa-times btn-simple-disabled'></span>
                        </span>
                    </span>
                )}
            </div>
            {links && (
                <div className='exampleItem-links'>
                    {links.map((link) => {
                        return (
                            <span className='exampleItem-links-linkContainer'>
                                <span
                                    className={`exampleItem-links-link ${
                                        longLinks ? 'exampleItem-links-link-long' : ''
                                    } btn-simple-disabled ${size}`}
                                >
                                    {link}
                                </span>
                            </span>
                        );
                    })}{' '}
                </div>
            )}
            {renderSelectedBy()}
        </div>
    );
};

export default ExampleListItem;
