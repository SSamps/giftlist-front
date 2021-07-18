interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit?: () => void;
}

const DropdownUnderlay: React.FC<Props> = ({ setOpen, onSubmit }) => {
    return (
        <div
            className='underlay'
            onClick={() => {
                {
                    onSubmit && onSubmit();
                }
                setOpen(false);
            }}
        ></div>
    );
};

export default DropdownUnderlay;
