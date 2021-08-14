import React, { Fragment } from 'react';

interface Props {
    match: {
        params: { token: string };
    };
}

const ResetPassword: React.FC<Props> = ({
    match: {
        params: { token },
    },
}) => {
    return (
        <Fragment>
            <div>Reset Password</div>
            <div>{token}</div>
        </Fragment>
    );
};

export default ResetPassword;
