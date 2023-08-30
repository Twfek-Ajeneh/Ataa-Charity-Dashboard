import { axios2 , axios1 , Switch} from  '../../../tools/request';
import Beneficiary from "../../../modules/beneficiary";
import Project from "../../../modules/project";
import { dataURLtoFile , isDataURL} from '../../../tools/strings';

export async function editBeneficiary(
        id , name , idNumber , birthdate , phoneNumber , image,
        gender , socialStatus , numberOfChildren , currentJob,
        salary , state , region , location , categories , email,
        healthStatus , residentialStatus , generalStatus
    ){
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
        await axios1.put(
            `/beneficiaries/${id}`,
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
        const fileImage = (isDataURL(image) ? dataURLtoFile(image , 'beneficiaryImage') : null);
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
            `/beneficiary/${id}`,
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

export async function getBeneficiary(id){
    const res = {
        ok: true,
        data : null,
    }

    if(Switch){
        await axios1.get(
            `/beneficiaries/${id}`,
        )
        .then(response => {
            res.ok = true;
            res.data = new Beneficiary(
                response.data.id , response.data.name , response.data.idNumber
                , response.data.birthdate , response.data.phoneNumber , response.data.image , response.data.gender
                , response.data.socialStatus , response.data.numberOfChildren , response.data.currentJob
                , response.data.salary , response.data.state , response.data.region , response.data.location
                , response.data.categories , response.data.email , response.data.healthStatus , response.data.residentialStatus
                , response.data.generalStatus , response.data.status , response.data.projects
            );
        })
        .catch(error => {
            res.ok = false;
        });
    }

    else{
        await axios2.get(
            `/beneficiary/${id}`,
            {
                headers: {
                    "Content-type": "application/json" ,
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response => {
            console.log(response);
            res.ok = true;
            const categories = [];
            const projects = [];
            response.data.categories.forEach(element => {
                categories.push(element.CategoryId);
            });
            response.data.projects.forEach(element => {
                projects.push(
                    new Project(
                        element.ProjectId , element.name , null 
                        , null , null , null , element.type,
                        null , null , null , null , null , null , null , null
                    )
                );
            });
            res.data = new Beneficiary(
                response.data.id , response.data.full_name , response.data.ID_number
                , response.data.birth_date , response.data.phone_number , `${axios2.defaults.baseURL.toString().slice(0 , -5)}${response.data.image}` , response.data.gender
                , response.data.marital_status , response.data.children_number , response.data.job
                , response.data.salary , response.data.province , response.data.area , response.data.address
                , categories , response.data.email , response.data.health_status , response.data.residential_status
                , response.data.description , response.data.application_status , projects
            );
        })
        .catch(error => {
            console.log(error);
            res.ok = false;
        });
    }

    return res;
}