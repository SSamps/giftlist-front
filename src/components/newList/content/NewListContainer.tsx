import { Fragment } from 'react';
import { TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../types/listVariants';
import ListDescriptionContainer from './listDescriptions/ListDescriptionContainer';
import ListExampleContainer from './listExampleCards/ListExampleContainer';
import ListFormContainer from './listForms.tsx/ListFormContainer';

interface Props {
    controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS;
}

const NewListContainer: React.FC<Props> = ({ controllerState }) => {
    return (
        <Fragment>
            <div className='newListContent'>
                <ListDescriptionContainer controllerState={controllerState}></ListDescriptionContainer>
                <ListExampleContainer controllerState={controllerState}></ListExampleContainer>
                <ListFormContainer controllerState={controllerState}></ListFormContainer>
            </div>
        </Fragment>
    );
};

export default NewListContainer;
