// import react
import React, { useRef } from 'react';

// import style sheet
import './MainButton.css';

function MainButton(props){
    const div = useRef();

    const handleEffect = () => {
        if(props.disabled !== true && props.disabled !== 1){
            if(div.current.classList.contains('main-button-effect-after')){
                div.current.classList.remove('main-button-effect-after');
                div.current.classList.add('main-button-effect-before');
            }
            else{
                div.current.classList.remove('main-button-effect-before');
                div.current.classList.add('main-button-effect-after');
            }
        }
    }

    return(
        <div className='main-button' ref={div} onClick={handleEffect}>
            <button
                style={{backgroundColor : props.color , width : props.width , height : props.height}} 
                onClick = {props.onClick}
                disabled = {props.disabled}
            >
                {props.title}
            </button>
        </div>
    );
}

export default MainButton;