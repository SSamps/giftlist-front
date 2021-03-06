import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setFiltersActionCreator, TsetFiltersActionCreator } from '../../../../../../../redux/actions/dashboardActions';
import { IrootStateAuthed } from '../../../../../../../redux/reducers/root/rootReducer';
import DropdownUnderlay from '../DropdownUnderlay';

interface Props {
    listVariantFilter: {
        basicListSelected: boolean;
        giftListSelected: boolean;
        giftGroupSelected: boolean;
    };
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setFiltersActionCreator: TsetFiltersActionCreator;
}

const ListTypeDrop: React.FC<Props> = ({ setOpen, listVariantFilter, setFiltersActionCreator }) => {
    let [dropdownState, setDropdownState] = useState(listVariantFilter);

    const { basicListSelected, giftListSelected, giftGroupSelected } = dropdownState;

    const onClick = (selection: 'basicListSelected' | 'giftListSelected' | 'giftGroupSelected', newState: boolean) => {
        setDropdownState({ ...dropdownState, [selection]: newState });
    };

    const onSubmit = () => {
        setFiltersActionCreator('listVariantFilter', dropdownState);
    };

    return (
        <Fragment>
            <div className='dropDown'>
                <div
                    className='dropDownItem dropDownItem-checkbox'
                    onClick={() => onClick('basicListSelected', !basicListSelected)}
                >
                    <span className='dropDownItem-name'>Basic List</span>{' '}
                    {basicListSelected ? (
                        <i className='far fa-check-square dropDownItem-icon'></i>
                    ) : (
                        <i className='far fa-square dropDownItem-icon'></i>
                    )}
                </div>
                <div
                    className='dropDownItem dropDownItem-checkbox'
                    onClick={() => onClick('giftListSelected', !giftListSelected)}
                >
                    <span className='dropDownItem-name'>Gift List</span>{' '}
                    {giftListSelected ? (
                        <i className='far fa-check-square dropDownItem-icon'></i>
                    ) : (
                        <i className='far fa-square dropDownItem-icon'></i>
                    )}
                </div>
                <div
                    className='dropDownItem dropDownItem-checkbox'
                    onClick={() => onClick('giftGroupSelected', !giftGroupSelected)}
                >
                    <span className='dropDownItem-name'>Gift Group</span>{' '}
                    {giftGroupSelected ? (
                        <i className='far fa-check-square dropDownItem-icon'></i>
                    ) : (
                        <i className='far fa-square dropDownItem-icon'></i>
                    )}
                </div>
            </div>
            <DropdownUnderlay setOpen={setOpen} onSubmit={onSubmit}></DropdownUnderlay>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    listVariantFilter: state.dashboardReducer.listVariantFilter,
});

export default connect(mapStateToProps, { setFiltersActionCreator })(ListTypeDrop);
