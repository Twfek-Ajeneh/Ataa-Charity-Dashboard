// import react
import React, { useState , useEffect} from 'react';

//import components
import DashboardPageHeader from '../../../components/Dashboard Page Header/DashboardPageHeader';
import ProjectBudgetCard from '../../../components/Project Budget Card/ProjectBudgetCard'
import ProgramsBudgetCard from '../../../components/ProgramsBudgetCard/ProgramsBudgetCard';
import PopUpBudget from '../../../components/PopUpBudget/PopUpBudget';
import LoadingIcon from '../../../components/loading icon/loading';
import Error from '../../../components/Error/Error';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

// import tools ans static data
import { comma } from '../../../tools/strings';
import { allPrograms } from '../../../tools/static data/BudgetData';
import { checkSalary } from '../../../tools/validation';

//import style sheet
import './AllBudget.css';

// import all budget request
import { getBudget , editProgram} from './allBudget-request';

const initError = {
    newValue: {
        is : false,
        text: ''
    },
    server: {
        is: false ,
        text: ''
    }
}

function AllBudget (props) {
    const [getLoading , setGetLoading] = useState(true);
    const [getError , setGetError] = useState(false);
    const [editLoading , setEditLoading] = useState(false);
    const [id , setId] = useState(1);
    const [newValue , setNewValue] = useState('');
    const [error , setError] = useState(initError);
    const [filterStatus , setFilterStatus] = useState(0);
    const [showPopUp , setShowPopUp] = useState(false);
    const [data , setData] = useState(null);
    const [programs , setPrograms] = useState(null);

    useEffect(() => {
        getBudget().then(res => {
            if(res.ok === true){
                setData(res.data);
                setPrograms(res.data.programs);
                setGetLoading(false);   
            }
            else {
                setGetLoading(false);
                setGetError(true);
            }
        })
    } , []);

    const handleEdit = async () => {
        setError(initError);

        //validation
        let ok = true;
        let tempError = initError;
        if(checkSalary(newValue)){
            tempError = {...tempError , newValue: {is : true , text: 'القيمة المدخلة غير صالحة'}}
            ok = false;
        }
        if(ok === false){
            setError(tempError);
            return;
        }
        
        //request{
        setShowPopUp(false);
        setEditLoading(true);
        const res = await editProgram(id , newValue);
        setEditLoading(false);
        if(res.ok === true){
            const tempPrograms = [...programs];
            tempPrograms[id-1].target = newValue;
            setPrograms(tempPrograms);
            props.showMessage(true , 'success' , 'تم تحديث قيمة البرنامج');
        }
        else{
            setError(res.error);
            if(res.error.server.is)
                props.showMessage(true , 'error' , res.error.server.text);
        }   
    }

    return (
        <div className='all-budget'>
            <DashboardPageHeader
                mainTitle='الميزانية'
                subTitle='في هذا القسم يمكنك الاطلاع على ميزانية الجمعية كاملة , وحملات الجمعية وبرامجها'
                listItem={[
                    'الجمعية',
                    'الحملات',
                    'برامج الجمعية'
                ]}
                onClickList={setFilterStatus}
            />
            <div className="all-budget-content">
                {getLoading && <LoadingIcon />}
                {!getLoading && !getError && 
                    <>
                        <div className="total-budget">
                            {filterStatus === 0 ? <span>الميزانية الكلية للجمعية : {comma(data.charityBudget)} ل.س</span> : <></>}
                            {filterStatus === 1 ? <span>الميزانية الكلية للحملات : {comma(data.projectsBudget)} ل.س</span> : <></>}
                            {filterStatus === 2 ? <span>الميزانية الكلية للبرامج : {comma(data.programsBudget)} ل.س</span> : <></>}
                        </div>
                        {((filterStatus === 0 || filterStatus === 1) && data.projects.length !== 0)  ? 
                            <div className="projects-budget-cards">
                                {
                                    data.projects.map((item , index) => (
                                        <ProjectBudgetCard 
                                            key={(item.name+index).toString()}
                                            project={item}
                                        />
                                    ))
                                }
                            </div> : 
                            <></>
                        }
                        {((filterStatus === 0 || filterStatus === 1) && data.projects.length === 0) && <div className='projects-budget-cards-empty'>لا يوجد مشاريع</div>}
                        {(filterStatus === 0) ? <div className='divider'></div> : <></>}
                        {(filterStatus === 0 || filterStatus === 2) ?
                            <div className='programs-budget-cards'>
                                {
                                    programs.map((item , index) => (
                                        <ProgramsBudgetCard 
                                            key={(index+allPrograms[index].name).toString()}
                                            icon={allPrograms[index].icon}
                                            name={allPrograms[index].name}
                                            currentBalance={item.currentBalance}
                                            currentValue={item.target}
                                            onClick={() => {
                                                if(localStorage.getItem('role') === 'موظف') return;
                                                setId(item.id);
                                                setNewValue(item.target);
                                                setError(initError);
                                                setShowPopUp(true);
                                            }}
                                        />
                                    ))
                                }
                            </div> :
                            <></>
                        }
                        {showPopUp && 
                            <PopUpBudget 
                                value={newValue}
                                onChange={setNewValue}
                                error={error.newValue}
                                onEdit={handleEdit}
                                onCancel={() => {setShowPopUp(false)}}
                            />
                        }
                    </>
                }
                {getError && <Error />}
                {editLoading && <LoadingScreen />}
            </div>
        </div>
    );
}

export default AllBudget;