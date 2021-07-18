interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownUnderlay: React.FC<Props> = ({ setOpen }) => {
    return (
        <div
            className='underlay'
            onClick={() => {
                setOpen(false);
            }}
        ></div>
    );
};

export default DropdownUnderlay;
