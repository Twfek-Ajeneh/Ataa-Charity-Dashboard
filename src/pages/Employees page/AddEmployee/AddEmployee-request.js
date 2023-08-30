import { axios2 , axios1 , Switch} from  '../../../tools/request';
import { dataURLtoFile } from '../../../tools/strings';

export async function addEmployee(name , idNumber , email , birthdate 
                                , phoneNumber , image , gender , category 
                                , jobState , state , region , location , employeeDetails)
    {
    const res = {
        ok: false,
        error: {
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
                is : true,
                text: 'حدث خطأ ما'
            }
        }
    }

    if(Switch){
        await axios1.post(
            '/employees', 
            {
                name , idNumber , email , birthdate , phoneNumber , image , gender , category ,
                jobState , state , region , location , employeeDetails
            },
        )
        .then(response => {
            res.ok = true;
            res.error = {};
        })
        .catch(error => {
            res.ok = false;
            res.error = {
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
                server: {
                    is: true,
                    text: 'حدث خطأ ما',
                }
            }
        });
    }

    else{
        const fileImage = dataURLtoFile(image , 'employeeImage');
        const formData = new FormData();
        formData.append('full_name' , name);
        formData.append('image', fileImage);
        formData.append('ID_number' , idNumber);
        formData.append('email' , email);
        formData.append('phone_number' , phoneNumber);
        formData.append('birth_date' , birthdate);
        formData.append('gender' , gender);
        formData.append('province' , state);
        formData.append('area' , region);
        formData.append('address' , location);
        formData.append('description' , employeeDetails);
        formData.append('type' , category);
        formData.append('jobState' , jobState);

        await axios2.post(
            '/employee/create',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data" ,
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response => {
            console.log(response.data);
            res.ok = true;
            res.error = {};
        })
        .catch(error => {
            console.log(error);
            res.ok = false;
            res.error = {
                name : {
                    is: false,
                    text : ''
                },
                idNumber : {
                    is: (error.response.data.msg && error.response.data.msg[0].path === 'ID_number' ? true : false),
                    text: 'رقم البطاقة الشخصية موجود مسبقاٌ'
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
                    is: true,
                    text: (error.response.status === 403 ? 
                        'لا يمكنك القيام يهذه العملية'
                        : error.response.status === 400 ? 'يوجد خطأ في المعلومات المدخلة' : 'حدث خطأ ما'
                        )
                }
            }
        })
        .catch(error => {
            res.ok = false;
            res.error = {
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
                    is : true,
                    text: 'حدث خطأ ما'
                }
            }
        });
    }

    return res;
}