import { Fragment } from 'react';
import spinner from '../../resources/img/Spinner.svg';

const Spinner = ({ className }: { className: 'spinner-large' | 'spinner-tiny' }) => {
    return (
        <Fragment>
            <img src={spinner} className={className} alt='Loading...' />
        </Fragment>
    );
};

export default Spinner;
