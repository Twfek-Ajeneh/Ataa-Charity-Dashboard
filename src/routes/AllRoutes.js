// import react
import React from 'react';
import { Route , Routes , Navigate } from 'react-router-dom'

//import components & pages
import Home from '../pages/Home Page/Home';
import Login from '../pages/Login page/Login';
import Dashboard from '../pages/Dashboard page/Dashboard';
import Projects from '../pages/Projects page/Projects';
import Beneficiaries from '../pages/Beneficiaries page/Beneficiaries'; 
import Employees from '../pages/Employees page/Employees';
import Budget from '../pages/Budget page/Budget';
import AllProjects from '../pages/Projects page/AllProjects/AllProjects';
import AddProject from '../pages/Projects page/AddProject/AddProject';
import EditProject from '../pages/Projects page/EditProject/EditProject';
import ProjectDetails from '../pages/Projects page/ProjectDetails/ProjectDetails';
import AllBeneficiaries from '../pages/Beneficiaries page/AllBeneficiaries/AllBeneficiaries';
import AddBeneficiaries from '../pages/Beneficiaries page/AddBeneficiaries/AddBeneficiaries';
import EditBeneficiaries from '../pages/Beneficiaries page/EditBeneficiaries/EditBeneficiaries';
import BeneficiariesDetails from '../pages/Beneficiaries page/BeneficiariesDetails/BeneficiariesDetails';
import AllEmployees from '../pages/Employees page/AllEmployees/AllEmployees';
import AddEmployee from '../pages/Employees page/AddEmployee/AddEmployee';
import EditEmployee from '../pages/Employees page/EditEmployee/EditEmployee';
import EmployeeDetails from '../pages/Employees page/EmployeeDetails/EmployeeDetails';
import AllBudget from '../pages/Budget page/AllBudget/AllBudget';
import NotFound from '../pages/Not Found Page/NotFound';
import ProtactedRoute from './ProtectedRoute';
import AccessDenied from '../pages/Access Denied page/AccessDenied';

function AllRoute (props) {
    return (
        <Routes>
            {/* home no thing to check */}
            <Route index element = {<Navigate replace to='/home'/>} />
            <Route path='/home' element = {<Home />} />

            {/* log in check for token */}
            <Route element = {<ProtactedRoute to='/dashboard' check={() => {return localStorage.length === 0 ? true : false}}/>}>
                <Route path='/login' element = {<Login showMessage={props.showMessage}/>} />
            </Route>

            {/* all dashborad check for token */}
            <Route element = {<ProtactedRoute to='/login' check={() => {return localStorage.length === 0 ? false : true}}/>}>
                <Route path='/dashboard/*' element = {<Dashboard showMessage={props.showMessage}/>} >
                    <Route index element = {<Navigate replace to='projects'/>} />
                    <Route path='projects/*' element={<Projects />}>
                        <Route index element={<Navigate replace to='all' />} />
                        <Route path='all' element={<AllProjects showMessage={props.showMessage}/>} />

                        {/* add edit details protact form normal employee */}
                        <Route element={<ProtactedRoute to='/accessDenied' check={() => {return localStorage.getItem('role') === 'موظف' ? false : true}}/>}>
                            <Route path='add' element={<AddProject showMessage={props.showMessage}/>} />
                            <Route path='edit/:id' element={<EditProject showMessage={props.showMessage}/>} />
                            <Route path='details/:id' element={<ProjectDetails showMessage={props.showMessage}/>} />
                        </Route>

                        <Route path="*" element={<NotFound value='235px'/>}/>
                    </Route>
                    <Route path='beneficiaries/*' element={<Beneficiaries />}>
                        <Route index element={<Navigate replace to='all'/>}  />
                        <Route path='all'  element={<AllBeneficiaries showMessage={props.showMessage}/>}/>
                        <Route path='add'  element={<AddBeneficiaries showMessage={props.showMessage}/>}/>
                        <Route path='edit/:id'  element={<EditBeneficiaries showMessage={props.showMessage}/>}/>
                        <Route path='details/:id'  element={<BeneficiariesDetails showMessage={props.showMessage}/>}/>
                        <Route path="*" element={<NotFound value='235px'/>}/>
                    </Route>
                    <Route path='employees/*' element={<Employees />}>
                        <Route index element={<Navigate replace to='all'/>} />
                        <Route path='all' element={<AllEmployees showMessage={props.showMessage}/>} />

                        {/* add edit protact from all employee except مدير */}
                        <Route element={<ProtactedRoute to='/accessDenied' check={() => {return localStorage.getItem('role') !== 'مدير' ? false : true}}/>}>
                            <Route path='add' element={<AddEmployee showMessage={props.showMessage}/>} />
                            <Route path='edit/:id' element={<EditEmployee showMessage={props.showMessage}/>} />
                        </Route>
                        {/* details protact from normal employee */}
                        <Route element={<ProtactedRoute to='/accessDenied' check={() => {return localStorage.getItem('role') === 'موظف' ? false : true}}/>}>
                            <Route path='details/:id' element={<EmployeeDetails showMessage={props.showMessage}/>} />
                        </Route>

                        <Route path="*" element={<NotFound value='235px'/>}/>
                    </Route>
                    <Route path='budget/*' element={<Budget />}>
                        <Route index element={<Navigate replace to='all'/>}/>
                        <Route path='all' element={<AllBudget showMessage={props.showMessage} />} />
                        <Route path="*" element={<NotFound value='235px'/>}/>
                    </Route>
                    <Route path="*" element={<NotFound value='55px'/>}/>
                </Route>
            </Route>

            <Route path='/accessDenied' element={<AccessDenied />} />
            <Route path="*" element={<NotFound  value='0px' show={true}/>}/>
        </Routes>
    );
}

export default AllRoute;