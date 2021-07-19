import { BASIC_LIST, GIFT_GROUP, GIFT_LIST, TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../types/listVariants';
import NewListSelectorButton from './NewListSelectorButton';

interface Props {
    controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS;
    setControllerState: React.Dispatch<React.SetStateAction<TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS>>;
}

const NewListSelector: React.FC<Props> = ({ controllerState, setControllerState }) => {
    return (
        <div className='newListControls-selectorContainer'>
            <div onClick={() => setControllerState(BASIC_LIST)}>
                <NewListSelectorButton active={controllerState === BASIC_LIST && true}>
                    Basic List
                </NewListSelectorButton>
            </div>
            <div onClick={() => setControllerState(GIFT_LIST)}>
                <NewListSelectorButton active={controllerState === GIFT_LIST && true}>Gift List</NewListSelectorButton>
            </div>
            <div onClick={() => setControllerState(GIFT_GROUP)}>
                <NewListSelectorButton active={controllerState === GIFT_GROUP && true}>
                    Gift Group
                </NewListSelectorButton>
            </div>
        </div>
    );
};

export default NewListSelector;
