import {
    BASIC_LIST,
    GIFT_GROUP,
    GIFT_LIST,
    TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS,
} from '../../../../../types/listVariants';
import BasicListExample from './basicList/BasicListExample';
import GiftGroupExample from './GiftGroupExample';
import GiftListExample from './gistList/GiftListExample';

interface Props {
    controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS;
}

const renderCard = (controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS) => {
    switch (controllerState) {
        case BASIC_LIST:
            return <BasicListExample></BasicListExample>;
        case GIFT_LIST:
            return <GiftListExample></GiftListExample>;
        case GIFT_GROUP:
            return <GiftGroupExample></GiftGroupExample>;
    }
};

const ListExampleContainer: React.FC<Props> = ({ controllerState }) => {
    return <div className='newListExampleContainer'>{renderCard(controllerState)}</div>;
};

export default ListExampleContainer;
