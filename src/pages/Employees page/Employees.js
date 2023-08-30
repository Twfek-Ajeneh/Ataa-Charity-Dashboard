//import react
import React from 'react';
import { Outlet } from 'react-router-dom';

// import components
import SecondNavbar from '../../components/Second Navbar/SecondNavbar';

// import style sheet
import './Employees.css';

function Employees () {
    return (
        <div className='employees-page'>
            <SecondNavbar 
                mainPath='employees' 
                title1='الموظفين' 
                title2={localStorage.getItem('role') === 'مدير' ?  'إضافة موظف' : undefined}
            />
            <Outlet />
        </div>
    );
}

export default Employees;