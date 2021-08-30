import {
    BASIC_LIST,
    GIFT_GROUP,
    GIFT_LIST,
    TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS,
} from '../../../../../types/listVariants';
import NewListForm from './NewListForm';

interface Props {
    controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS;
}

const ListFormContainer: React.FC<Props> = ({ controllerState }) => {
    const getListType = () => {
        switch (controllerState) {
            case BASIC_LIST:
                return 'Basic List';
            case GIFT_LIST:
                return 'Gift List';
            case GIFT_GROUP:
                return 'Gift Group';
        }
    };

    return (
        <div className='newListFormContainer'>
            <div className='lead'>Create your {getListType()}</div>
            <NewListForm controllerState={controllerState}></NewListForm>
        </div>
    );
};

export default ListFormContainer;
