import { TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../../types/listVariants';
import NewListSelector from './NewListSelector';

interface Props {
    controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS;
    setControllerState: React.Dispatch<React.SetStateAction<TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS>>;
}

const NewListControls: React.FC<Props> = ({ controllerState, setControllerState }) => {
    return (
        <div className='newListControls'>
            <NewListSelector
                controllerState={controllerState}
                setControllerState={setControllerState}
            ></NewListSelector>

            <hr className='newListControls-hr'></hr>
        </div>
    );
};

export default NewListControls;
