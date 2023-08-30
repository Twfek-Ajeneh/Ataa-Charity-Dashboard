import { axios2 , axios1 , Switch} from  '../../../tools/request';
import Employee from '../../../modules/employee';
import Beneficiary from '../../../modules/beneficiary';
import { dataURLtoFile } from '../../../tools/strings';

export async function addProject(
            name , startDate , endDate , image , target , location
            , type , categories , projectGoals , projectDescription , projectEmployees , projectBeneficiaries)
    {
    const res = {
        ok : true,
        error: {
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
                is: true,
                text: 'حدث خطأ ما'
            }
        }
    }

    const employees = [];
    projectEmployees.forEach(item => employees.push(item.id));
    const beneficiaries = [];
    projectBeneficiaries.forEach(item => beneficiaries.push(item.id));

    if(Switch){
        await axios1.post(
            '/projects',
            {
                name,
                startDate,
                endDate,
                image,
                target,
                location,
                type,
                categories,
                projectGoals,
                projectDescription,
                employees,
                beneficiaries
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
                    is: true,
                    text: 'حدث خطأ ما'
                }
            }
        });
    }

    else{
        const fileImage = dataURLtoFile(image , 'projectImage');
        const formData = new FormData();
        formData.append('name' , name);
        formData.append('start_date' , startDate);
        formData.append('end_date' , endDate);
        formData.append('province' , location);
        formData.append('project_type' , type);
        formData.append('target_money' , target);
        formData.append('projectEmployees' , JSON.stringify(employees));
        formData.append('projectBeneficiaries' , JSON.stringify(beneficiaries));
        formData.append('projectCategories' , JSON.stringify(categories));
        formData.append('image' , fileImage);
        formData.append('project_goal' , projectGoals);
        formData.append('description' , projectDescription);

        await axios2.post(
            '/project/create',
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
                    is: true,
                    text: 'حدث خطأ ما'
                }
            }
        });
    }

    return res;
}


export async function getAllEmployeeBeneficiaries(){
    const res ={
        ok : true,
        data : {
            employees : [],
            beneficiaries : [],
        }
    }

    if(Switch){
        res.ok = true;
    }

    else{
        await axios2.get(
            '/project/add',
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
            response.data.emp.forEach((item) => {
                res.data.employees.push(
                    new Employee(
                        item.id , item.full_name , null , null,
                        null, `${axios2.defaults.baseURL.toString().slice(0 , -5)}${item.image}` , null , null
                        , item.type , item.Role.username , null , null
                        , null , item.status , null
                    )
                );
            });
            response.data.bene.forEach((item) => {
                res.data.beneficiaries.push(
                    new Beneficiary(
                        item.id , item.full_name , null
                        , null , null , `${axios2.defaults.baseURL.toString().slice(0 , -5)}${item.image}`, null
                        , null , null , null , null , item.province ,
                        null , null , null, null , null , null , null ,
                        item.application_status , null
                    )
                );
            });
        })
        .catch(error => {
            console.log(error);
            res.ok = false;
        });
    }

    return res;
}