import React from 'react';
import BasicListExampleItem from './BasicListExampleItem';
import ListExampleToolbar from './ListExampleToolbar';

const BasicListExample: React.FC = () => {
    return (
        <div className='newListExampleCard newListExampleCard-basicList'>
            <ListExampleToolbar title={'Grocery List'}></ListExampleToolbar>
            <div className='basicListExample-items'>
                <div className='listItemContainer'>
                    <BasicListExampleItem isSelected={true} body='All purpose flour'></BasicListExampleItem>
                    <BasicListExampleItem isSelected={true} body='Baking soda'></BasicListExampleItem>
                    <BasicListExampleItem isSelected={false} body='Salt'></BasicListExampleItem>
                    <BasicListExampleItem isSelected={false} body='Butter'></BasicListExampleItem>
                    <BasicListExampleItem isSelected={true} body='Brown sugar'></BasicListExampleItem>
                    <BasicListExampleItem isSelected={false} body='Eggs'></BasicListExampleItem>
                    <BasicListExampleItem isSelected={true} body='Chocolate chips'></BasicListExampleItem>
                </div>
            </div>
            <div className='basicListExample-newItem'>
                <div className='listNewItemContainer'>
                    <div>
                        <span className='btn-simple-disabled'>
                            <i className='fas fa-plus'></i> New item
                        </span>
                    </div>
                </div>
            </div>
            <div className='basicListExample-deleteButtons'>
                <span className='basicListExample-deleteButtons-button'>
                    <span className='btn-simple-disabled'>Delete selected</span>
                </span>
                <span className='basicListExample-deleteButtons-button'>
                    <span className='btn-simple-disabled'>Delete all</span>
                </span>
            </div>
        </div>
    );
};

export default BasicListExample;
