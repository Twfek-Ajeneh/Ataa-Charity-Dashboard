// import react
import React from 'react';

// import components
import ImageIcon from '../../Icons/Form/ImageIcon';

// import style sheet
import './ImageInputField.css';

function ImageInputField(props){
    return (
        <div className="image-input-field">
            <div className='image-input-field-label'>{props.label}</div>
            <label 
                htmlFor='image' 
                className='fake-input'
                style={{width:props.width , height: props.height}}
            >
                {props.value && <img src={props.value} alt='userImage'  onError={e => {
                    e.target.src = '/images/warning1.svg';
                    e.target.style.setProperty('width' , '160px');
                    e.target.style.setProperty('opacity' , '.8');
                    e.target.onError = null;
                }} />}
                {!props.value && <ImageIcon width={props.iconSize} height={props.iconSize} /> }
                {!props.value && <span>إضغط لأضافة صورة</span>}
            </label>
            <input 
                id='image'
                name='image'
                type="file" 
                accept='image/*'
                onChange= {(e) => {
                    var selectedFile = e.target.files[0];
                    var reader = new FileReader();
                    reader.onload = function(e){
                        props.onChange(e.target.result);
                    }
                    reader.readAsDataURL(selectedFile);
                }}
            />
            {props.Error && props.Error.is && <div className="image-input-field-error">{props.Error.text}</div>}
        </div>
    );
}  

export default ImageInputField;