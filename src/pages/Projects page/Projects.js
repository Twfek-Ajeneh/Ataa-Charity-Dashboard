//import react
import React from 'react';
import { Outlet } from 'react-router-dom';

//import components
import SecondNavbar from '../../components/Second Navbar/SecondNavbar';

//import style sheet
import './Projects.css';

function Projects () {
    return (
        <div className='projects-page'>
            <SecondNavbar 
                mainPath='projects' 
                title1='المشاريع' 
                title2= {localStorage.getItem('role') !== 'موظف' ? 'إضافة مشروع' : undefined}
            />
            <Outlet />
        </div>
    );
}

export default Projects;