import { TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../../types/listVariants';

interface Props {
    controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS;
}

const ListFormContainer: React.FC<Props> = ({ controllerState }) => {
    return <div className='newListFormContainer'>{controllerState} Form</div>;
};

export default ListFormContainer;
