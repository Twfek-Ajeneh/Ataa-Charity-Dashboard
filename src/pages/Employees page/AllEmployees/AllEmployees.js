// import react
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//import components
import DashboardPageHeader from '../../../components/Dashboard Page Header/DashboardPageHeader';
import DashboardTable from '../../../components/Dashboard Table/DashboardTable';
import Error from '../../../components/Error/Error';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import LoadingIcon from '../../../components/loading icon/loading';

// import tools and static data
// import { employees as allEmployees } from '../../../tools/static data/TablesData';
import { dateFormat } from '../../../tools/strings';

// import style sheet
import './AllEmployees.css';

// import all employees request
import {getAllEmployees , deleteEmployee} from './AllEmployees-request';

function AllEmployees (props) {
    const nav = useNavigate();
    const [loading , setLoading] = useState(true);
    const [loadingScreen , setLoadingScreen] = useState(false);
    const [error , setError] = useState(false);
    const [allEmployees , setAllEmployees] = useState([]);    
    const [employees , setEmployees] = useState([]);
    const [list , setList] = useState([]);
    const [sortStatus , setSortStatus] = useState([false , false, false , false , false , false]);
    
    const handleSearch = (e , value) => {
        e.preventDefault(); 
        const tempList = employees.filter((item) => {
            if(item.id.toString().includes(value)) return true;
            else if(item.name.toString().includes(value)) return true;
            else if(dateFormat(item.birthdate).toString().includes(value)) return true;
            else if(item.jobState.toString().includes(value)) return true;
            else if(item.gender.toString().includes(value)) return true;
            else if(item.status.toString().includes(value)) return true;
            return false;
        });
        setList(tempList);
    }

    const handleClickItem = (e , id) => {
        e.stopPropagation();
        nav(`/dashboard/employees/details/${id}`);
    }

    const handleEdit = (e , id) => {
        e.stopPropagation();
        nav(`/dashboard/employees/edit/${id}`);
    }

    const handleDelete = async (e , id) => {
        e.stopPropagation();
        setLoadingScreen(true);
        const res = await deleteEmployee(id);
        setLoadingScreen(false);
        if(res.ok === true){
            props.showMessage(true , 'success' , res.text);
            const tempAllEmployees = [...allEmployees];
            let index = tempAllEmployees.findIndex(item => item.id === id);
            if(index !== -1) tempAllEmployees.splice(index , 1);
            setAllEmployees(tempAllEmployees);
            const tempEmployees = [...employees];
            index = tempEmployees.findIndex(item => item.id === id);
            if(index !== -1 ) tempEmployees.splice(index , 1);
            setEmployees (tempEmployees );
            const tempList = [...list];
            index = tempList.findIndex(item => item.id === id);
            if(index !== -1) tempList.splice(index , 1);
            setList(tempList);
        }
        else if(res.ok === false){
            props.showMessage(true , 'error' , res.text);
        }
    }

    const listFilter = (value) => {
        if(value === 0){
            setEmployees(allEmployees);
            setList(allEmployees);
        }
        else if(value === 1){
            setEmployees(allEmployees.filter((item) => item.status === 'مقبول'));
            setList(allEmployees.filter((item) => item.status === 'مقبول'));
        }
        else if(value === 2){
            setEmployees(allEmployees.filter((item) => item.status === 'مرفوض'));
            setList(allEmployees.filter((item) => item.status === 'مرفوض'));
        }
        else{
            setEmployees(allEmployees.filter((item) => item.status === 'معلق'));
            setList(allEmployees.filter((item) => item.status === 'معلق'));
        }
    }

    const sortBar = [
        {
            key: 'id',
            name: 'رقم التعريف',
            width: '75px',
            color: 'var(--secondary-color)',
            fontWeight: 'normal',
            onClick: () => {
                const tempList = [...list];
                const tempSortStatus = [...sortStatus];
                if(sortStatus[0] === true)
                    tempList.sort((e1, e2) =>  e1.id - e2.id);
                else
                    tempList.sort((e1 , e2) => e2.id - e1.id);
                tempSortStatus[0] = !tempSortStatus[0];
                setList(tempList);
                setSortStatus(tempSortStatus);
            }
        },
        {
            key: 'name',
            name: 'اسم الموظف',
            width: '85px',
            color: 'var(--main-black)',
            fontWeight: 'bold',
            onClick: () => {
                const tempList = [...list];
                const tempSortStatus = [...sortStatus];
                if(sortStatus[1] === true)
                    tempList.sort((e1, e2) => {
                        if(e1.name  < e2.name) return -1;
                        else if(e1.name > e2.name) return 1;
                        else return 0;
                    });
                else
                    tempList.sort((e1, e2) => {
                        if(e1.name  < e2.name) return 1;
                        else if(e1.name > e2.name) return -1;
                        else return 0;
                    });
                tempSortStatus[1] = !tempSortStatus[1];
                setList(tempList);
                setSortStatus(tempSortStatus);
            }
        },
        {
            key: 'birthdate',
            name: 'تاريخ الميلاد',
            width: '75px',
            color: 'var(--secondary-color)',
            fontWeight: 'normal',
            onClick: () => {
                const tempList = [...list];
                const tempSortStatus = [...sortStatus];
                if(sortStatus[2] === true)
                    tempList.sort((e1, e2) => e1.birthdate - e2.birthdate);
                else
                    tempList.sort((e1, e2) => e2.birthdate - e1.birthdate);
                tempSortStatus[2] = !tempSortStatus[2];
                setList(tempList);
                setSortStatus(tempSortStatus);
            }
        },
        {
            key: 'gender',
            name: 'الجنس',
            width: '50px',
            color: 'var(--main-black)',
            fontWeight: 'bold',
            sortMarginLeft: '110px',
            onClick: () => {
                const tempList = [...list];
                const tempSortStatus = [...sortStatus];
                if(sortStatus[3] === true)
                    tempList.sort((e1, e2) => {
                        if(e1.gender  < e2.gender) return -1;
                        else if(e1.gender > e2.gender) return 1;
                        else return 0;
                    });
                else
                    tempList.sort((e1, e2) => {
                        if(e1.gender  < e2.gender) return 1;
                        else if(e1.gender > e2.gender) return -1;
                        else return 0;
                    });
                tempSortStatus[3] = !tempSortStatus[3];
                setList(tempList);
                setSortStatus(tempSortStatus);
            }
        },
        {
            key: 'jobState',
            name: 'الرتبة الوظيفية',
            width: '85px',
            color: 'var(--main-black)',
            fontWeight: 'normal',
            onClick: () => {
                const tempList = [...list];
                const tempSortStatus = [...sortStatus];
                if(sortStatus[4] === true)
                    tempList.sort((e1, e2) => {
                        if(e1.jobState  < e2.jobState) return -1;
                        else if(e1.jobState > e2.jobState) return 1;
                        else return 0;
                    });
                else
                    tempList.sort((e1, e2) => {
                        if(e1.jobState  < e2.jobState) return 1;
                        else if(e1.jobState > e2.jobState) return -1;
                        else return 0;
                    });
                tempSortStatus[4] = !tempSortStatus[4];
                setList(tempList);
                setSortStatus(tempSortStatus);
            }
        },
        {
            key: 'status',
            name: 'الحالة',
            width: '50px',
            color: 'var(--main-black)',
            fontWeight: 'normal',
            onClick: () => {
                const tempList = [...list];
                const tempSortStatus = [...sortStatus];
                if(sortStatus[5] === true)
                    tempList.sort((e1, e2) => {
                        if(e1.status  < e2.status) return -1;
                        else if(e1.status > e2.status) return 1;
                        else return 0;
                    });
                else
                    tempList.sort((e1, e2) => {
                        if(e1.status  < e2.status) return 1;
                        else if(e1.status > e2.status) return -1;
                        else return 0;
                    });
                tempSortStatus[5] = !tempSortStatus[5];
                setList(tempList);
                setSortStatus(tempSortStatus);
            }
        },
    ];

    useEffect(() => {
        getAllEmployees().then(res => {
            setLoading(false);
            if(res.ok === true){
                setAllEmployees(res.data);
                setEmployees(res.data);
                setList(res.data);
            }
            else if(res.ok === false){
                setError(true);
            }
        });
    } , [])

    return (
        <div className='all-employees'>
            <DashboardPageHeader 
                mainTitle='الموظفين'
                subTitle='في هذا القسم يتم عرض معلومات جميع الموظفين في الجمعية , يمكنك تعديل أو حذف معلومات موظف'
                listItem={[
                    'جميع الموظفين',
                    'طلبات التطوع المقبولة',
                    'طلبات التطوع المرفوضة',
                    'طلبات التطوع المعلقة'
                ]}
                onClickList={listFilter}
            />
            <div className="all-employees-content">
                {loading && <LoadingIcon />}
                {!loading && !error && <DashboardTable 
                    handleSearch={handleSearch}
                    sortBar={sortBar}
                    list={list}
                    count={employees.length}
                    handleClickItem={handleClickItem}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />}
                {error && <Error />}
                {loadingScreen && <LoadingScreen />}
            </div>
        </div>
    );
}

export default AllEmployees;