import React from 'react';
import BasicListExampleItem from '../shared/ExampleListItem';
import ListExampleToolbar from '../shared/ListExampleToolbar';
import ExampleChatMessage from './ExampleChatMessage';

const GiftListExample: React.FC = () => {
    const ownerName = 'Alex';
    return (
        <div className='newListExampleCard newListExampleCard-giftList'>
            <ListExampleToolbar title={`${ownerName}'s Birthday List`}></ListExampleToolbar>
            <div className='basicListExample-items'>
                <div className='listItemContainer'>
                    <div className='systemMessage'>
                        <i className='fas fa-eye-slash danger'></i>{' '}
                        <span>
                            {ownerName} <strong>can't</strong> see your selection
                        </span>
                    </div>
                    <div className='giftListListLabel systemMessage'>{ownerName}'s list</div>
                    <BasicListExampleItem
                        isSelected={true}
                        selectedBy={['You']}
                        body='These climbing shoes'
                        showControls={false}
                        link={'yeoldeclimbingshoppe.com/reallyniceshoes'}
                    ></BasicListExampleItem>
                    <BasicListExampleItem
                        isSelected={false}
                        selectedBy={['Sarah', 'Charlie']}
                        body='Socks with penguins on them'
                        showControls={false}
                    ></BasicListExampleItem>
                    <BasicListExampleItem
                        isSelected={false}
                        body='A terrarium for my desk'
                        showControls={false}
                    ></BasicListExampleItem>
                </div>
            </div>
            <div className='basicListExample-items'>
                <div className='listItemContainer'>
                    <div className='systemMessage'>
                        <i className='fas fa-eye-slash danger'></i>{' '}
                        <span>
                            {ownerName} <strong>can't</strong> see added gift ideas
                        </span>
                    </div>
                    <div className='giftListListLabel systemMessage'>
                        <span>Gift ideas</span>
                    </div>
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
            <div className='exampleChatContainer'>
                <div className='systemMessage'>
                    <i className='fas fa-eye-slash danger'></i>{' '}
                    <span>
                        {ownerName} <strong>can't</strong> see your chat
                    </span>
                </div>
                <div className='exampleChatContainer-listChat'>
                    <ExampleChatMessage
                        message={'Hello there'}
                        author={'Alex'}
                        type='otherUser'
                        date='yesterday'
                    ></ExampleChatMessage>
                    <ExampleChatMessage
                        message={'Hello there'}
                        author={'Ben'}
                        type='currentUser'
                        date='yesterday'
                    ></ExampleChatMessage>
                </div>
                <div className='listChatControlsContainer'>
                    <form className='form form-singleInput'>
                        <input type='text' placeholder='Type a message'></input>
                        <span className='btn-simple'>Send</span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GiftListExample;
