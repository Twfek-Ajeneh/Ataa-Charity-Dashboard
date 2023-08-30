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
// import { projects as allProjects} from '../../../tools/static data/TablesData';
import { dateFormat } from '../../../tools/strings';

// import style sheet
import './AllProject.css';

//import all project request
import { getAllProjects , deleteProject } from './AllProject-request';

function AllProjects(props) {
    const nav = useNavigate();
    const [loading , setLoading] = useState(true);
    const [loadingScreen , setLoadingScreen] = useState(false);
    const [error , setError] = useState(false);
    const [allProjects , setAllProjects] = useState([]);    
    const [projects , setProjects] = useState([]);
    const [list , setList] = useState([]);
    const [sortStatus , setSortStatus] = useState([false , false, false , false , false , false]);

    const handleSearch = (e , value) => {
        e.preventDefault(); 
        const tempList = projects.filter((item) => {
            if(item.id.toString().includes(value)) return true;
            else if(item.name.toString().includes(value)) return true;
            else if(dateFormat(item.startDate).toString().includes(value)) return true;
            else if(item.location.toString().includes(value)) return true;
            else if(item.type.toString().includes(value)) return true;
            else if(item.status.toString().includes(value)) return true;
            return false;
        });
        setList(tempList);
    }

    const handleClickItem = (e , id) => {
        e.stopPropagation();
        nav(`/dashboard/projects/details/${id}`);
    }

    const handleEdit = (e , id) => {
        e.stopPropagation();
        nav(`/dashboard/projects/edit/${id}`);
    }

    const handleDelete = async (e , id) => {
        e.stopPropagation();
        setLoadingScreen(true);
        const res = await deleteProject(id);
        setLoadingScreen(false);
        if(res.ok === true){
            props.showMessage(true , 'success' , res.text);
            const tempAllProjects = [...allProjects];
            let index = tempAllProjects.findIndex(item => item.id === id);
            if(index !== -1) tempAllProjects.splice(index , 1);
            setAllProjects(tempAllProjects);
            const tempProjects = [...projects];
            index = tempProjects.findIndex(item => item.id === id);
            if(index !== -1 ) tempProjects.splice(index , 1);
            setProjects(tempProjects);
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
            setProjects(allProjects);
            setList(allProjects);
        }
        else if(value === 1){
            setProjects(allProjects.filter((item) => item.status === 'مكتمل'));
            setList(allProjects.filter((item) => item.status === 'مكتمل'));
        }
        else if(value === 2){
            setProjects(allProjects.filter((item) => item.status === 'ملغى'));
            setList(allProjects.filter((item) => item.status === 'ملغى'));
        }
        else{
            setProjects(allProjects.filter((item) => item.status === 'مستمر'));
            setList(allProjects.filter((item) => item.status === 'مستمر'));
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
            name: 'اسم المشروع',
            width: '90px',
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
            key: 'startDate',
            name: 'تاريخ الإطلاق',
            width: '88px',
            color: 'var(--secondary-color)',
            fontWeight: 'normal',
            onClick: () => {
                const tempList = [...list];
                const tempSortStatus = [...sortStatus];
                if(sortStatus[2] === true)
                    tempList.sort((e1, e2) => e1.startDate - e2.startDate);
                else
                    tempList.sort((e1, e2) => e2.startDate - e1.startDate);
                tempSortStatus[2] = !tempSortStatus[2];
                setList(tempList);
                setSortStatus(tempSortStatus);
            }
        },
        {
            key: 'location',
            name: 'المنطقة',
            width: '50px',
            color: 'var(--main-black)',
            fontWeight: 'bold',
            onClick: () => {
                const tempList = [...list];
                const tempSortStatus = [...sortStatus];
                if(sortStatus[3] === true)
                    tempList.sort((e1, e2) => {
                        if(e1.location  < e2.location) return -1;
                        else if(e1.location > e2.location) return 1;
                        else return 0;
                    });
                else
                    tempList.sort((e1, e2) => {
                        if(e1.location  < e2.location) return 1;
                        else if(e1.location > e2.location) return -1;
                        else return 0;
                    });
                tempSortStatus[3] = !tempSortStatus[3];
                setList(tempList);
                setSortStatus(tempSortStatus);
            }
        },
        {
            key: 'type',
            name: 'النوع',
            color: 'var(--main-black)',
            fontWeight: 'normal',
            width: '50px',
            onClick: () => {
                const tempList = [...list];
                const tempSortStatus = [...sortStatus];
                if(sortStatus[4] === true)
                    tempList.sort((e1, e2) => {
                        if(e1.type  < e2.type) return -1;
                        else if(e1.type > e2.type) return 1;
                        else return 0;
                    });
                else
                    tempList.sort((e1, e2) => {
                        if(e1.type  < e2.type) return 1;
                        else if(e1.type > e2.type) return -1;
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
        getAllProjects().then(res => {
            setLoading(false);
            if(res.ok === false){
                setError(true);
            }
            else if(res.ok === true){
                setAllProjects(res.data);
                setProjects(res.data);
                setList(res.data);
            }
        });
    } , []);

    return (
        <div className='all-project'>
            <DashboardPageHeader 
                mainTitle='المشاريع'
                subTitle='هذا القسم يحوي جميع المشاريع و المبادرات التي تقوم بها الجمعية, يمكنك البحث عن مشروع, ترتيب المشاريع,  حذف مشروع أو تعديله , عرض معلومات مشروع .'
                listItem={[
                    'جميع المشاريع',
                    'المشاريع المكتملة',
                    'المشاريع الملغاة',
                    'المشاريع المستمرة'
                ]}
                onClickList={listFilter}
            />
            <div className="all-project-content">
                {loading && <LoadingIcon />}
                {!loading && !error && <DashboardTable 
                    handleSearch={handleSearch}
                    sortBar={sortBar}
                    list={list}
                    count={projects.length}
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

export default AllProjects;