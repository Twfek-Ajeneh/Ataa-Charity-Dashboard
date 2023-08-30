// import react
import React from "react";

// import components
import TextInputField from '../TextInputField/TextInputField';
import MoneyIcon from '../../Icons/Form/MoneyIcon';
import MainButton from '../Main Button/MainButton';

// import style sheet
import './PopUpBudget.css';

function PopUpBudget(props){
    return (
        <div className='pop-up-budget' onClick={props.onCancel}>
            <div className="pop-up-budget-content" onClick={(e) => {e.stopPropagation()}}>
                <TextInputField 
                    id='budget-value' 
                    name='budget-value' 
                    label='القيمة الجديدة'
                    type='number'
                    min='0'
                    step='any'
                    numberArrow='none'
                    suffix='ل.س'
                    width='250px' 
                    height='40px' 
                    icon={<MoneyIcon />}
                    value={props.value}
                    onChange={props.onChange}
                    Error={props.error}
                />
                <div className='pop-up-budget-content-buttons'>
                    <MainButton
                        title="الغاء الأمر" 
                        width="120px" 
                        height="40px" 
                        color="var(--main-red)"
                        onClick={props.onCancel}
                    />
                    <MainButton 
                        title="تعديل" 
                        width="120px" 
                        height="40px" 
                        color="var(--main-color)"
                        onClick={props.onEdit}
                    />
                </div>
            </div>
        </div>
    );
}

export default PopUpBudget;
