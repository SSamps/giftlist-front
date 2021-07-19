import { Fragment, useState } from 'react';
import { BASIC_LIST, TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../types/listVariants';
import NewListContainer from './content/NewListContainer';
import NewListControls from './controls/NewListControls';

interface Props {}
const NewListPage: React.FC<Props> = (): JSX.Element => {
    const [controllerState, setControllerState] = useState<TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS>(BASIC_LIST);

    return (
        <Fragment>
            <NewListControls
                controllerState={controllerState}
                setControllerState={setControllerState}
            ></NewListControls>
            <NewListContainer controllerState={controllerState}></NewListContainer>
        </Fragment>
    );
};

export default NewListPage;
