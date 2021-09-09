import { Fragment } from 'react';
import Spinner from '../../../../misc/spinner';

interface Props {
    children: string;
}

export const FormSubmissionStatus: React.FC<Props> = ({ children }) => {
    return (
        <Fragment>
            <div>
                <Spinner className='spinner-tiny'></Spinner>
            </div>
            <div>{children}</div>
        </Fragment>
    );
};
