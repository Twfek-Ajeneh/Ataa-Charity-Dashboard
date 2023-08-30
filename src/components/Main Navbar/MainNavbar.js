//import react 
import { Link , useLocation , useNavigate} from 'react-router-dom';

// import components
import ProjectsIcon from "../../Icons/Main-Navbar/ProjectsIcon";
import BeneficiariesLogo from "../../Icons/Main-Navbar/BeneficiariesIcon";
import EmployeesIcon from "../../Icons/Main-Navbar/EmployeesIcon";
import MoneyIcon from "../../Icons/Main-Navbar/MoneyIcon";
import LogoutIcon from "../../Icons/Main-Navbar/LogoutIcon";
import MainLogo from "../../Icons/MainLogo"

// import style sheet
import './MainNavbar.css';

let projectsClass = '';
let beneficiariesClass = '';
let employeesClass = '';
let budgetClass = '';

function MainNavbar() {
    const nav = useNavigate();
    const path = useLocation();

    if(path.pathname.includes('projects')){
        projectsClass = 'main-navbar-logos-active';
        beneficiariesClass = '';
        employeesClass = '';
        budgetClass = ''
    }
    else if(path.pathname.includes('beneficiaries')){
        beneficiariesClass = 'main-navbar-logos-active';
        projectsClass = '';
        employeesClass = '';
        budgetClass = ''
    }
    else if(path.pathname.includes('employees')){
        employeesClass = 'main-navbar-logos-active';
        projectsClass = '';
        beneficiariesClass = '';
        budgetClass = ''
    }
    else if(path.pathname.includes('budget')){
        budgetClass = 'main-navbar-logos-active';
        projectsClass = '';
        beneficiariesClass = '';
        employeesClass = '';
    }
    else{
        projectsClass = 'main-navbar-logos-active';
        beneficiariesClass = '';
        employeesClass = '';
        budgetClass = ''
    }

    const handleClick = (e) => {
        const logos = document.querySelector('.main-navbar-logos').children;
        for(let i = 1 ; i < 5 ; i++)
            logos[i].firstChild.classList.remove('main-navbar-logos-active')
        e.target.classList.toggle("main-navbar-logos-active");
    }
    
    const handleLogout = () => {
        localStorage.clear();
        nav('/home');
    }

    return (
        <div className="main-navbar">
            <div className="main-navbar-logos">
                <Link to='/home'><MainLogo width="38" height = "41"/></Link>
                <Link to='/dashboard/projects'><ProjectsIcon width="31" height = "29" onClick={handleClick} className={projectsClass}/></Link>
                <Link to='/dashboard/beneficiaries'><BeneficiariesLogo width="28" height = "28" onClick={handleClick} className={beneficiariesClass}/></Link>
                <Link to='/dashboard/employees'><EmployeesIcon width="33" height = "33" onClick={handleClick} className={employeesClass}/></Link>
                <Link to='/dashboard/budget'><MoneyIcon width="28" height = "28" onClick={handleClick} className={budgetClass}/></Link>
                <LogoutIcon width="30" height = "30" onClick={handleLogout}/>
            </div>
        </div>
    );
}

export default MainNavbar;