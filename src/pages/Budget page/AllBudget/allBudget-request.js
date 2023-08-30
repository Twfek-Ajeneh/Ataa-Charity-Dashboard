import { axios2 , axios1 , Switch} from "../../../tools/request";
import Project from '../../../modules/project';

export async function getBudget(){
    const res = {
        ok : true,
        data: {
            'charityBudget': 0,
            'projectsBudget': 0,
            'programsBudget': 0,
            projects: [],
            programs: []
        },
    }

    if(Switch){
        await axios1.get(
            '/budget',
        )
        .then(response => {
            res.ok = true;
            res.data = response.data;
            // res.data.projects = [];
        })
        .catch(error => {            
            res.ok = false
        });
    }

    else{
        await axios2.get(
            '/project/all',
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
            res.data.programsBudget = response.data.programsBudget;
            res.data.projectsBudget = response.data.projectsBudget;
            res.data.charityBudget = response.data.charityBudget;
            const projects = [];
            response.data.project.forEach((item) => {
                projects.push(
                    new Project(
                        item.id , item.name , `${axios2.defaults.baseURL.toString().slice(0 , -5)}${item.image}` , null ,
                        null , null , null , null
                        , null , null , null , item.target_money , item.money
                        , null , null
                    )
                )
            });
            res.data.projects = projects.slice(4);
            res.data.programs = projects.slice(0 , 4);
        })
        .catch(error => {
            console.log(error);
            res.ok = false;
        });
    }

    return res;
}

export async function editProgram(id , newValue){
    const res = {
        ok : true,
        error: {
            newValue: {
                is : false,
                text: ''
            },
            server: {
                is: true,
                text: 'حدث خطأ ما'
            }
        }
    }

    if(Switch){
        res.ok = true;
    }

    else{
        await axios2.post(
            `/project/${id}`,
            {'target_money' : newValue},
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
            res.error = {}
        })
        .catch(error => {
            console.log(error);
            res.ok = false;
            res.error={
                newValue: {
                    is : false,
                    text: ''
                },
                server: {
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
            res.error={
                newValue: {
                    is : false,
                    text: ''
                },
                server: {
                    is: true,
                    text: 'حدث خطأ ما'
                }
            }
        });
    }

    return res;
}