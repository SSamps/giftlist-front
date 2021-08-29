import React from 'react';

import {
    TbasicListFields,
    TgiftGroupChildFieldsCensored,
    TgiftGroupFields,
    TgiftListFieldsCensored,
} from '../../../../../types/models/listGroups';

interface props {
    list: TbasicListFields | TgiftListFieldsCensored | TgiftGroupFields | TgiftGroupChildFieldsCensored;
    listVariant: string;
}

const PreviewCardHeader: React.FC<props> = ({ list, listVariant }) => {
    return (
        <div className='listPreviewCard-header'>
            <div className='listPreviewCard-header-name'>{list.groupName}</div>
            <div className='listPreviewCard-header-variant'>- {listVariant} -</div>
        </div>
    );
};

export default PreviewCardHeader;
