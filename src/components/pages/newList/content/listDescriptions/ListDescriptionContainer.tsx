import {
    BASIC_LIST,
    GIFT_GROUP,
    GIFT_LIST,
    TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS,
} from '../../../../../types/listVariants';
import BasicListDescription from './BasicListDescription';
import GiftGroupDescription from './GiftGroupDescription';
import GiftListDescription from './GiftListDescription';

interface Props {
    controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS;
}

const renderDescription = (controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS) => {
    switch (controllerState) {
        case BASIC_LIST:
            return <BasicListDescription></BasicListDescription>;
        case GIFT_LIST:
            return <GiftListDescription></GiftListDescription>;
        case GIFT_GROUP:
            return <GiftGroupDescription></GiftGroupDescription>;
    }
};

const ListDescriptionContainer: React.FC<Props> = ({ controllerState }) => {
    return <div className='newListDescriptionContainer'>{renderDescription(controllerState)}</div>;
};

export default ListDescriptionContainer;
