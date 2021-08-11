interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit?: () => void;
    classes: string;
}

const DropdownUnderlay: React.FC<Props> = ({ setOpen, onSubmit, classes }) => {
    return (
        <div
            className={classes}
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
