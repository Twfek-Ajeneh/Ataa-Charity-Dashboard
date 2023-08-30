//import react
import React from 'react';
import { useNavigate } from 'react-router-dom';

// import componenets
import NotFoundIcon from '../../Icons/Not Found Icon/NotFoundIcon';
import MainButton from '../../components/Main Button/MainButton';

// import style sheet
import './NotFound.css';

function NotFound (props){
    const nav = useNavigate();

    return (
        <div className="not-found" style={{marginRight: props.value , width: `calc(100% - ${props.value})` }}>
            <NotFoundIcon />
            <div className="title">هذه الصفحة غير موجودة</div>
            {props.show && 
                <MainButton 
                title="الصفحة الرئيسية" 
                width="140px" 
                height="40px" 
                color="var(--main-color)"
                onClick={() => {nav('/home')}}
                />
            }
        </div>
    );
}

export default NotFound;