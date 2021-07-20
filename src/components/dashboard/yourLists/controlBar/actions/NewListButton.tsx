import { Link } from 'react-router-dom';

const NewListButton: React.FC = () => {
    return (
        <span className='dashboardFilterControlBar-newList'>
            <Link to='/list/newlist' className='dashboardFilterControlBar-item'>
                {' '}
                <i className='fas fa-plus'></i> Add a new list
            </Link>
        </span>
    );
};
export default NewListButton;
