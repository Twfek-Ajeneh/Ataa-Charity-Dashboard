// import react 
import React , {useState , useEffect} from 'react';
import { useNavigate , useParams} from 'react-router-dom';

//import components
import DashboardPageHeader from '../../../components/Dashboard Page Header/DashboardPageHeader';
import MainButton from '../../../components/Main Button/MainButton';
import Error from '../../../components/Error/Error';
import LoadingIcon from '../../../components/loading icon/loading';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

//import tools and static data
import { monthDateFormat , calcPercent , comma} from '../../../tools/strings';
import { projectCategories , jobStates} from '../../../tools/static data/FormsData';

// import style sheet
import './ProjectDetails.css';

// import project details request
import { getProject , deleteProject , cancelProject} from './projectDetails-request';

function ProjectDetails (props) {
    const {id} = useParams();
    const nav = useNavigate();
    const [project , setProject] = useState(null);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState(false);
    const [loadingDelete , setLoadingDelete] = useState(false);

    useEffect(() => {
        getProject(id).then(res => {
            if(res.ok === true){
                setProject(res.data);
                setLoading(false);
            }
            else{
                setLoading(false);
                setError(true);
            }
        });
    } , []);

    const handleDelete = async () => {
        setLoadingDelete(true);
        const res = await deleteProject(id);
        setLoadingDelete(false);
        if(res.ok === true){
            props.showMessage(true , 'success' , res.text);
            nav('/dashboard/projects/all');
        }  
        else{
            props.showMessage(true , 'error' , res.text);
        }
    }

    const handleCancel = async () => {
        setLoadingDelete(true);
        const res = await cancelProject(id);
        setLoadingDelete(false);
        if(res.ok === true){
            props.showMessage(true , 'success' , res.text);
            nav('/dashboard/projects/all');
        }
        else{
            props.showMessage(true , 'error' , res.text);
        }
    }

    return (
        <div className='project-details'>
            <DashboardPageHeader 
                mainTitle='تفاصيل مشروع'
                subTitle='في هذا القسم يمكن الأطلاع على تفاصيل المشاريع'
                listItem={[
                    'تفاصيل مشروع'
                ]}
            />
            <div className='project-details-content'>
                {loading && <LoadingIcon />}
                {!loading && !error && 
                <> 
                    <div className="project-details-content-section1">          
                        <div className='part1'>
                            <h3>{project.name}</h3>
                            <span><b>الهدف :</b> {comma(project.target)} ل.س</span>
                            <span><b>تم جمع :</b> {comma(project.currentBalance)} ل.س</span>
                            <span className='progress'>
                                <span className='current-progress' style={{width: `${calcPercent(project.target, project.currentBalance)}%`}}></span>
                                <span className='percent'>{`${calcPercent(project.target, project.currentBalance).toFixed(3)}%`}</span>
                            </span>
                            <span className="dividar"></span>
                            <span><b>تاريخ بدء المشروع :</b> {monthDateFormat(project.startDate)}</span>
                            <span><b>تاريخ انتهاء المشروع :</b> {monthDateFormat(project.endDate)}</span>
                        </div>
                        <div className='part2'>
                            <img src={project.image} alt='ProjectImage' onError={e => {
                                e.target.src = '/images/warning1.svg';
                                e.target.style.setProperty('width' , '160px');
                                e.target.style.setProperty('opacity' , '.8');
                                e.target.onError = null;
                            }}/>
                        </div>
                    </div>
                    <div className="project-details-content-section2">
                        <div className="part1">
                            <span><b>المكان:</b>{project.location}</span>
                            <span><b>النوع:</b>{project.type}</span>
                            <span><b>الفئات:</b>{project.categories.map((item , index) => index !== project.categories.length-1 ? `${projectCategories[item-1].name} ,` : projectCategories[item-1].name)}</span>
                        </div>
                        <div className="part2">
                            <span><b>أهداف المشروع:</b>{project.projectGoals}</span>
                        </div>
                        <div className="part3">
                            <span><b>وصف المشروع:</b>{project.projectDescription}</span>
                        </div>
                    </div>
                    <div className="project-details-content-section3">
                        <div className="part1">
                            <span><b>الموظفين</b></span>
                            <div className="employees">
                                {
                                    jobStates.map((value , i) => (
                                        <div key={value.toString()}>
                                            {(project.projectEmployees.findIndex(e => e.jobState === value) !== -1 || 
                                            (value === 'موظف' && project.projectEmployees.findIndex(e => e.jobState === 'متطوع') !== -1 )) ? 
                                                    <div className='title'>{value}</div> : <></>}
                                            {
                                                project.projectEmployees.map((item , index) => {
                                                    if(item.jobState === value || (value === 'موظف' && item.jobState === 'متطوع')){  
                                                        return <div key={(index).toString()} onClick={() => {nav(`/dashboard/employees/details/${item.id}`)}}>
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
                                {project.projectEmployees.length === 0 ? <span className='employees-empty'>لا يوجد موظفين</span> : <></>}
                            </div>
                        </div>
                        <div className="part2">
                            <span><b>المستفيدين</b></span>
                            <div className="beneficiaries">
                                {project.projectBeneficiaries.length !== 0 ? <div className='title'>كل المستفيدين</div> : <></>}
                                {
                                    project.projectBeneficiaries.map((item , index) => (
                                        <div key={(item.name+index).toString()} onClick={() => {nav(`/dashboard/beneficiaries/details/${item.id}`)}}>
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
                                {project.projectBeneficiaries.length === 0 ? <span className='beneficiaries-empty'>لا يوجد مستفيدين</span> : <></>}
                            </div>
                        </div>
                    </div>
                    <div className="project-details-content-section4">
                        { project.status === 'مستمر' &&  
                            <MainButton 
                                title="إلغاء المشروع" 
                                width="140px" 
                                height="40px" 
                                color="var(--main-black)"
                                onClick={handleCancel}
                            />
                        }
                        <MainButton 
                            title="تعديل" 
                            width="140px" 
                            height="40px" 
                            color="var(--main-black)"
                            onClick={() => {nav(`/dashboard/projects/edit/${id}`)}}
                        />
                        <MainButton 
                            title="حذف" 
                            width="140px" 
                            height="40px" 
                            color="var(--main-red)"
                            onClick={handleDelete}
                        />
                    </div> 
                </>}
                {error && <Error />}
                {loadingDelete && <LoadingScreen />}
            </div> 
        </div>
    );
}

export default ProjectDetails;