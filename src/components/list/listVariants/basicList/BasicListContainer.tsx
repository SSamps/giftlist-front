import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { IrootState } from '../../../../redux/reducers/root/rootReducer';
import { TlistGroupAnyFieldsUncensored } from '../../../../types/models/listGroups';
import { IgroupData } from '../../ListLoader';
import BasicListItem from './BasicListItem';

interface Props {
    basicList: TlistGroupAnyFieldsUncensored;
    setGroupData: React.Dispatch<React.SetStateAction<IgroupData>>;
    groupData: IgroupData;
}

export const BasicListContainer: React.FC<Props> = ({ basicList, setGroupData, groupData }) => {
    useEffect(() => {}, [basicList]);
    console.log(basicList);
    return (
        <Fragment>
            <div>
                <div>{basicList.groupName}</div>
                <hr></hr>
                <div>
                    {basicList.listItems.map((item) => {
                        return (
                            <BasicListItem
                                key={item._id}
                                basicListItem={item}
                                basicListId={basicList._id}
                                groupData={groupData}
                                setGroupData={setGroupData}
                            ></BasicListItem>
                        );
                    })}
                    {basicList.listItems.length < basicList.maxListItems && <p>Add a new item</p>}
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps)(BasicListContainer);
