import { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import List from './List';

interface Props {
    authLoading: boolean;
    match: {
        params: { listid: string };
    };
}

const ListPage: React.FC<Props> = ({
    match: {
        params: { listid },
    },
    authLoading,
}): JSX.Element => {
    return (
        <Fragment>
            {authLoading ? (
                <div>Loading</div>
            ) : (
                <Fragment>
                    <List listid={listid}></List>
                </Fragment>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    authLoading: state.authReducer.loading,
});

export default connect(mapStateToProps)(ListPage);
