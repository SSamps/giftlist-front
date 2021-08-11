import { TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../../../types/listVariants';
import NewListForm from './NewListForm';

interface Props {
    controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS;
}

const ListFormContainer: React.FC<Props> = ({ controllerState }) => {
    return (
        <div className='newListFormContainer'>
            <NewListForm controllerState={controllerState}></NewListForm>
        </div>
    );
};

export default ListFormContainer;
