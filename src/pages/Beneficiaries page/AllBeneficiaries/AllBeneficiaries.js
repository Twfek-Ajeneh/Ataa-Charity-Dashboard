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
// import { beneficiaries as allBeneficiaries } from '../../../tools/static data/TablesData';
import { dateFormat } from '../../../tools/strings';

//import style sheet
import './AllBeneficiaries.css';

// import all beneficirais request
import {getAllBeneficiaris , deleteBeneficiaris} from './AllBenefucuarues-request.js';

function AllBeneficiaries(props) {
    const nav = useNavigate();
    const [loading , setLoading] = useState(true);
    const [loadingScreen , setLoadingScreen] = useState(false);
    const [error , setError] = useState(false);
    const [allBeneficiaries , setAllBeneficiaries] = useState([]);    
    const [beneficiaries , setBeneficiaries] = useState([]);
    const [list , setList] = useState([]);
    const [sortStatus , setSortStatus] = useState([false , false, false , false , false , false]);

    const handleSearch = (e , value) => {
        e.preventDefault(); 
        const tempList = beneficiaries.filter((item) => {
            if(item.id.toString().includes(value)) return true;
            else if(item.name.toString().includes(value)) return true;
            else if(dateFormat(item.birthdate).toString().includes(value)) return true;
            else if(item.state.toString().includes(value)) return true;
            else if(item.gender.toString().includes(value)) return true;
            else if(item.status.toString().includes(value)) return true;
            return false;
        });
        setList(tempList);
    }

    const handleClickItem = (e , id) => {
        e.stopPropagation();
        nav(`/dashboard/beneficiaries/details/${id}`);
    }

    const handleEdit = (e , id) => {
        e.stopPropagation();
        nav(`/dashboard/beneficiaries/edit/${id}`);
    }

    const handleDelete = async (e , id) => {
        e.stopPropagation();
        setLoadingScreen(true);
        const res = await deleteBeneficiaris(id);
        setLoadingScreen(false);
        if(res.ok === true){
            props.showMessage(true , 'success' , res.text);
            const tempAllBeneficiaries = [...allBeneficiaries];
            let index = tempAllBeneficiaries.findIndex(item => item.id === id);
            if(index !== -1) tempAllBeneficiaries.splice(index , 1);
            setAllBeneficiaries(tempAllBeneficiaries);
            const tempBeneficiaries = [...beneficiaries];
            index = tempBeneficiaries.findIndex(item => item.id === id);
            if(index !== -1 ) tempBeneficiaries.splice(index , 1);
            setBeneficiaries(tempBeneficiaries);
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
            setBeneficiaries(allBeneficiaries);
            setList(allBeneficiaries);
        }
        else if(value === 1){
            setBeneficiaries(allBeneficiaries.filter((item) => item.status === 'مقبول'));
            setList(allBeneficiaries.filter((item) => item.status === 'مقبول'));
        }
        else if(value === 2){
            setBeneficiaries(allBeneficiaries.filter((item) => item.status === 'مرفوض'));
            setList(allBeneficiaries.filter((item) => item.status === 'مرفوض'));
        }
        else{
            setBeneficiaries(allBeneficiaries.filter((item) => item.status === 'معلق'));
            setList(allBeneficiaries.filter((item) => item.status === 'معلق'));
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
            name: 'اسم المستفيد',
            width: '88px',
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
            width: '80px',
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
            key: 'state',
            name: 'المنطقة',
            width: '50px',
            color: 'var(--main-black)',
            fontWeight: 'bold',
            onClick: () => {
                const tempList = [...list];
                const tempSortStatus = [...sortStatus];
                if(sortStatus[3] === true)
                    tempList.sort((e1, e2) => {
                        if(e1.state  < e2.state) return -1;
                        else if(e1.state > e2.state) return 1;
                        else return 0;
                    });
                else
                    tempList.sort((e1, e2) => {
                        if(e1.state  < e2.state) return 1;
                        else if(e1.state > e2.state) return -1;
                        else return 0;
                    });
                tempSortStatus[3] = !tempSortStatus[3];
                setList(tempList);
                setSortStatus(tempSortStatus);
            }
        },
        {
            key: 'gender',
            name: 'الجنس',
            width: '50px',
            color: 'var(--main-black)',
            sortMarginLeft: '110px',
            onClick: () => {
                const tempList = [...list];
                const tempSortStatus = [...sortStatus];
                if(sortStatus[4] === true)
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
        }
    ];
    

    useEffect(() => {
        getAllBeneficiaris().then(res => {
            setLoading(false);
            if(res.ok === true){
                setAllBeneficiaries(res.data);
                setBeneficiaries(res.data);
                setList(res.data);
            }
            else if(res.ok === false){
                setError(true);
            }
        });
    } , []);

    return (
        <div className='all-beneficiaries'>
            <DashboardPageHeader 
                mainTitle='المستفيدين'
                subTitle='هذا القسم يحتوي جميع المستفيدين في الجمعية , يمكنك عرض معلومات مستفيد أو تعديلها أو حذفها .'
                listItem={[
                    'جميع المستفيدين',
                    'الطلبات المقبولة',
                    'الطلبات المرفوضة',
                    'الطلبات المعلقة'
                ]}
                onClickList={listFilter}
            />
            <div className="all-beneficiaries-content">
                {loading && <LoadingIcon />}
                {!loading && !error && <DashboardTable 
                    handleSearch={handleSearch}
                    sortBar={sortBar}
                    list={list}
                    count={beneficiaries.length}
                    handleClickItem={handleClickItem}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />}
                {error && <Error />}
                {loadingScreen && <LoadingScreen />}
            </div>
        </div>
    );
}

export default AllBeneficiaries;