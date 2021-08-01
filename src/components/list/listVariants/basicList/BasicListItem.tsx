import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { TListItem } from '../../../../types/models/listItems';
import Spinner from '../../../misc/spinner';
import { deleteListItemActionCreator, TdeleteListItemActionCreator } from '../../../../redux/actions/listGroupActions';
import ModifyListItem from './ModifyListItem';

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

    const [modifyOverlayStatus, setModifyOverlayStatus] = useState(false);

    const onClickDelete = async () => {
        setRemovalStatus({ waiting: true, error: '' });
        try {
            await deleteListItemActionCreator(basicListId, basicListItem._id);
        } catch (err) {
            setRemovalStatus({ waiting: false, error: err.response.status });
        }
    };

    const hideModifyItemOverlay = () => {
        setModifyOverlayStatus(false);
    };

    const onClickModify = () => {
        setModifyOverlayStatus(true);
    };

    const shortenLink = (link: string) => {
        if (link.startsWith('https://www.')) {
            link = link.slice(12);
        } else if (link.startsWith('http://www.')) {
            link = link.slice(11);
        } else if (link.startsWith('https://')) {
            link = link.slice(8);
        } else if (link.startsWith('http://')) {
            link = link.slice(7);
        } else if (link.startsWith('www.')) {
            link = link.slice(4);
        }
        return link;
    };

    const { waiting } = removalStatus;
    return (
        <Fragment>
            {modifyOverlayStatus && (
                <ModifyListItem
                    hideModifyItemOverlay={hideModifyItemOverlay}
                    listItem={basicListItem}
                    listId={basicListId}
                ></ModifyListItem>
            )}
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
                                <span className='fas fa-pen btn-simple' onClick={onClickModify}></span>
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
                        const displayUrl = shortenLink(link);
                        return (
                            <span
                                className='basicListItem-links-linkContainer btn-simple'
                                key={`${basicListItem._id}_${index}`}
                            >
                                <a href={url} target='_blank' rel='noreferrer noopener'>
                                    {displayUrl}
                                </a>
                            </span>
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
};

export default connect(null, { deleteListItemActionCreator })(BasicListItem);
