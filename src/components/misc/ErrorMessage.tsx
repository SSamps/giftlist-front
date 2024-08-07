interface Props {
    errorText: string;
}

const ErrorMessage: React.FC<Props> = ({ errorText }) => {
    return <div className='form-error-message'>{errorText}</div>;
};

export default ErrorMessage;
