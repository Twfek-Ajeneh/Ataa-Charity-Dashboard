// import react
import React, { useState , useEffect} from 'react';
import { useNavigate , useParams } from 'react-router-dom'

//import icons
import DashboardPageHeader from '../../../components/Dashboard Page Header/DashboardPageHeader';
import DateInputField from '../../../components/DateInputField/DateInputField';
import ImageInputField from '../../../components/ImageInputField/ImageInputField';
import SelectInputField from '../../../components/SelectInputField/SelectInputField';
import TextInputField from '../../../components/TextInputField/TextInputField';
import TextAreaInputField from '../../../components/TextAreaInputField/TextAreaInputField'
import SubmitButton from '../../../components/Submit Button/SubmitButton'
import MoneyIcon from '../../../Icons/Form/MoneyIcon'
import LoadingIcon from '../../../components/loading icon/loading';
import MultiSelectInput from '../../../components/MultiSelectInput/MultiSelectInput';
import PopUpList from '../../../components/PopUpList/PopUpList';
import PlusIcon from '../../../Icons/Form/PlusIcon';
import Error from '../../../components/Error/Error';

//import tools and static data
// import { employees as allEmployees, beneficiaries as allBeneficiaries} from '../../../tools/static data/TablesData';
import { states , projectCategories , projectTypes , jobStates} from '../../../tools/static data/FormsData';
import { checkName, checkSalary, isEmpty } from '../../../tools/validation';
import { dateFormat , maxDate} from '../../../tools/strings'

//import style sheet
import './EditProject.css';

// import add project request
import { editProject , getAllEmployeeBeneficiaries} from './editProject-request';

const initError = {
    name : {
        is: false,
        text : ''
    },
    categories: {
        is: false,
        text: ''
    },
    image: {
        is: false,
        text: ''
    },
    projectGoals:{
        is: false,
        text: ''
    },
    projectDescription:{
        is: false,
        text: ''
    },
    target:{
        is: false,
        text: ''
    },
    server:{
        is: false,
        text: ''
    }
}

function EditProject (props) {
    const {id} = useParams();
    const nav = useNavigate();
    const [name , setName] = useState('');
    const [startDate , setStartDate] = useState(dateFormat(new Date()));   
    const [endDate , setEndDate] = useState(dateFormat(new Date()));   
    const [image , setImage] = useState(null);
    const [target , setTarget] = useState('0.000');
    const [location , setLocation] = useState('دمشق')
    const [type , setType] = useState('عام');
    const [categories , setCategories] = useState([]);
    const [projectGoals , setProjectGoals] = useState('');
    const [projectDescription , setProjectDescription] = useState('');
    const [projectEmployees , setProjectEmployees] = useState([]);
    const [newProjectEmployees , setNewProjectEmployees] = useState([]);
    const [projectBeneficiaries , setProjectBeneficiaries] = useState([]);
    const [newProjectBeneficiaries , setNewProjectBeneficiaries] = useState([]);
    const [error , setError] = useState(initError);
    const [loading , setLoading] = useState(false); 
    const [employeesPopUp , setEmployeesPopUp] = useState(false);
    const [beneficiariesPopUp , setBeneficiariesPopUp] = useState(false);
    const [employeesSortStatus , setEmployeesSortStatus] = useState([false , false, false , false]);
    const [beneficiariesSortStatus , setBeneficiariesSortStatus] = useState([false , false, false , false]);
    const [allBeneficiaries , setAllBeneficiaries] = useState([]);
    const [beneficiariesList , setBeneficiariesList] = useState([]);
    const [allEmployees , setAllEmployees] = useState([]);
    const [employeesList , setEmployeesList] = useState([]);
    const [getLoading , setGetLoading] = useState(true);
    const [getError , setGetError] = useState(false);

    useEffect(() => {
        getAllEmployeeBeneficiaries(id).then(res => {
            setGetLoading(false);
            if(res.ok === true){
                setName(res.data.project.name);
                setStartDate(dateFormat(res.data.project.startDate))
                setEndDate(dateFormat(res.data.project.endDate))
                setImage(res.data.project.image);
                setTarget(res.data.project.target);
                setLocation(res.data.project.location);
                setType(res.data.project.type);
                setCategories(res.data.project.categories);
                setProjectGoals(res.data.project.projectGoals);
                setProjectDescription(res.data.project.projectDescription)
                setProjectEmployees(res.data.project.projectEmployees);
                setProjectBeneficiaries(res.data.project.projectBeneficiaries);
                setAllEmployees(res.data.employees);
                setAllBeneficiaries(res.data.beneficiaries);
                setEmployeesList(res.data.employees);
                setBeneficiariesList(res.data.beneficiaries);
            }
            else{
                setGetError(true);
            }
        });
    } , []);

    const employeeSortBar = [
        {
            key: 'id',
            name: 'رقم التعريف',
            width: '75px',
            color: 'var(--secondary-color)',
            fontWeight: 'normal',
            onClick: () => {
                const tempList = [...employeesList];
                const tempSortStatus = [...employeesSortStatus];
                if(employeesSortStatus[0] === true)
                    tempList.sort((e1, e2) =>  e1.id - e2.id);
                else
                    tempList.sort((e1 , e2) => e2.id - e1.id);
                tempSortStatus[0] = !tempSortStatus[0];
                setEmployeesList(tempList);
                setEmployeesSortStatus(tempSortStatus);
            }
        },
        {
            key: 'name',
            name: 'اسم الموظف',
            width: '85px',
            color: 'var(--main-black)',
            fontWeight: 'bold',
            onClick: () => {
                const tempList = [...employeesList];
                const tempSortStatus = [...employeesSortStatus];
                if(employeesSortStatus[1] === true)
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
                setEmployeesList(tempList);
                setEmployeesSortStatus(tempSortStatus);
            }
        },
        {
            key: 'jobState',
            name: 'الرتبة الوظيفية',
            width: '85px',
            color: 'var(--main-black)',
            fontWeight: 'normal',
            onClick: () => {
                const tempList = [...employeesList];
                const tempSortStatus = [...employeesSortStatus];
                if(employeesSortStatus[2] === true)
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
                tempSortStatus[2] = !tempSortStatus[2];
                setEmployeesList(tempList);
                setEmployeesSortStatus(tempSortStatus);
            }
        },
        {
            key: 'status',
            name: 'الحالة',
            width: '50px',
            color: 'var(--main-black)',
            fontWeight: 'normal',
            onClick: () => {
                const tempList = [...employeesList];
                const tempSortStatus = [...employeesSortStatus];
                if(employeesSortStatus[3] === true)
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
                tempSortStatus[3] = !tempSortStatus[3];
                setEmployeesList(tempList);
                setEmployeesSortStatus(tempSortStatus);
            }
        },
    ];
    
    const beneficiariesSortBar = [
        {
            key: 'id',
            name: 'رقم التعريف',
            width: '75px',
            color: 'var(--secondary-color)',
            fontWeight: 'normal',
            onClick: () => {
                const tempList = [...beneficiariesList];
                const tempSortStatus = [...beneficiariesSortStatus];
                if(beneficiariesSortStatus[0] === true)
                    tempList.sort((e1, e2) =>  e1.id - e2.id);
                else
                    tempList.sort((e1 , e2) => e2.id - e1.id);
                tempSortStatus[0] = !tempSortStatus[0];
                setBeneficiariesList(tempList);
                setBeneficiariesSortStatus(tempSortStatus);
            }
        },
        {
            key: 'name',
            name: 'اسم المستفيد',
            width: '88px',
            color: 'var(--main-black)',
            fontWeight: 'bold',
            onClick: () => {
                const tempList = [...beneficiariesList];
                const tempSortStatus = [...beneficiariesSortStatus];
                if(beneficiariesSortStatus[1] === true)
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
                setBeneficiariesList(tempList);
                setBeneficiariesSortStatus(tempSortStatus);
            }
        },
        {
            key: 'state',
            name: 'المنطقة',
            width: '50px',
            color: 'var(--main-black)',
            fontWeight: 'bold',
            onClick: () => {
                const tempList = [...beneficiariesList];
                const tempSortStatus = [...beneficiariesSortStatus];
                if(beneficiariesSortStatus[2] === true)
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
                tempSortStatus[2] = !tempSortStatus[2];
                setBeneficiariesList(tempList);
                setBeneficiariesSortStatus(tempSortStatus);
            }
        },
        {
            key: 'status',
            name: 'الحالة',
            width: '50px',
            color: 'var(--main-black)',
            fontWeight: 'normal',
            onClick: () => {
                const tempList = [...beneficiariesList];
                const tempSortStatus = [...beneficiariesSortStatus];
                if(beneficiariesSortStatus[3] === true)
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
                tempSortStatus[3] = !tempSortStatus[3];
                setBeneficiariesList(tempList);
                setBeneficiariesSortStatus(tempSortStatus);
            }
        }
    ];

    const handleEmployeesSearch = (e , value) => {
        e.preventDefault(); 
        const tempList = allEmployees.filter((item) => {
            if(item.id.toString().includes(value)) return true;
            else if(item.name.toString().includes(value)) return true;
            else if(item.jobState.toString().includes(value)) return true;
            else if(item.status.toString().includes(value)) return true;
            return false;
        });
        setEmployeesList(tempList);
    }

    const handleBeneficiraiesSerach = (e , value) => {
        e.preventDefault(); 
        const tempList = allBeneficiaries.filter((item) => {
            if(item.id.toString().includes(value)) return true;
            else if(item.name.toString().includes(value)) return true;
            else if(item.state.toString().includes(value)) return true;
            else if(item.status.toString().includes(value)) return true;
            return false;
        });
        setBeneficiariesList(tempList);
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError(initError);

        //validation
        let ok = true;
        let tempError = initError;
        if(checkName(name)){
            tempError = {...tempError , name: {is: true , text: 'اسم المشروع المدخل غير صالح'}}
            ok = false;
        }
        if(categories.length === 0){
            tempError = {...tempError , categories: {is: true , text: 'الرجاء إدخال فئات المشروع'}}
            ok = false;
        }
        if(image === null){
            tempError = {...tempError , image: {is: true, text: 'الرجاء إدخال صورة المشروع'}}
            ok = false;
        }
        if(isEmpty(projectGoals)){
            tempError = {...tempError , projectGoals: {is :true , text: 'الرجاء إدخال أهداف المشروع'}}
            ok = false;
        }
        if(isEmpty(projectDescription)){
            tempError = {...tempError , projectDescription: {is :true , text: 'الرجاء إدخال وصف المشروع'}}
            ok = false;
        }
        if(checkSalary(target)){
            tempError = {...tempError , target: {is : true , text: 'القيمة المدخلة غير صالحة'}}
            ok = false;
        }
        if(ok === false){
            setError(tempError);
            return;
        }

        //request
        setLoading(true);
        const res = await editProject(id , name , startDate , endDate , image , target , location
                                        , type , categories , projectGoals , projectDescription , newProjectEmployees , newProjectBeneficiaries);
        setLoading(false);
        if(res.ok === true){
            props.showMessage(true , 'success' , 'تم تحديث معلومات المشروع');
            nav(-1);
        }
        else{
            setError(res.error)
            if(res.error.server.is){
                props.showMessage(true , 'error' , res.error.server.text);
            }
        }
    }

    const handleDate = (value) => {
        setStartDate(value);
        setEndDate(maxDate(value , endDate));
    }

    return (
        <div className='edit-project'>
            <DashboardPageHeader 
                mainTitle='تعديل مشروع'
                subTitle='يمكن من خلال هذا القسم تعديل معلومات مشروع .'
                listItem={['تعديل مشروع']}
            />
            <div className='edit-project-content'>
                {getLoading && <LoadingIcon />}
                {!getLoading && !getError && <form dir='rtl' onSubmit={handleSubmit}>
                    <div className="section1">
                        <div className="section2">
                            <TextInputField 
                                id='projectName' 
                                name='projectName' 
                                label='اسم المشروع' 
                                type='text'
                                width='300px' 
                                height='40px' 
                                placeholder='اسم المشروع'
                                autoFocus={true}
                                value={name}
                                onChange={setName}
                                Error={error.name}
                            />
                            <DateInputField 
                                label='تاريخ بدء المشروع' 
                                width='300px' 
                                height='40px'
                                value={startDate}
                                onChange={handleDate}
                            />
                            <DateInputField 
                                label='تاريخ انتهاء المشروع' 
                                width='300px' 
                                height='40px'
                                min={startDate}
                                value={endDate}
                                onChange={setEndDate}
                            />
                            <div className="section3">
                                <SelectInputField 
                                    label='المحافظة' 
                                    id='state' 
                                    name='state' 
                                    width='115px' 
                                    height='40px'
                                    options={states}
                                    value={location}
                                    onSelect={setLocation}
                                />
                                <SelectInputField 
                                    label='النوع' 
                                    id='type' 
                                    name='type' 
                                    width='100px' 
                                    height='40px'
                                    options={projectTypes}
                                    value={type}
                                    onSelect={setType}
                                />
                                <MultiSelectInput
                                    label='الفئات'
                                    placeholder='أدخل الفئة'
                                    options={projectCategories}
                                    list={categories}
                                    onChange={setCategories}
                                    Error={error.categories}
                                />
                            </div>
                        </div>
                        <div className="section4">
                            <ImageInputField 
                                label='الصورة' 
                                width='500px' 
                                height='100%' 
                                iconSize='65px' 
                                value={image}
                                onChange={setImage}
                                Error={error.image}
                            />
                        </div>
                    </div>
                    <div className="section5">
                        <TextAreaInputField 
                            id='projectGoals' 
                            name='projectGoals' 
                            label='أهداف المشروع' 
                            width='500px' 
                            height='165px' 
                            placeholder='أهداف المشروع'
                            value={projectGoals}
                            onChange={setProjectGoals}
                            Error={error.projectGoals}
                        />
                        <TextAreaInputField 
                            id='projectDescription' 
                            name='projectDescription' 
                            label='وصف المشروع' 
                            width='500px' 
                            height='165px' 
                            placeholder='وصف المشروع'
                            value={projectDescription}
                            onChange={setProjectDescription}
                            Error={error.projectDescription}
                        />
                    </div>
                    <div className="section6">
                        <div className="part1">
                            <span><b>الموظفين</b></span>
                            <div className="employees">
                                {
                                    jobStates.map((value , i) => (
                                        <div key={(value+i).toString()}>
                                            {(projectEmployees.findIndex(e => e.jobState === value) !== -1 || newProjectEmployees.findIndex(e => e.jobState === value) !== -1 || 
                                            (value === 'موظف' && (projectEmployees.findIndex(e => e.jobState === 'متطوع') !== -1  || newProjectEmployees.findIndex(e => e.jobState === 'متطوع') !== -1))) ? 
                                                    <div className='title'>{value}</div> : <></>}
                                            {
                                                projectEmployees.map((item , index) => {
                                                    if(item.jobState === value || (value === 'موظف' && item.jobState === 'متطوع')){  
                                                        return <div key={(item.name+index).toString()}>
                                                            <img src={item.image} alt='EmployeeImage' onError={e => {
                                                                e.target.src = '/images/warning.svg';
                                                                e.target.onError = null;
                                                            }}/>
                                                            <span>
                                                                <b>{item.name}</b>
                                                                <span>{item.category}</span>
                                                            </span>
                                                        </div>
                                                    }
                                                })
                                            }
                                            {
                                                newProjectEmployees.map((item , index) => {
                                                    if(item.jobState === value || (value === 'موظف' && item.jobState === 'متطوع')){  
                                                        return <div key={(item.name+index).toString()}>
                                                            <img src={item.image} alt='EmployeeImage' onError={e => {
                                                                e.target.src = '/images/warning.svg';
                                                                e.target.onError = null;
                                                            }}/>
                                                            <span>
                                                                <b>{item.name}</b>
                                                                <span>{item.category}</span>
                                                            </span>
                                                        </div>
                                                    }
                                                })
                                            }
                                        </div>
                                    ))
                                }
                                <div onClick={(e) => {e.preventDefault(); setEmployeesPopUp(true)}} className='plus-button'>   
                                    <PlusIcon />
                                    <span style={{fontSize: '14px'}}>
                                        إضافة موظفين
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="part2">
                            <span><b>المستفيدين</b></span>
                            <div className="beneficiaries">
                                {(projectBeneficiaries.length !== 0 || newProjectBeneficiaries.length !== 0) ? <div className='title'>كل المستفيدين</div> : <></>}
                                {
                                    projectBeneficiaries.map((item , index) => (
                                        <div key={(item.name+index).toString()}>
                                            <img src={item.image} alt='BeneficiaryImage' onError={e => {
                                                e.target.src = '/images/warning.svg';
                                                e.target.onError = null;
                                            }}/>
                                            <span>
                                                <b>{item.name}</b>
                                                <span>{item.state}</span>
                                            </span>
                                        </div>
                                    ))
                                }
                                {
                                    newProjectBeneficiaries.map((item , index) => (
                                        <div key={(item.name+index).toString()}>
                                            <img src={item.image} alt='BeneficiaryImage' onError={e => {
                                                e.target.src = '/images/warning.svg';
                                                e.target.onError = null;
                                            }}/>
                                            <span>
                                                <b>{item.name}</b>
                                                <span>{item.state}</span>
                                            </span>
                                        </div>
                                    ))
                                }
                                <div onClick={(e) => {e.preventDefault(); setBeneficiariesPopUp(true)}} className='plus-button'>   
                                    <PlusIcon />
                                    <span style={{fontSize: '14px'}}>
                                        إضافة مستفيدين
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section7">
                        <TextInputField 
                            id='target' 
                            name='target' 
                            label='المبلغ المراد تحقيقه' 
                            type='number'
                            min='0'
                            step='any'
                            numberArrow='none'
                            suffix='ل.س'
                            width='300px' 
                            height='40px' 
                            icon={<MoneyIcon />}
                            value={target}
                            onChange={setTarget}
                            Error={error.target}
                        />
                        <div className='section8'>
                            {loading && <LoadingIcon />}
                            <SubmitButton 
                                title="تعديل" 
                                color="var(--main-color)" 
                                width="140px" 
                                height="40px"
                                onClick={null}
                                disabled = {loading}
                            />
                        </div>
                    </div>
                    {employeesPopUp && 
                        <PopUpList
                            list={employeesList}
                            sortBar={employeeSortBar}
                            show={setEmployeesPopUp}
                            value={newProjectEmployees}
                            onChange={setNewProjectEmployees}
                            handleSearch={handleEmployeesSearch}
                        />
                    }
                    {beneficiariesPopUp && 
                        <PopUpList
                            list={beneficiariesList}
                            sortBar={beneficiariesSortBar}
                            show={setBeneficiariesPopUp}
                            value={newProjectBeneficiaries}
                            onChange={setNewProjectBeneficiaries}
                            handleSearch={handleBeneficiraiesSerach}
                        />
                    }
                </form>}
                {getError && <Error />}
            </div>
        </div>
    );
}

export default EditProject;