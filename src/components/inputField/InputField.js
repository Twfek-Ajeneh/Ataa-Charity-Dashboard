// import React
import React from 'react';

// import style sheet
import './InputField.css';

function InputField (props){
    return (
        <div className="input-field">
            {props.logo && <div className="input-logo">{props.logo}</div>}
            <input 
                dir='rtl' 
                className={(props.className ? props.className : "") + " inner-input-field"}
                type={props.type}
                placeholder={props.placeholder}
                required 
                autoFocus = {props.autoFocus}
                value = {props.value} 
                style={{paddingLeft: props.icon ? '40px' : '10px'}}
                onChange = {(e) => {props.onChange(e.target.value)}}
            />
            {props.icon && <div className='input-field-icon' onClick={props.onClickIcon}>{props.icon}</div>}
            {props.Error && props.Error.is && <div className="input-error">{props.Error.text}</div>}
        </div>
    );
}

export default InputField;