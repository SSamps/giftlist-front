import React from 'react';
import ExampleListItem from '../shared/ExampleListItem';
import ListExampleToolbar from '../shared/ListExampleToolbar';

interface props {
    ownerName: string;
}

export const GiftGroupMiniExampleCard: React.FC<props> = ({ ownerName }) => {
    return (
        <div className='giftGroupMiniExampleCard'>
            <ListExampleToolbar title={`${ownerName}'s List`} size='small'></ListExampleToolbar>
            <div className='basicListExample-items'>
                <div className='exampleListItemContainer'>
                    <div className='exampleListLabel'>
                        <div className='systemMessage tiny '>{ownerName}'s list</div>
                        <div className='systemMessage '>
                            <i className='fas fa-eye-slash tiny'></i>{' '}
                            <span className='tiny'>
                                {ownerName} <strong>can't</strong> see your selection
                            </span>
                        </div>
                    </div>
                    <ExampleListItem
                        isSelected={false}
                        selectedBy={['Mum']}
                        body="Chef's knife"
                        showControls={false}
                        longBody={true}
                        longLinks={true}
                    ></ExampleListItem>
                    <ExampleListItem
                        isSelected={false}
                        body='Replacement for my old watch'
                        showControls={false}
                        link={'yeoldeclimbingshoppe.com/reallyniceshoes'}
                        size='tiny'
                        longBody={true}
                        longLinks={true}
                    ></ExampleListItem>
                    <ExampleListItem
                        isSelected={true}
                        body='Hugs!'
                        selectedBy={['Sarah', 'Charlie']}
                        showControls={false}
                        longBody={true}
                        longLinks={true}
                    ></ExampleListItem>
                </div>
            </div>
        </div>
    );
};

export default GiftGroupMiniExampleCard;
