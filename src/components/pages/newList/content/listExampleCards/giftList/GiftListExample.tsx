import React from 'react';
import BasicListExampleItem from '../shared/ExampleListItem';
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
                            <i className='fas fa-eye-slash danger'></i>{' '}
                            <span>
                                {ownerName} <strong>can't</strong> see your selection
                            </span>
                        </div>
                    </div>
                    <BasicListExampleItem
                        isSelected={true}
                        selectedBy={['You']}
                        body='These climbing shoes'
                        showControls={false}
                        link={'yeoldeclimbingshoppe.com/reallyniceshoes'}
                    ></BasicListExampleItem>
                    <BasicListExampleItem
                        isSelected={false}
                        body='Socks with penguins on them'
                        showControls={false}
                    ></BasicListExampleItem>
                    <BasicListExampleItem
                        isSelected={false}
                        body='A terrarium for my desk'
                        selectedBy={['Sarah', 'Charlie']}
                        showControls={false}
                    ></BasicListExampleItem>
                </div>
            </div>
            <div className='basicListExample-items'>
                <div className='exampleListItemContainer'>
                    <div className='exampleListLabel'>
                        <div className='systemMessage'>Gift ideas</div>
                        <div className='systemMessage'>
                            <i className='fas fa-eye-slash danger'></i>{' '}
                            <span>
                                {ownerName} <strong>can't</strong> see added gift ideas
                            </span>
                        </div>
                    </div>
                    <BasicListExampleItem
                        isSelected={false}
                        body='Cast iron pan'
                        showControls={false}
                    ></BasicListExampleItem>
                    <BasicListExampleItem
                        isSelected={false}
                        body='Tickets to something?'
                        showControls={true}
                    ></BasicListExampleItem>
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
