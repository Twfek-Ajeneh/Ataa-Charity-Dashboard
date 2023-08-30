//import react
import React from 'react';

// import style sheet
import './TextInputField.css';

function TextInputField(props){
    return (
        <div className='text-input-field'>
            {props.label && <label htmlFor={props.id} className='text-input-field-label'>{props.label}</label>}
            {props.icon && <div className="text-input-field-icon" style={{top: props.label ? '37px' : '11px'}}>{props.icon}</div>}
            {props.suffix && <div className='text-input-field-suffix'>{props.suffix}</div>}
            <input 
                id={props.id} 
                name={props.name}
                type={props.type}
                className={props.numberArrow}
                style={
                        { 
                            width: props.width, 
                            height: props.height, 
                            paddingRight: `${props.icon ? '55px' : '10px'}`,
                            paddingLeft: `${props.suffix ? '45px' : '10px'}`
                        }
                } 
                placeholder={props.placeholder ? props.placeholder : ""}
                min={props.min}
                max={props.max}
                step={props.step}
                required
                disabled = {props.disabled}
                autoFocus={props.autoFocus}
                value={props.value}
                onKeyDown = {(e) => {
                    if(e.target.type === 'number' && e.target.className !== 'none'){
                        e.preventDefault();
                    }
                }}
                onChange = {(e) => {props.onChange(e.target.value)}}
                autoComplete = "off"
            />
            {props.Error && props.Error.is && <div className="text-input-field-error" style={{marginRight: props.errorMargin}}>{props.Error.text}</div>}
        </div>
    );
}

export default TextInputField;