import { Link } from 'react-router-dom';

const NewListButton: React.FC = () => {
    return (
        <span className='dashboardFilterContainer-newList'>
            <Link to='/list/variants' className='dashboardFilterContainer-item'>
                {' '}
                <i className='fas fa-plus'></i> Add a new list
            </Link>
        </span>
    );
};
export default NewListButton;
