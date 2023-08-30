// import react
import React from "react";

// import tools and static data
import { projectCategories } from '../../tools/static data/FormsData';

// import style sheet
import './MultiSelectInput.css';

function MultiSelectInput (props) {

    const handleClick = (e) => {
        if(e.target.classList.contains('multi-select-input')){
            e.target.classList.toggle('multi-select-input-active');
            e.target.children[1].classList.toggle('multi-select-input-list-show');
        }
    }

    const handleChange = (e) => {
        const value = parseInt(e.target.value);
        const tempList = [...props.list];
        if(tempList.indexOf(value) === -1) tempList.push(value);
        else tempList.splice(tempList.indexOf(value) , 1);
        props.onChange(tempList);
    }

    return (
        <div className="multi-select-input-field">
            <div className="multi-select-input-label">{props.label}</div>
            <div className="multi-select-input" onClick={handleClick}>
                {props.list.length !== 0 ? <span>{props.list.map((item , index) => index !== props.list.length-1 ? `${projectCategories[item-1].name} ,` : projectCategories[item-1].name)}</span> : <span style={{color: 'var(--main-black)' , opacity: '.5'}}>{props.placeholder}</span>}
                <div className='multi-select-input-list multi-select-input-list-show'>
                    {
                        props.options.map((item , index) => (
                            <label key={index} className='multi-select-input-list-item'>
                                {item.name}
                                <input 
                                    type='checkbox' 
                                    id={item.id} 
                                    value={item.id} 
                                    onChange={(e) => {handleChange(e)}}
                                    checked = {props.list.indexOf(item.id) !== -1 ? true : false}
                                />
                                <span className='checkmark'></span>
                            </label>
                        ))
                    }
                </div>
            </div>  
            {props.Error && props.Error.is && <div className="multi-select-input-error">{props.Error.text}</div>}
        </div>
    );
}

export default MultiSelectInput;