// import react
import {Link , useLocation} from 'react-router-dom';
import {useRef} from 'react';

// import style sheet
import './SecondNavbar.css'

let div1Class = '';
let div2Class = '';

function SecondNavbar(props){
    const location = useLocation();
    const div1 = useRef();
    const div2 = useRef();

    if(location.pathname.includes('add')){
        div2Class = 'second-navbar-active';
        div1Class = '';
    }
    else{
        div1Class = 'second-navbar-active';
        div2Class = '';
    }

    const handleClick = (e) => {
        if(props.title1 !== null) div1.current.classList.remove('second-navbar-active');
        if(props.title2 !== null) div2.current.classList.remove('second-navbar-active');
        e.target.classList.add('second-navbar-active');
    }

    return(
        <div className="second-navbar">  
            <div className="second-navbar-header">{localStorage.getItem('role')}</div>
            <div className="second-navbar-content">
                {props.title1 && <Link to={'/dashboard/'+ props.mainPath +'/all'}><div ref={div1} onClick={handleClick} className={div1Class}>{props.title1}</div></Link>}
                {props.title2 && <Link to={'/dashboard/'+ props.mainPath +'/add'}><div ref={div2} onClick={handleClick} className={div2Class}>{props.title2}</div></Link>}
            </div>
        </div>
    );
}

export default SecondNavbar;