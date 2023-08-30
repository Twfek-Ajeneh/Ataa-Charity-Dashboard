// import react
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import PhoneIcon from '../../../Icons/Form/PhoneIcon';
import MoneyIcon from '../../../Icons/Form/MoneyIcon'
import LocationIcon from '../../../Icons/Form/LocationIcon'
import MedicalIcon from '../../../Icons/Form/medicalIcon';
import HomeIcon from '../../../Icons/Form/HomeIcon'
import EmailIcon from '../../../Icons/Form/EmailIcon'
import LoadingIcon from '../../../components/loading icon/loading';
import MultiSelectInput from '../../../components/MultiSelectInput/MultiSelectInput';

// import tools and static data
import { states , regions , genders , projectCategories , socialStatuses} from '../../../tools/static data/FormsData';
import { dateFormat } from '../../../tools/strings';
import { checkIdNumber, checkName , checkPhoneNumber, isEmpty , checkSalary} from '../../../tools/validation';

//import style sheet 
import './AddBeneficiaries.css';

// import add beneficiary
import { addBeneficiary } from './addBeneficiaries-request';

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
    currentJob: {
        is: false,
        text: ''
    },
    salary:{
        is: false,
        text: ''
    },
    location:{
        is: false,
        text: ''
    },
    healthStatus:{
        is: false,
        text: ''
    },
    residentialStatus:{
        is: false,
        text: ''
    },
    generalStatus:{
        is: false,
        text: ''
    },
    categories:{
        is: false,
        text: ''
    },
    server:{
        is : false,
        text: ''
    }
}

function AddBeneficiaries (props) {
    const nav = useNavigate();
    const [name , setName] = useState('');
    const [idNumber , setIdNumber] = useState('');
    const [birthdate , setBirthdate] = useState(dateFormat(new Date()));   
    const [phoneNumber , setPhoneNumber] = useState('');
    const [image , setImage] = useState(null);
    const [gender , setGender] = useState('ذكر');
    const [socialStatus , setSocialStatus] = useState('متزوج')
    const [numberOfChildren , setNumberOfChildren] = useState(0);
    const [currentJob , setCurrentJob] = useState('');
    const [salary , setSalary] = useState('0.000');
    const [state , setState] = useState('دمشق')
    const [region , setRegion] = useState('منطقة دمشق');
    const [location , setLocation] = useState('');
    const [categories , setCategories] = useState([]);
    const [email , setEmail] = useState('');
    const [healthStatus , setHealthStatus] = useState('');
    const [residentialStatus , setResidentialStatus] = useState('');
    const [generalStatus , setGeneralStatus] = useState('');
    const [error , setError] = useState(initError);
    const [loading , setLoading] = useState(false);

    const handleState = (value) => {
        setState(value);
        setRegion(regions[value][0]);
    }

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
        if(isEmpty(currentJob)){
            tempError = {...tempError , currentJob: {is: true, text : 'الرجاء إدخال العمل الحالي'}}
            ok = false;
        }
        if(checkSalary(salary)){
            tempError = {...tempError , salary: {is : true , text: 'القيمة المدخلة غير صالحة'}}
            ok = false;
        }
        if(isEmpty(location)){
            tempError = {...tempError , location : {is : true, text: 'الرجاء إدخال العنوان'}}
            ok = false;
        }
        if(isEmpty(healthStatus)){
            tempError = {...tempError , healthStatus: {is : true, text: 'الرجاء أدخال الحالة الصحية'}}
            ok = false;
        }
        if(isEmpty(residentialStatus)){
            tempError = {...tempError , residentialStatus: {is: true , text: 'الرجاء إدخال الحالة السكنية'}}
            ok = false;
        }
        if(isEmpty(generalStatus)){
            tempError = {...tempError , generalStatus: {is :true , text: 'الرجاء إدخال الحالة العامة'}}
            ok = false;
        }
        if(categories.length === 0){
            tempError = {...tempError , categories: {is: true , text: 'الرجاء إدخال فئات المستفيد'}}
            ok = false;
        }
        if(ok === false){
            setError(tempError);
            return;
        }

        //request
        setLoading(true);
        const res = await addBeneficiary(name , idNumber , birthdate , phoneNumber , image,
                                        gender , socialStatus , numberOfChildren , currentJob,
                                        salary , state , region , location , categories , email,
                                        healthStatus , residentialStatus , generalStatus);
        setLoading(false);
        if(res.ok === true){
            props.showMessage(true , 'success' , 'تم إضافة المستفيد');
            nav('/dashboard/beneficiaries/all');
        }
        else{
            setError(res.error);
            if(res.error.server.is) props.showMessage(true , 'error' , res.error.server.text);
        }
    }

    return (
        <div className='add-beneficiaries'>
            <DashboardPageHeader 
                mainTitle='إضافة مستفيد'
                subTitle='في هذا القسم يمكنك تقديم طلب إضافة مستفيد الى الجمعية'
                listItem={[
                    'إضافة مستفيد'
                ]}
            />
            <div className='add-beneficiaries-content'>
                <form dir='rtl' onSubmit={handleSubmit}>
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
                            <DateInputField 
                                label='تاريخ الميلاد' 
                                width='300px' 
                                height='40px'
                                max={dateFormat(new Date())}
                                value={birthdate}
                                onChange={setBirthdate}
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
                            label='الحالة الاجتماعية' 
                            id='socialStatus' 
                            name='socialStatus' 
                            width='100px' 
                            height='40px'
                            options={socialStatuses} 
                            value={socialStatus}
                            onSelect={setSocialStatus}
                        />
                        <TextInputField 
                            id='numberOfChildren' 
                            name='numberOfChildren' 
                            label='عدد الأولاد' 
                            type='number'
                            width='100px' 
                            height='40px'
                            min='0'
                            max='10'
                            step='1'
                            value={numberOfChildren}
                            onChange={setNumberOfChildren}
                        />
                        <TextInputField 
                            id='currentJob' 
                            name='currentJob' 
                            label='العمل الحالي' 
                            type='text'
                            width='120px' 
                            height='40px' 
                            placeholder='العمل الحالي'
                            value={currentJob}
                            onChange={setCurrentJob}
                            errorMargin='0px'
                            Error={error.currentJob}
                        />
                        <TextInputField 
                            id='salary' 
                            name='salary' 
                            label='الدخل الشهري الحالي' 
                            type='number'
                            min='0'
                            step='any'
                            numberArrow='none'
                            suffix='ل.س'
                            width='200px' 
                            height='40px' 
                            icon={<MoneyIcon />}
                            value={salary}
                            onChange={setSalary}
                            Error={error.salary}
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
                        <MultiSelectInput
                            label='الفئات'
                            placeholder='أدخل الفئة'
                            options={projectCategories}
                            list={categories}
                            onChange={setCategories}
                            Error={error.categories}
                        />
                    </div>
                    <div className="section6">
                        <TextInputField 
                            id='email' 
                            name='email' 
                            label='البريد الالكتروني' 
                            type='text'
                            width='300px' 
                            height='40px' 
                            placeholder='البريد الالكتروني'
                            icon={<EmailIcon />}
                            value={email}
                            onChange={setEmail}
                        />
                        <TextInputField 
                            id='healthStatus' 
                            name='healthStatus' 
                            label='الحالة لصحية' 
                            type='text'
                            width='300px' 
                            height='40px' 
                            placeholder='الحالة لصحية'
                            icon={<MedicalIcon />}
                            value={healthStatus}
                            onChange={setHealthStatus}
                            Error={error.healthStatus}
                        />
                        <TextInputField 
                            id='ResidentialStatus' 
                            name='ResidentialStatus' 
                            label='الحالة السكنية' 
                            type='text'
                            width='300px' 
                            height='40px' 
                            placeholder='الحالة السكنية'
                            icon={<HomeIcon />}
                            value={residentialStatus}
                            onChange={setResidentialStatus}
                            Error={error.residentialStatus}
                        />
                    </div>
                    <div className="section7">
                        <TextAreaInputField 
                            id='generalStatus' 
                            name='generalStatus' 
                            label='شرح عام عن حالة المستفيد' 
                            width='100%' 
                            height='165px' 
                            placeholder='شرح عام عن حالة المستفيد'
                            value={generalStatus}
                            onChange={setGeneralStatus}
                            Error={error.generalStatus}
                        />
                    </div>
                    <div className="section9">
                        {loading && <LoadingIcon />}
                        <SubmitButton
                            title="إضافة" 
                            color="var(--main-color)" 
                            width="140px" 
                            height="40px"
                            onClick={null}
                            disabled = {loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddBeneficiaries;