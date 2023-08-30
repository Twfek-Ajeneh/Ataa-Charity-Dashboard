import { axios2 , axios1 , Switch} from  '../../../tools/request';
import Project from '../../../modules/project';
import Employee from '../../../modules/employee';
import Beneficiary from '../../../modules/beneficiary';

export async function getProject(id){
    const res = {
        ok: true,
        data: null
    }

    if(Switch){
        await axios1.get(
            `/projects/${id}`,
        )
        .then(response => {
            res.ok = true;
            res.data = new Project(
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
            res.data = new Project(
                response.data.project.id , response.data.project.name , `${axios2.defaults.baseURL.toString().slice(0 , -5)}${response.data.project.image}` , response.data.project.start_date ,
                response.data.project.end_date , response.data.project.province , response.data.project.project_type , categories
                , response.data.project.project_goal , response.data.project.description , response.data.project.project_status , response.data.project.target_money , response.data.money
                , employees , beneficiaries 
            );
        })
        .catch(error => {
            console.log(error);
            res.ok = false;
        });
    }

    return res;
}

export async function deleteProject(id){
    const res = {
        ok: true,
        text: ''
    }

    if(Switch){
        await axios1.delete(
            `projects/${id}`,
        )
        .then((response) => {
            res.ok = true;
            res.text = 'تم حذف المشروع';
        })
        .catch((error) => {
            res.ok = false;
            res.text = 'حدث خطأ ما';
        });
    }

    else{
        await axios2.delete(
            `/project/${id}` ,
            {    
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
        )
        .then((response) => {
            console.log(response);
            res.ok = true;
            res.text = 'تم حذف المشروع';
        })
        .catch(error => {
            console.log(error.response);
            res.ok = false;
            res.text = (error.response.status === 403 ? 'لا يمكنك القيام يهذه العملية' : 'حدث خطأ ما');
        })
        .catch(error => {
            res.ok = false;
            res.text = 'حدث خطـأ ما'
        });
    }

    return res;
}

export async function cancelProject(id){
    const res = {
        ok: true,
        text: '',
    }

    if(Switch){
        res.ok = true;
        res.text = 'تم إلغاء المشروع'
    }

    else{
        await axios2.post(
            `/project/${id}`,
            {'project_status' : 'ملغى'},
            {
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response => {
            console.log(response);
            res.ok = true;
            res.text = 'تم إلغاء المشروع';
        })
        .catch(error => {
            console.log(error);
            res.ok = false;
            res.text = 'حدث خطأ ما';
        });
    }

    return res;
}