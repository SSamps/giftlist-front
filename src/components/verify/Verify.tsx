import Spinner from '../misc/spinner';

interface Props {
    match: {
        params: { token: string };
    };
}

const Verify: React.FC<Props> = ({
    match: {
        params: { token },
    },
}) => {
    return (
        <div className='verifyContainer'>
            <Spinner className='spinner-large'></Spinner>
            {token}
        </div>
    );
};

export default Verify;
