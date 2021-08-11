interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit?: () => void;
    extraClasses?: string;
}

const DropdownUnderlay: React.FC<Props> = ({ setOpen, onSubmit, extraClasses }) => {
    return (
        <div
            className={'underlay ' + extraClasses}
            onClick={() => {
                if (onSubmit) {
                    onSubmit();
                }

                setOpen(false);
            }}
        ></div>
    );
};

export default DropdownUnderlay;
