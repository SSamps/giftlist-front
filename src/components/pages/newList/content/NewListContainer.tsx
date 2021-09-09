import { Fragment } from 'react';
import { TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS } from '../../../../types/listVariants';
import ListExampleContainer from './listExampleCards/ListExampleContainer';
import ListFormContainer from './listForms.tsx/ListFormContainer';

interface Props {
    controllerState: TYPE_LIST_GROUP_ALL_TOP_LEVEL_VARIANTS;
}

const NewListContainer: React.FC<Props> = ({ controllerState }) => {
    return (
        <Fragment>
            <div className='newListContentOuterContainer'>
                <div className='newListContentContainer'>
                    <ListExampleContainer controllerState={controllerState}></ListExampleContainer>
                    <ListFormContainer controllerState={controllerState}></ListFormContainer>
                </div>
            </div>
        </Fragment>
    );
};

export default NewListContainer;
