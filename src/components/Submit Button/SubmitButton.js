//import react
import React , { useRef } from 'react'

// import style sheet
import './SubmitButton.css';

function SubmitButton(props){
    const div = useRef();

    const handleEffect = () => {
        if(props.disabled !== true && props.disabled !== 1){
            if(div.current.classList.contains('submit-button-effect-after')){
                div.current.classList.remove('submit-button-effect-after');
                div.current.classList.add('submit-button-effect-before');
            }
            else{
                div.current.classList.remove('submit-button-effect-before');
                div.current.classList.add('submit-button-effect-after');
            }
        }
    }

    return (
        <div className='submit-button' ref={div}  onClick={handleEffect}>
            <input 
                type="submit" 
                value={props.title} 
                style={{backgroundColor : props.color , width : props.width , height : props.height}} 
                onClick = {props.onClick}
                disabled = {props.disabled}
            />
        </div>
    );
}

export default SubmitButton;