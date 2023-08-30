// import react
import React from 'react';

// import sytle sheet
import './DateInputField.css';

function DateInputField(props){
    return (
        <div className='date-input-field'>
            <label htmlFor='date' className='date-input-field-label'>{props.label}</label>
            <input 
                id='date'
                type='date'
                style={{width: props.width , height: props.height}}
                required
                min={props.min}
                max={props.max}
                value={props.value}
                onChange = {(e) => {props.onChange(e.target.value)}}
            />
            {props.Error && props.Error.is && <div className="date-input-field-error">{props.Error.text}</div>}
        </div>
    );
}

export default DateInputField;