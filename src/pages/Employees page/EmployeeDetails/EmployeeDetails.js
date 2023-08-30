// improt react
import React, { useEffect, useState } from 'react';
import {useParams , useNavigate} from 'react-router-dom';

//import components
import DashboardPageHeader from '../../../components/Dashboard Page Header/DashboardPageHeader';
import MainButton from '../../../components/Main Button/MainButton';
import LoadingIcon from '../../../components/loading icon/loading';
import Employee from '../../../modules/employee';
import Error from '../../../components/Error/Error';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

// import tools and static data
import { dateFormat } from '../../../tools/strings';

//import style sheet
import './EmployeeDetails.css';

//import employee details request
import { getEmployee , deleteEmployee , acceptEmployee } from './employeeDetails-request';

function EmployeeDetails (props) {
    const {id} = useParams();
    const nav = useNavigate();
    const [employee , setEmployee] = useState(new Employee());
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState(false);
    const [loadingDelete , setLoadingDelete] = useState(false);

    useEffect( () => {
        getEmployee(id).then(res => {
            if(res.ok === true){
                setEmployee(res.data);
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
        const res = await deleteEmployee(id);
        setLoadingDelete(false);
        if(res.ok === true){
            props.showMessage(true , 'success' , res.text);
            nav('/dashboard/employees/all');
        }
        else{
            props.showMessage(true , 'error' , res.text);
        }
    }

    const handleAccept = async (value) => {
        setLoadingDelete(true);
        const res = await acceptEmployee(id , value);
        setLoadingDelete(false);
        if(res.ok === true){
            props.showMessage(true , 'success' , res.text);
            nav('/dashboard/employees/all');
        }
        else{
            props.showMessage(true , 'error' , res.text);
        }
    }

    return (
        <div className='employee-details'>
            <DashboardPageHeader 
                mainTitle='تفاصيل موظف'
                subTitle='في هذا القسم يمكنك عرض معلومات موظف في الجمعية'
                listItem={[
                    'تفاصيل موظف'
                ]}
            />
            <div className='employee-details-content'>
                {loading && <LoadingIcon />}
                {!loading && !error && <>
                    <div className="section1">
                        <div className="personal-info">
                            <h4>معلومات الشخصية</h4>
                            <div className="full-name">
                                <div className="information">اسم الكامل : </div>
                                <div>{employee.name}</div>
                            </div>
                            <div className="gender">
                                <div className="information">الجنس :</div>
                                <div>{employee.gender}</div>
                            </div>
                            <div className="birth-date">
                                <div className="information">تاريخ الميلاد :</div>
                                <div>{dateFormat(employee.birthdate)}</div>
                            </div>
                            <div className="id-number">
                                <div className="information">رقم البطاقة الشخصية :</div>
                                <div>{employee.idNumber}</div>
                            </div>
                        </div>
                        <div className="job-info">
                            <h4>معلومات الوظيفية</h4>
                            <div className="category">
                                <div className="information">الفئة : </div>
                                <div>{employee.category}</div>
                            </div>
                            <div className="job-status">
                                <div className="information">الرتبة الوظيفية : </div>
                                <div>{employee.jobState}</div>
                            </div>
                            <div className="emplyoeeDetails">
                                <div className="information">خبرات الموظف : </div>
                                <div>{employee.employeeDetails}</div>
                            </div>
                        </div>
                    </div>
                    <div className="section2">
                        <div className="photo">
                            <img src={employee.image} alt="EmployeeImage" onError={e => {
                                e.target.src = '/images/warning1.svg';
                                e.target.style.setProperty('opacity' , '.7');
                                e.target.style.setProperty('width' , '140px');
                                e.target.onError = null;
                            }}/>
                        </div>
                        <div className="contact-info">
                            <h4>معلومات التواصل</h4>
                            <div className="phone-number">
                                <div className="information">رقم التواصل :</div>
                                <div>{employee.phoneNumber}</div>
                            </div>
                            <div className="email">
                                <div className="information">البريد الالكتروني : </div>
                                <div>{employee.email}</div>
                            </div>
                            <div className="location">
                                <div className="information">العنوان : </div>
                                <div>{employee.state} - {employee.region} - {employee.location}</div>
                            </div>
                        </div>
                    </div>
                    <div className="section3">
                        {
                            employee.status === 'معلق' && 
                            <>
                                <MainButton 
                                    title="قبول" 
                                    width="140px" 
                                    height="40px" 
                                    color="var(--main-color)"
                                    onClick={() => handleAccept('مقبول')}
                                />
                                <MainButton 
                                    title="رفض" 
                                    width="140px" 
                                    height="40px" 
                                    color="var(--main-red)"
                                    onClick={() => handleAccept('مرفوض')}
                                />
                            </>
                        }
                        { localStorage.getItem('role') === 'مدير' &&
                            <>
                                <MainButton 
                                    title="تعديل" 
                                    width="140px" 
                                    height="40px" 
                                    color="var(--main-black)"
                                    onClick={() => {nav(`/dashboard/employees/edit/${employee.id}`)}}
                                />
                                <MainButton 
                                    title="حذف" 
                                    width="140px" 
                                    height="40px" 
                                    color="var(--main-red)"
                                    onClick={handleDelete}
                                />
                            </>
                        }
                    </div>
                </>}
                {error && <Error />}
                {loadingDelete && <LoadingScreen />}
            </div>
        </div>
    );
}

export default EmployeeDetails;