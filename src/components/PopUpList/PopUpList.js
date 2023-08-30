// import react
import React from "react";

// import components
import SearchIcon from "../../Icons/Dashboard-content/SearchIcon";
import MainButton from "../Main Button/MainButton";
import EmptyIcon from '../../Icons/Dashboard-content/EmptyIcon';

// import style sheet
import './PopUpList.css';

function PopUpList(props) {
    const handleArrows = (e) => {
        if(e.target.className === 'arrow-down') e.target.className = 'arrow-up';
        else e.target.className = 'arrow-down';
        for (let i = 0; i < e.target.parentElement.children.length; i++) {
            if(e.target.parentElement.children[i] !== e.target) 
            e.target.parentElement.children[i].className = 'double-arrow';
        }
    }

    const handleChange = (value) => {
        const temp = [...props.value];
        const index = temp.findIndex(item => item.id === value.id);
        if(index === -1) temp.push(value);
        else temp.splice(index , 1);
        props.onChange(temp);
    }

    return (
        <div className='pop-up-list'>
            <div className="pop-up-list-content">
                <div className="search">
                    <SearchIcon />
                    <input 
                        name='search-bar'
                        type='text'
                        placeholder='البحث عن طريق الاسم, رقم التعريف, الحالة..'
                        autoComplete = "off"
                        onChange={(e) => {
                            props.handleSearch(e , e.target.value);
                        }}
                    />
                </div>
                <div className="pop-up-list-sort-bar">
                    {
                        props.sortBar.map((item , index) => (
                            <span 
                                key={item.name.toString()} 
                                className='double-arrow'
                                onClick={(e) => {handleArrows(e); item.onClick()}} 
                                style={{marginLeft: 'auto'}}
                            >   
                                {item.name}
                            </span>
                        ))
                    }
                    <span style={{marginLeft: '30px' , visibility: 'hidden'}}></span>
                </div>
                {props.list.length !==0 ?
                    <div className='pop-up-list-items'>
                    {
                        props.list.map((item , index) => (
                            <label key={index.toString()}>
                                {
                                    props.sortBar.map((element , i) => {
                                        let temp = item[element.key.toString()];
                                        if(element.key === 'id'){
                                            if(temp.toString().length === 1) temp = `0${temp}`;
                                        }
                                        return <span 
                                            key={i}
                                            style={{
                                                width: element.width,
                                                color: element.key !== 'status' ? element.color : (temp === 'مقبول' || temp === 'مكتمل') ? 'var(--main-color)' : (temp === 'مرفوض' || temp === 'ملغى') ? 'var(--main-red)' : 'rgba(255, 152, 0, 1)',
                                                fontWeight: element.fontWeight,
                                                backgroundColor: element.key !== 'status' ? 'none' : (temp === 'مقبول' || temp === 'مكتمل') ? 'var(--active-color)' : (temp === 'مرفوض' || temp === 'ملغى') ? 'var(--active-red)' : 'rgba(255, 152, 0, .18)',
                                                marginLeft: 'auto'
                                            }}
                                        >
                                            {temp}
                                        </span>
                                    })
                                }
                                <input 
                                    type='checkbox' 
                                    id={item.id}
                                    value={item.id}
                                    onChange={() => {handleChange(item)}}
                                    checked={props.value.findIndex(e => e.id === item.id) !== -1 ? true : false}
                                />
                                <div className='checkmark'></div>
                            </label>
                        ))
                    }
                    </div>  :
                    <div className='pop-up-list-empty'>
                        <EmptyIcon />
                        <span>لا يوجد بيانات</span>
                    </div>
                }
                <div className="pop-up-list-button">
                    <MainButton
                        title="تم" 
                        width="80px" 
                        height="30px" 
                        color="var(--main-color)"
                        onClick={(e) => {e.preventDefault(); props.handleSearch(e , ''); props.show(false)}}
                    />
                </div>
            </div>
        </div>
    );
}

export default PopUpList;