// import react
import React, { useEffect, useState } from 'react';
import {useParams , useNavigate} from 'react-router-dom';

//import components
import DashboardPageHeader from '../../../components/Dashboard Page Header/DashboardPageHeader';
import MainButton from '../../../components/Main Button/MainButton';
import LoadingIcon from '../../../components/loading icon/loading';
import Error from '../../../components/Error/Error';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

// import tools and static data
import { dateFormat , comma} from '../../../tools/strings';
import { projectCategories } from '../../../tools/static data/FormsData';

//import style sheet
import './BeneficiariesDetails.css';

// import beneficiaries details request
import { getBeneficiary , deleteBeneficiaris , acceptBeneficiary} from './beneficiariesDetails-request';

function BeneficiariesDetails (props) {
    const {id} = useParams();
    const nav = useNavigate();
    const [beneficiary , setBeneficiary] = useState(null);
    const [loading , setLoading] = useState(true);
    const [loadingDelete , setLoadingDelete] = useState(false);
    const [error , setError] = useState(false);
    
    useEffect( () => {
        getBeneficiary(id).then(res => {
            if(res.ok === true){
                setBeneficiary(res.data);
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
        const res = await deleteBeneficiaris(id);
        setLoadingDelete(false);
        if(res.ok === true){
            props.showMessage(true , 'success' , res.text);
            nav('/dashboard/beneficiaries/all');
        }
        else{
            props.showMessage(true , 'error' , res.text);
        }
    };

    const handleAccept = async(value) => {
        setLoadingDelete(true);
        const res = await acceptBeneficiary(id , value);
        setLoadingDelete(false);
        if(res.ok === true){
            props.showMessage(true , 'success' , res.text);
            nav('/dashboard/beneficiaries/all');
        }
        else{
            props.showMessage(true , 'error' , res.text);
        }
    }

    return (
        <div className='beneficiaries-details'>
            <DashboardPageHeader 
                mainTitle='تفاصيل مستفيد'
                subTitle='هذا القسم مسوؤل عن عرض معلومات مستفيد'
                listItem={[
                    'تفاصيل مستفيد'
                ]}
            />
            <div className='beneficiaries-details-content'>
                {loading && <LoadingIcon />}
                {!loading && !error && <>
                    <div className="section1">
                        <div className="personal-info">
                            <h4>معلومات شخصية</h4>
                            <div className="full-name">
                                <div className="inforamtion">اسم الكامل : </div>
                                <div>{beneficiary.name}</div>
                            </div>
                            <div className="gender">
                                <div className="inforamtion">الجنس :</div>
                                <div>{beneficiary.gender}</div>
                            </div>
                            <div className="birth-date">
                                <div className="inforamtion">تاريخ الميلاد :</div>
                                <div>{dateFormat(beneficiary.birthdate)}</div>
                            </div>
                            <div className="id-number">
                                <div className="inforamtion">رقم البطاقة الشخصية :</div>
                                <div>{beneficiary.idNumber}</div>
                            </div>
                            <div className="number-of-children">
                                <div className="inforamtion">عدد الأولاد :</div>
                                <div>{beneficiary.numberOfChildren}</div>
                            </div>
                            <div className="health-status">
                                <div className="inforamtion">الحالة لصحية :</div>
                                <div>{beneficiary.healthStatus}</div>
                            </div>
                            <div className="categories">
                                <div className="inforamtion">فئات المستفيد :</div>
                                <div>{beneficiary.categories.map((item , index) => index !== beneficiary.categories.length-1 ? `${projectCategories[item-1].name} ,` : projectCategories[item-1].name)}</div>
                            </div>
                        </div>
                        <div className="social-info">
                            <h4>معلومات اجتماعية</h4>
                            <div className="social-status">
                                <div className="inforamtion">الحالة الاجتماعية :</div>
                                <div>{beneficiary.socialStatus}</div>
                            </div>
                            <div className="curent-job">
                                <div className="inforamtion">العمل الحالي : </div>
                                <div>{beneficiary.currentJob}</div>
                            </div>
                            <div className="salary">
                                <div className="inforamtion">الدخل الشهري الحالي : </div>
                                <div>{comma(beneficiary.salary)} ل.س</div>
                            </div>
                            <div className="residential-status">
                                <div className="inforamtion">الحالة السكنية :</div>
                                <div>{beneficiary.residentialStatus}</div>
                            </div>
                            <div className="general-status">
                                <div className="inforamtion">الحالة العامة :</div>
                                <div>{beneficiary.generalStatus}</div>
                            </div>
                        </div>
                    </div>
                    <div className="section2">
                        <div className="photo">
                            <img src={beneficiary.image} alt="BeneficiaryImage" onError={e => {
                                e.target.src = '/images/warning1.svg';
                                e.target.style.setProperty('width' , '140px');
                                e.target.style.setProperty('opacity' , '.7');
                                e.target.onError = null;
                            }}/>
                        </div>
                        <div className="contact-info">
                            <h4>معلومات التواصل</h4>
                            <div className="phone-number">
                                <div className="inforamtion">رقم التواصل :</div>
                                <div>{beneficiary.phoneNumber}</div>
                            </div>
                            <div className="email">
                                <div className="inforamtion">البريد الالكتروني :</div>
                                <div>{beneficiary.email}</div>
                            </div>
                            <div className="location">
                                <div className="inforamtion">العنوان : </div>
                                <div>{beneficiary.state} - {beneficiary.region} - {beneficiary.location}</div>
                            </div>
                        </div>
                        <div className="projects">
                            <h4>المشاريع المستفيد منها :</h4>
                            <div className="list-of-projects">
                                {
                                    beneficiary.projects.map((item , index) => (
                                        <div className="project" key={index} onClick={() => {nav(`/dashboard/projects/details/${item.id}`)}}>
                                            <div> {item.name} </div>
                                            <span> النوع : {item.type}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="section3">
                        {
                            beneficiary.status === 'معلق' && 
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
                        <MainButton 
                            title="تعديل" 
                            width="140px" 
                            height="40px" 
                            color="var(--main-black)"
                            onClick={() => {nav(`/dashboard/beneficiaries/edit/${id}`)}}
                        />
                        <MainButton 
                            title="حذف" 
                            width="140px" 
                            height="40px" 
                            color="var(--main-red)"
                            onClick={handleDelete} 
                        />
                    </div>
                </> }
                {error && <Error />}
                {loadingDelete && <LoadingScreen />}
            </div>
        </div>
    );
}

export default BeneficiariesDetails;