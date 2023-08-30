import { axios2 , axios1 , Switch} from "../../../tools/request";
import Project from "../../../modules/project";

export async function getAllProjects(){
    const res = {
        ok: true,
        data : [],
    }

    if(Switch){
        await axios1.get(
            '/projects',
        )
        .then(response => {
            res.ok = true;
            response.data.forEach((item) => {
                res.data.push(
                    new Project(
                        item.id , item.name , item.image 
                        , item.startDate , item.endDate , item.location 
                        , item.type , item.catetories , item.projectGoals , item.projectDescription 
                        , item.status , item.target , item.currentBalance 
                        , item.projectEmployees , item.projectBeneficiaries
                    ));
            });
        })
        .catch(error => {
            res.ok = false;
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
            response.data.project.forEach((item) => {
                res.data.push(
                    new Project(
                        item.id , item.name , null , item.start_date ,
                        null , item.province , item.project_type , null 
                        , null , null , item.project_status , null, null
                        , null , null 
                    )
                )
            });
            res.data = res.data.slice(4);
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