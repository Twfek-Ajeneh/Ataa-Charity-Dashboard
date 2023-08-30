import { axios2 , axios1 , Switch} from  '../../../tools/request';
import { dataURLtoFile } from '../../../tools/strings';

export async function addBeneficiary(name , idNumber , birthdate , phoneNumber , image,
                                gender , socialStatus , numberOfChildren , currentJob,
                                salary , state , region , location , categories , email,
                                healthStatus , residentialStatus , generalStatus)
    {
    const res = {
        ok: true,
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
                is : true,
                text: 'حدث خطأ ما'
            }
        }
    }

    if(Switch){
        await axios1.post(
            '/beneficiaries',
            {
                name,
                idNumber,
                birthdate,
                phoneNumber,
                image,
                gender,
                socialStatus,
                numberOfChildren,
                currentJob,
                salary,
                state,
                region,
                location,
                categories,
                email,
                healthStatus,
                residentialStatus,
                generalStatus
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
                    is : true,
                    text: 'حدث خطأ ما'
                }
            }
        });
    }


    else{
        const fileImage = dataURLtoFile(image , 'beneficiaryImage');
        const formData = new FormData();
        formData.append('full_name' , name);
        formData.append('ID_number' , idNumber);
        formData.append('phone_number' , phoneNumber);
        formData.append('image' , fileImage);
        formData.append('email' , email);
        formData.append('birth_date' , birthdate);
        formData.append('gender' , gender);
        formData.append('marital_status' , socialStatus);
        formData.append('job' , currentJob);
        formData.append('province' , state);
        formData.append('area' , region);
        formData.append('address' , location);
        formData.append('residential_status' , residentialStatus);
        formData.append('benCategories' , JSON.stringify(categories));
        formData.append('children_number' , numberOfChildren);
        formData.append('salary' , salary);
        formData.append('health_status' , healthStatus);
        formData.append('description' , generalStatus);

        await axios2.post(
            '/beneficiary/create',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data" ,
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response => {
            console.log(response);
            res.ok = true;
            res.error = {}
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
                    is : true,
                    text: 'حدث خطأ ما'
                }
            }
        });
    }
    
    return res;
}