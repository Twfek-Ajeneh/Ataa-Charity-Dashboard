//import react
import React from 'react'
import { Outlet } from "react-router-dom";

//import components
import MainNavbar from "../../components/Main Navbar/MainNavbar";

//import style sheet
import './Dashboard.css';

function Dashboard (props) {
    return (
        <div className='dashboard'>
            <MainNavbar />
            <Outlet />
        </div>
    );
}

export default Dashboard;