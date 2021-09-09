import React from 'react';
import ExampleListItem from '../shared/ExampleListItem';
import ListExampleToolbar from '../shared/ListExampleToolbar';

const GiftListExample: React.FC = () => {
    const ownerName = 'Alex';
    return (
        <div className='newListExampleCard newListExampleCard-giftList'>
            <ListExampleToolbar title={`${ownerName}'s Birthday List`}></ListExampleToolbar>
            <div className='basicListExample-items'>
                <div className='exampleListItemContainer'>
                    <div className='exampleListLabel'>
                        <div className='systemMessage'>{ownerName}'s list</div>
                        <div className='systemMessage'>
                            <i className='fas fa-eye-slash'></i>{' '}
                            <span>
                                {ownerName} <strong>can't</strong> see your selection
                            </span>
                        </div>
                    </div>
                    <ExampleListItem
                        isSelected={true}
                        selectedBy={['You']}
                        body='These climbing shoes'
                        showControls={false}
                        links={['yeoldeclimbingshoppe.com/reallyniceshoes']}
                        longBody={true}
                        longLinks={true}
                    ></ExampleListItem>
                    <ExampleListItem
                        isSelected={false}
                        body='Socks with penguins on them'
                        showControls={false}
                        longBody={true}
                        longLinks={true}
                    ></ExampleListItem>
                    <ExampleListItem
                        isSelected={false}
                        body='A terrarium for my desk'
                        selectedBy={['Sarah', 'Charlie']}
                        showControls={false}
                        longBody={true}
                        longLinks={true}
                    ></ExampleListItem>
                </div>
            </div>
            <div className='basicListExample-items'>
                <div className='exampleListItemContainer'>
                    <div className='exampleListLabel'>
                        <div className='systemMessage'>Gift ideas</div>
                        <div className='systemMessage'>
                            <i className='fas fa-eye-slash'></i>{' '}
                            <span>
                                {ownerName} <strong>can't</strong> see added gift ideas
                            </span>
                        </div>
                    </div>
                    <ExampleListItem isSelected={false} body='Cast iron pan' showControls={false}></ExampleListItem>
                    <ExampleListItem
                        isSelected={false}
                        body='Tickets to something?'
                        showControls={true}
                    ></ExampleListItem>
                </div>
                <div className='basicListExample-newItem'>
                    <div className='exampleNewItemContainer'>
                        <div>
                            <span className='btn-simple-disabled'>
                                <i className='fas fa-plus'></i> Gift idea
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftListExample;
