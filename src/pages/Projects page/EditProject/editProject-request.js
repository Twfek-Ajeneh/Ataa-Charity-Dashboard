import { axios2 , axios1 , Switch} from  '../../../tools/request';
import Employee from '../../../modules/employee';
import Beneficiary from '../../../modules/beneficiary';
import Project from '../../../modules/project';
import { dataURLtoFile , isDataURL} from '../../../tools/strings';

export async function editProject(
            id , name , startDate , endDate , image , target , location
            , type , categories , projectGoals , projectDescription , projectEmployees , projectBeneficiaries
    ){
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
                is: false,
                text: ''
            }
        }
    }

    const employees = [];
    projectEmployees.forEach(item => employees.push(item.id));
    const beneficiaries = [];
    projectBeneficiaries.forEach(item => beneficiaries.push(item.id));

    if(Switch){
        await axios1.put(
            `/project/${id}`,
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
            console.log(res);
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
        const fileImage = (isDataURL(image) ? dataURLtoFile(image , 'projectImage') : null);
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
            `/project/${id}`,
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

export async function getAllEmployeeBeneficiaries(id){
    const res ={
        ok : true,
        data : {
            project: null,
            employees : [],
            beneficiaries : [],
        }
    }

    if(Switch){
        await axios1.get(
        `/projects/${id}`,        
        )
        .then(response => {
            res.ok = true;
            res.data.project = new Project(
                response.data.id , response.data.name , response.data.image , response.data.startDate ,
                response.data.endDate , response.data.location , response.data.type , response.data.categories
                , response.data.projectGoals , response.data.projectDescription , response.data.status , response.data.target , response.data.currentBalance
                , response.data.projectEmployees , response.data.projectBeneficiaries
            );
        })
        .catch(error => {
            res.ok = false;
        });
    }

    else{
        await axios2.get(
            `/project/${id}`,
            {    
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
        )
        .then(response => {
            console.log(response);
            res.ok = true;
            const categories  = [];
            response.data.categories.forEach(element => categories.push(element.id));
            const employees = [];
            const beneficiaries = [];
            response.data.emp.forEach((item) => {
                employees.push(
                    new Employee(
                        item.id , item.full_name , null , null,
                        null, `${axios2.defaults.baseURL.toString().slice(0 , -5)}${item.image}` , null , null
                        , item.type , item.Role.username , null , null
                        , null , item.status , null
                    )
                );
            });
            response.data.ben.forEach((item) => {
                beneficiaries.push(
                    new Beneficiary(
                        item.id , item.full_name , null
                        , null , null , `${axios2.defaults.baseURL.toString().slice(0 , -5)}${item.image}`, null
                        , null , null , null , null , item.province ,
                        null , null , null, null , null , null , null ,
                        item.application_status , null
                    )
                );
            });
            res.data.project = new Project(
                response.data.project.id , response.data.project.name , `${axios2.defaults.baseURL.toString().slice(0 , -5)}${response.data.project.image}` , response.data.project.start_date ,
                response.data.project.end_date , response.data.project.province , response.data.project.project_type , categories
                ,response.data.project.project_goal , response.data.project.description , response.data.project.project_status , response.data.project.target_money , response.data.money
                , employees , beneficiaries 
            );
        })
        .catch(error => {
            console.log(error);
            res.ok = false;
        });

        if(res.ok === true){       
            await axios2.get(
                `/project/edit/${id}`,
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
                response.data.ben.forEach((item) => {
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
    }

    return res;
}