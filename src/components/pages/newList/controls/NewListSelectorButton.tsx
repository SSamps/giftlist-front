interface Props {
    children: string;
    active: boolean;
}

const NewListSelectorButton: React.FC<Props> = ({ children, active }) => {
    return <div className={`newListControls-button ${active && 'newListControls-button-active'}`}>{children}</div>;
};

export default NewListSelectorButton;
