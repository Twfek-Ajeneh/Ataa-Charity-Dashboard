// import react
import React from 'react';

// import style sheet
import './SelectInputField.css';

function SelectInputField(props){
    return (
        <div className="select-input-field">
            <label htmlFor={props.id} className="select-input-field-label" style={{opacity: props.disabled ? .6 : 1}}>{props.label}</label>
            <select 
                dir='rtl'
                name={props.id} 
                id={props.id} 
                style={{width: props.width , height: props.height}}
                value={props.value}
                onChange = {(e) => {props.onSelect(e.target.value);}}
                disabled={props.disabled}
            >
                {props.options.map((option , index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            {props.Error && props.Error.is && <div className="select-input-field-error">{props.Error.text}</div>}
        </div>
    );
}

export default SelectInputField;