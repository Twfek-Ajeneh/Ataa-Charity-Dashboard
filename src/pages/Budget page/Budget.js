// import react
import { Outlet } from 'react-router-dom';

//import components
import SecondNavbar from '../../components/Second Navbar/SecondNavbar';

// import style sheet 
import './Budget.css';

function Budget () {
    return (
        <div className='budget-page'>
            <SecondNavbar mainPath='budget' title1='الميزانية' title2={null} />
            <Outlet />
        </div>
    );
}

export default Budget;