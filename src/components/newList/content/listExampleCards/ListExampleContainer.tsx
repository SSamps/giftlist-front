import { TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../../types/listVariants';

interface Props {
    controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS;
}

const ListExampleContainer: React.FC<Props> = ({ controllerState }) => {
    return <div className='newListExample'>{controllerState} Example Card</div>;
};

export default ListExampleContainer;
