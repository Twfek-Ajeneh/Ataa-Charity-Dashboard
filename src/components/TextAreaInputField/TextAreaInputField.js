// import react
import React from 'react';

// import style sheen
import './TextAreaInputField.css';

function TextAreaInputField(props){
    return (
        <div className='text-area-input-field'>
            <label htmlFor={props.id} className='text-area-input-field-label'>{props.label}</label>
            <textarea 
                name={props.id}
                id={props.id} 
                cols="30" 
                rows="10" 
                style={{width: props.width , height: props.height}}
                required
                placeholder={props.placeholder ? props.placeholder : ""}
                value={props.value}
                onChange = {(e) => {props.onChange(e.target.value)}}
                autoComplete = "off"
            >
            </textarea>
            {props.Error && props.Error.is && <div className="text-area-input-field-error">{props.Error.text}</div>}
        </div>
    );  
}

export default TextAreaInputField;