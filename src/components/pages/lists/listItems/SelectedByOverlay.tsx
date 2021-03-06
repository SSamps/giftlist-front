import React, { Fragment } from 'react';
import DropdownUnderlay from '../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedBy: string[] | undefined[];
}

const SelectedByOverlay: React.FC<Props> = ({ setOpen, selectedBy }) => {
    return (
        <Fragment>
            <div className='overlay'>
                <div className='overlayContainer'>
                    <div className='text-header'>This has been selected by:</div>
                    <div className='memberList'>
                        {selectedBy.map((name, index) => {
                            return (
                                <span key={`selectedBy-${index}`} className=''>
                                    {name}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen} extraClasses={'underlay-focus'}></DropdownUnderlay>
        </Fragment>
    );
};

export default SelectedByOverlay;
