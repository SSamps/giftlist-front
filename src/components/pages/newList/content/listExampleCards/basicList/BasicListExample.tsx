import React from 'react';
import BasicListExampleItem from '../shared/ExampleListItem';
import ListExampleToolbar from '../shared/ListExampleToolbar';

const BasicListExample: React.FC = () => {
    return (
        <div className='newListExampleCard newListExampleCard-basicList'>
            <ListExampleToolbar title={'Groceries'}></ListExampleToolbar>
            <div className='basicListExample-items'>
                <div className='listItemContainer'>
                    <BasicListExampleItem
                        isSelected={true}
                        body='All purpose flour'
                        showControls={true}
                    ></BasicListExampleItem>
                    <BasicListExampleItem
                        isSelected={true}
                        body='Baking soda'
                        showControls={true}
                    ></BasicListExampleItem>
                    <BasicListExampleItem isSelected={false} body='Salt' showControls={true}></BasicListExampleItem>
                    <BasicListExampleItem isSelected={false} body='Butter' showControls={true}></BasicListExampleItem>
                    <BasicListExampleItem
                        isSelected={true}
                        body='Brown sugar'
                        showControls={true}
                    ></BasicListExampleItem>
                    <BasicListExampleItem isSelected={false} body='Eggs' showControls={true}></BasicListExampleItem>
                    <BasicListExampleItem
                        isSelected={true}
                        body='Chocolate chips'
                        showControls={true}
                    ></BasicListExampleItem>
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
