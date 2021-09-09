import React from 'react';
import ExampleListItem from '../shared/ExampleListItem';
import ListExampleToolbar from '../shared/ListExampleToolbar';

const BasicListExample: React.FC = () => {
    return (
        <div className='newListExampleCard newListExampleCard-basicList'>
            <ListExampleToolbar title={'Groceries'}></ListExampleToolbar>
            <div className='basicListExample-items'>
                <div className='listItemContainer'>
                    <ExampleListItem isSelected={true} body='All purpose flour' showControls={true}></ExampleListItem>
                    <ExampleListItem isSelected={true} body='Baking soda' showControls={true}></ExampleListItem>
                    <ExampleListItem isSelected={false} body='Salt' showControls={true}></ExampleListItem>
                    <ExampleListItem isSelected={false} body='Butter' showControls={true}></ExampleListItem>
                    <ExampleListItem isSelected={true} body='Brown sugar' showControls={true}></ExampleListItem>
                    <ExampleListItem isSelected={false} body='Eggs' showControls={true}></ExampleListItem>
                    <ExampleListItem isSelected={true} body='Chocolate chips' showControls={true}></ExampleListItem>
                </div>
                <div className='basicListExample-newItem'>
                    <div className='exampleNewItemContainer'>
                        <div>
                            <span className='btn-simple-disabled'>
                                <i className='fas fa-plus'></i> New item
                            </span>
                        </div>
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
