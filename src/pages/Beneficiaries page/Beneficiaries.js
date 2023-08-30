//import react
import React from 'react';
import { Outlet } from 'react-router-dom';

//import components
import SecondNavbar from '../../components/Second Navbar/SecondNavbar';

// import style sheet
import './Beneficiaries.css';

function Beneficiaries () {
    return (
        <div className='Beneficiaries-page'>
            <SecondNavbar mainPath='beneficiaries' title1='المستفيدين' title2='إضافة مستفيد'/>
            <Outlet />
        </div>
    );
}

export default Beneficiaries;