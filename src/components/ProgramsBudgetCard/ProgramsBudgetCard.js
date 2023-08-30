// import react
import React from "react";

// import tools and static dta
import { comma } from "../../tools/strings";

// import style sheet
import './ProgramsBudgetCard.css';

function ProgramsBudgetCard(props){
    return (
        <div className='programs-budget-card' onClick={props.onClick} style={{cursor: localStorage.getItem('role') === 'موظف' ? 'default' : 'pointer'}}>
            <div className="icon">
                {props.icon}
            </div>
            <div className="name">
                {props.name}
            </div>
            <div className="target">
                <b>القيمة الحالية</b> : {comma(props.currentValue)} ل.س  
            </div>
            <div className="current-target">
                <b>تم جمع</b> : {comma(props.currentBalance)} ل.س
            </div>
            {localStorage.getItem('role') !== 'موظف' ? <div className='click-edit'>اضغط لتعديل القيمة الحالية</div> : <></>}
        </div>
    );
}

export default ProgramsBudgetCard;