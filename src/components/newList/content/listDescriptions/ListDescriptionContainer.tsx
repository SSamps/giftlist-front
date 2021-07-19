import { TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../../types/listVariants';

interface Props {
    controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS;
}

const ListDescriptionContainer: React.FC<Props> = ({ controllerState }) => {
    return <div className='newListDescription'>{controllerState} Description</div>;
};

export default ListDescriptionContainer;
