import {
    BASIC_LIST,
    GIFT_GROUP,
    GIFT_LIST,
    TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS,
} from '../../../../../types/listVariants';
import BasicListDescription from '../listDescriptions/BasicListDescription';
import GiftGroupDescription from '../listDescriptions/GiftGroupDescription';
import GiftListDescription from '../listDescriptions/GiftListDescription';
import BasicListExample from './basicList/BasicListExample';
import GiftGroupExample from './giftGroup/GiftGroupExample';
import GiftListExample from './giftList/GiftListExample';

interface Props {
    controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS;
}

const renderCard = (controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS) => {
    switch (controllerState) {
        case BASIC_LIST:
            return (
                <div className='newListExampleContainer-inner'>
                    <BasicListDescription></BasicListDescription>
                    <BasicListExample></BasicListExample>
                </div>
            );
        case GIFT_LIST:
            return (
                <div className='newListExampleContainer-inner'>
                    <GiftListDescription></GiftListDescription>
                    <GiftListExample></GiftListExample>
                </div>
            );
        case GIFT_GROUP:
            return (
                <div className='newListExampleContainer-inner'>
                    <GiftGroupDescription></GiftGroupDescription>
                    <GiftGroupExample></GiftGroupExample>
                </div>
            );
    }
};

const ListExampleContainer: React.FC<Props> = ({ controllerState }) => {
    return <div className='newListExampleContainer'>{renderCard(controllerState)}</div>;
};

export default ListExampleContainer;
