import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { TalertData } from '../../redux/reducers/alertReducer';
import { IrootState } from '../../redux/reducers/root/rootReducer';

interface Props {
    alerts: TalertData;
}

const Alerts: React.FC<Props> = ({ alerts }) => {
    const renderAlerts = () => {
        return (
            <div className='alert-container'>
                {alerts.map((alert) => {
                    return (
                        <div key={alert.id} className={`alert alert-${alert.type}`}>
                            {alert.message}
                        </div>
                    );
                })}
            </div>
        );
    };

    return <Fragment>{alerts.length > 0 && renderAlerts()}</Fragment>;
};

const mapStateToProps = (state: IrootState) => ({
    alerts: state.alertReducer,
});

export default connect(mapStateToProps)(Alerts);
