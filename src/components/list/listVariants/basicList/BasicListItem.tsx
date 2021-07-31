import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TListItem } from '../../../../types/models/listItems';
import Spinner from '../../../misc/spinner';
import { deleteListItemActionCreator, TdeleteListItemActionCreator } from '../../../../redux/actions/listGroupActions';

interface Props {
    basicListItem: TListItem;
    basicListId: string;
    deleteListItemActionCreator: TdeleteListItemActionCreator;
}

const BasicListItem: React.FC<Props> = ({ basicListItem, basicListId, deleteListItemActionCreator }) => {
    const [removalStatus, setRemovalStatus] = useState({
        waiting: false,
        error: '',
    });

    const onClickDelete = async () => {
        setRemovalStatus({ waiting: true, error: '' });
        try {
            await deleteListItemActionCreator(basicListId, basicListItem._id);
        } catch (err) {
            setRemovalStatus({ waiting: false, error: err.response.status });
        }
    };

    const { waiting } = removalStatus;
    return (
        <div className='basicListItem'>
            <div className='basicListItem-main'>
                <span className='basicListItem-main-body'>{basicListItem.body}</span>
                <span className='basicListItem-main-selection'>{basicListItem.selectedBy}</span>
                <span className='basicListItem-main-controlsContainer'>
                    {waiting ? (
                        <span>
                            <Spinner className='spinner-tiny'></Spinner>
                        </span>
                    ) : (
                        <span className='basicListItem-main-controlsContainer-controls'>
                            <span className='fas fa-pen btn-simple'></span>
                            <span onClick={onClickDelete} className='fas fa-times btn-simple'></span>
                        </span>
                    )}
                </span>
            </div>
            <div className='basicListItem-links'>
                {basicListItem.links.map((link, index) => {
                    let url;
                    if (link.startsWith('http://') || link.startsWith('https://')) {
                        url = link;
                    } else {
                        url = 'http://' + link;
                    }
                    return (
                        <a
                            href={url}
                            target='_blank'
                            rel='noreferrer noopener'
                            className='btn-simple'
                            key={`${basicListItem._id}_${index}`}
                        >
                            {link}
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default connect(null, { deleteListItemActionCreator })(BasicListItem);
