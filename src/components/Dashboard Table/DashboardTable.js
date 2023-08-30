// import react
import React from 'react';

//import components
import SearchIcon from '../../Icons/Dashboard-content/SearchIcon';
import DeleteIcon from '../../Icons/Dashboard-content/DeleteIcon';
import EditIcon from '../../Icons/Dashboard-content/EditIcon';
import EmptyIcon from '../../Icons/Dashboard-content/EmptyIcon';

// import tools and static data
import { dateFormat } from '../../tools/strings';

//import style sheet
import './DashboardTable.css';

function DashboardTable (props) {
    const handleArrows = (e) => {
        if(e.target.className === 'arrow-down') e.target.className = 'arrow-up';
        else e.target.className = 'arrow-down';
        for (let i = 0; i < e.target.parentElement.children.length; i++) {
            if(e.target.parentElement.children[i] !== e.target) 
            e.target.parentElement.children[i].className = 'double-arrow';
        }
    }

    return (
        <div className='dashboard-table'>
            <form dir='rtl' onSubmit={(e) => {props.handleSearch(e , e.target.children[1].value)}}>
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
            </form>
            <div className="dashboard-table-sort-bar">
                {
                    props.sortBar.map((item , index) => (
                        <span 
                            key={index} 
                            className='double-arrow' 
                            onClick={(e) => {handleArrows(e); item.onClick();}}   
                            style={{marginLeft: 'auto'}}
                        >   
                            {item.name}
                        </span>
                    ))
                }
                <span style={{marginLeft: '85px' , visibility: 'hidden'}}></span>
            </div>
            {props.list.length !== 0 ? 
                <div className="dashboard-table-items">
                    {
                        props.list.map((item , index) => {
                            return (
                                <div key={index} onClick={(e) => {props.handleClickItem(e , item.id)}}>
                                    {
                                        props.sortBar.map((element , i) => {
                                            let temp = item[element.key.toString()];
                                            if(element.key === 'startDate' || element.key === 'birthdate'){
                                                temp = dateFormat(temp);
                                            }
                                            if(element.key === 'id'){
                                                if(temp.toString().length === 1) temp = `0${temp}`;
                                            }
                                            return (
                                                <span 
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
                                            );
                                        })
                                    }
                                    <EditIcon id={item.id} handleEdit={props.handleEdit}/>
                                    <DeleteIcon id={item.id} handleDelete={props.handleDelete}/>
                                </div>
                            );
                        })
                    }
                </div> : 
                <div className='dashboard-table-empty'>
                    <EmptyIcon />
                    <span>لا يوجد بيانات</span>
                </div>
            }
            <div className="dashboard-table-footer">
                {props.list.length} من {props.count}
            </div>
        </div>
    );
}


export default DashboardTable;