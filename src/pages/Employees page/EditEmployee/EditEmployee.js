// import react
import React, { useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';

//import components
import DashboardPageHeader from '../../../components/Dashboard Page Header/DashboardPageHeader';
import DateInputField from '../../../components/DateInputField/DateInputField';
import ImageInputField from '../../../components/ImageInputField/ImageInputField';
import SelectInputField from '../../../components/SelectInputField/SelectInputField';
import TextInputField from '../../../components/TextInputField/TextInputField';
import TextAreaInputField from '../../../components/TextAreaInputField/TextAreaInputField'
import SubmitButton from '../../../components/Submit Button/SubmitButton'
import UserIcon from '../../../Icons/Form/UserIcon';
import CardIcon from '../../../Icons/Form/CardIcon';
import EmailIcon from '../../../Icons/Form/EmailIcon'
import PhoneIcon from '../../../Icons/Form/PhoneIcon';
import LocationIcon from '../../../Icons/Form/LocationIcon'
import LoadingIcon from '../../../components/loading icon/loading';
import Error from '../../../components/Error/Error';

// import tools and static data
import { states , regions , genders , employeeCategory , jobStates} from '../../../tools/static data/FormsData';
import { dateFormat } from '../../../tools/strings';
import { checkIdNumber, checkName , checkPhoneNumber, isEmpty} from '../../../tools/validation';

//import style sheet
import './EditEmployee.css';

// import edit employee request
import { getEmployee , editEmployee} from './editEmployee-request';

const initError = {
    name : {
        is: false,
        text : ''
    },
    idNumber : {
        is: false,
        text: ''
    },
    phoneNumber: {
        is: false,
        text: ''
    },
    image: {
        is: false,
        text: ''
    },
    location:{
        is: false,
        text: ''
    },
    employeeDetails:{
        is: false,
        text: ''
    },
    server:{
        is : false,
        text: ''
    }
}

function EditEmployee (props) {
    const {id} = useParams();
    const nav = useNavigate();
    const [name , setName] = useState('');
    const [idNumber , setIdNumber] = useState('');
    const [email , setEmail] = useState('');
    const [birthdate , setBirthdate] = useState(dateFormat(new Date()));
    const [phoneNumber , setPhoneNumber] = useState('');
    const [image , setImage] = useState(null);
    const [gender , setGender] = useState('ذكر');
    const [category , setCategory] = useState('موظف');
    const [jobState , setJobState] = useState('مدير');
    const [state , setState] = useState('دمشق')
    const [region , setRegion] = useState('منطقة دمشق');
    const [location , setLocation] = useState('');
    const [employeeDetails , setEmployeeDetails] = useState('');
    const [error , setError] = useState(initError);
    const [getError , setGetError] = useState(false);
    const [submitLoading , setSubmitLoading] = useState(false);
    const [isChange , setIsChange] = useState(true);
    const [loading , setLoading] = useState(true);

    const handleState = (value) => {
        setState(value);
        setRegion(regions[value][0]);
    }

    useEffect(() => {
        getEmployee(id).then(res => {
            setLoading(false);
            if(res.ok === true){
                setName(res.data.name);
                setIdNumber(res.data.idNumber);
                setEmail(res.data.email);
                setBirthdate(dateFormat(res.data.birthdate));
                setPhoneNumber(res.data.phoneNumber);
                setImage(res.data.image);
                setGender(res.data.gender);
                setCategory(res.data.category);
                setJobState(res.data.jobState);
                setState(res.data.state);
                setRegion(res.data.region);
                setLocation(res.data.location);
                setEmployeeDetails(res.data.employeeDetails);
            }
            else{
                setGetError(true);
            }
        });
    } , []);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError(initError);

        //validation
        let ok = true;
        let tempError = initError;
        if(checkName(name)){
            tempError = {...tempError , name: {is: true , text: 'الاسم المدخل غير صالح'}}
            ok = false;
        }
        if(checkIdNumber(idNumber)){
            tempError = {...tempError , idNumber:{is : true , text: 'رقم البطاقة المدخل غير صالح'}}
            ok = false;
        }
        if(checkPhoneNumber(phoneNumber)){
            tempError = {...tempError , phoneNumber:{is : true , text: 'رقم التواصل المدخل غير صالح'}}
            ok = false;
        }
        if(image === null){
            tempError = {...tempError , image: {is: true, text: 'الرجاء إدخال صورة شخصية'}}
            ok = false;
        }
        if(isEmpty(location)){
            tempError = {...tempError , location : {is : true, text: 'الرجاء إدخال العنوان'}}
            ok = false;
        }
        if(isEmpty(employeeDetails)){
            tempError = {...tempError , employeeDetails: {is :true , text: 'الرجاء إدخال خبرات الموظف'}}
            ok = false;
        }
        if(ok === false){
            setError(tempError);
            return;
        }

        //request
        setSubmitLoading(true);
        const res = await editEmployee(id , name , idNumber , email , birthdate 
                                    , phoneNumber , image , gender , category 
                                    , jobState , state , region , location , employeeDetails);
        setSubmitLoading(false);
        if(res.ok === true){
            props.showMessage(true , 'success' , 'تم تحديث معلومات الموظف');
            nav(-1);
        }
        else{
            setError(res.error);
            if(res.error.server.is === true){
                props.showMessage(true , 'error' , res.error.server.text);
            }
        }
    }

    return (
        <div className='edit-employee'>
            <DashboardPageHeader 
                mainTitle='تعديل موظف'
                subTitle='في هذا القسم يمكنك تعديل معلومات موظف في الجمعية'
                listItem={[
                    'تعديل موظف'
                ]}
            />
            <div className='edit-employee-content'>
                {loading && <LoadingIcon />}
                {!loading && !getError && <>
                    <form dir='rtl'  onSubmit={handleSubmit} onChange={() => {isChange && setIsChange(false)}}>
                        <div className="section1">
                            <div className="section2">
                            <TextInputField 
                                    id='fullName' 
                                    name='fullName' 
                                    label='الاسم الكامل' 
                                    type='text'
                                    width='300px' 
                                    height='40px'
                                    placeholder='الاسم الكامل'
                                    icon={<UserIcon />}
                                    autoFocus={true}
                                    value={name}
                                    onChange={setName}
                                    Error={error.name}
                                />
                                <TextInputField 
                                    id='idNumber' 
                                    name='idNumber' 
                                    label='رقم البطاقة الشخصية' 
                                    type='number'
                                    numberArrow='none'
                                    width='300px' 
                                    height='40px' 
                                    placeholder='رقم البطاقة الشخصية'
                                    icon={<CardIcon />}
                                    value={idNumber}
                                    onChange={setIdNumber}
                                    Error={error.idNumber}
                                />
                                <TextInputField 
                                    id='email' 
                                    name='email'
                                    label='البريد الالكتروني' 
                                    type='email'
                                    width='300px' 
                                    height='40px' 
                                    placeholder='البريد الالكتروني'
                                    icon ={<EmailIcon />}
                                    value={email}
                                    onChange={setEmail}
                                />
                                <TextInputField 
                                    id='phoneNumber' 
                                    name='phoneNumber' 
                                    label='رقم التواصل' 
                                    type='number'
                                    numberArrow='none'
                                    width='300px' 
                                    height='40px' 
                                    placeholder='رقم التواصل'
                                    icon={<PhoneIcon />}
                                    value={phoneNumber}
                                    onChange={setPhoneNumber}
                                    Error={error.phoneNumber}
                                />
                            </div>
                            <div className="section3">
                            <ImageInputField 
                                    label='الصورة' 
                                    width='190px' 
                                    height='165px' 
                                    iconSize='65px' 
                                    value={image}
                                    onChange={setImage}
                                    Error={error.image}
                                />
                            </div>
                        </div>
                        <div className="section4">
                            <DateInputField 
                                    label='تاريخ الميلاد' 
                                    width='300px' 
                                    height='40px'
                                    max={dateFormat(new Date())}
                                    value={birthdate}
                                    onChange={setBirthdate}
                            />
                            <SelectInputField 
                                label='الجنس' 
                                id='gender' 
                                name='gender' 
                                width='100px' 
                                height='40px'
                                options={genders} 
                                value={gender}
                                onSelect={setGender}
                            />
                            <SelectInputField 
                                label='الفئة' 
                                id='catergory' 
                                name='catergory' 
                                width='100px' 
                                height='40px'
                                options={employeeCategory} 
                                value={category}
                                onSelect={setCategory}
                            />
                            <SelectInputField 
                                label='الرتبة الوظيفية' 
                                id='jobState' 
                                name='jobState' 
                                width='120px' 
                                height='40px'
                                disabled={category === 'متطوع' ? true : false}
                                options={jobStates} 
                                value={jobState}
                                onSelect={setJobState}
                            />
                        </div>
                        <div className="section5">
                        <SelectInputField 
                                label='المحافظة' 
                                id='state' 
                                name='state' 
                                width='115px' 
                                height='40px'
                                options={states}
                                value={state}
                                onSelect={handleState}
                            />
                            <SelectInputField 
                                label='المنطقة' 
                                id='region' 
                                name='region' 
                                width='155px' 
                                height='40px'
                                options={regions[state]}
                                value={region}
                                onSelect={setRegion}
                            />
                            <TextInputField 
                                id='location' 
                                name='location' 
                                label='العنوان التفصيلي' 
                                type='text'
                                width='300px' 
                                height='40px' 
                                placeholder='العنوان التفصيلي'
                                icon={<LocationIcon />}
                                value={location}
                                onChange={setLocation}
                                Error={error.location}
                            />
                        </div>
                        <div className="section6">
                            <TextAreaInputField 
                                id='employeeDetails' 
                                name='employeeDetails' 
                                label='شرح عام عن خبرات الموظف' 
                                width='100%' 
                                height='150px' 
                                placeholder='شرح عام عن خبرات الموظف'
                                value={employeeDetails}
                                onChange={setEmployeeDetails}
                                Error={error.employeeDetails}
                            />
                        </div>
                        <div className="section9">
                            {submitLoading && <LoadingIcon />}
                            <SubmitButton
                                title="تعديل" 
                                color="var(--main-color)" 
                                width="140px" 
                                height="40px"
                                onClick={null}
                                disabled = {(isChange|submitLoading)}
                            />
                        </div>
                    </form>
                </> }
                {getError && <Error />}
            </div>
        </div>
    );
}

export default EditEmployee;