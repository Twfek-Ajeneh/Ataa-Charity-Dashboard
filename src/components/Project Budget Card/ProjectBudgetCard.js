// import react
import React from 'react';
import { useNavigate } from 'react-router-dom'

//import tools and static data
import { calcPercent , comma} from '../../tools/strings';

// import style sheet
import './ProjectBudgetCard.css';

function ProjectBudgetCard (props){
    const nav = useNavigate();

    return (
        <div className="card" onClick={() => {nav(`/dashboard/projects/details/${props.project.id}`)}}>
            <div className="image">
                <img src={props.project.image} alt="projectImage" onError={e => {
                    e.target.src = '/images/warning1.svg';
                    e.target.style.setProperty('width' , '140px');
                    e.target.style.setProperty('opacity' , '.7');
                    e.target.onError = null;
                }} />
            </div>
            <div className="name">
                {props.project.name} 
            </div>
            <div className="progress">
                <div className="current-progress"><span style={{width: `${calcPercent(props.project.target, props.project.currentBalance)}%`}}></span></div>
                <div className="percent">{calcPercent(props.project.target, props.project.currentBalance).toFixed(1)}%</div>
            </div>
            <div className="target">
                <b>الهدف</b> : {comma(props.project.target)} ل.س  
            </div>
            <div className="current-target">
                <b>تم جمع</b> : {comma(props.project.currentBalance)} ل.س
            </div>
        </div>
    );
}

export default ProjectBudgetCard;