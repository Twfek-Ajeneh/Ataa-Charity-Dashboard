import { axios2 , axios1 , Switch} from  '../../../tools/request';
import Beneficiary from "../../../modules/beneficiary";
import Project from "../../../modules/project";

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

export async function deleteBeneficiaris(id){
    const res = {
        ok: true,
        text: '',
    }

    if(Switch){
        await axios1.delete(
            `/beneficiaries/${id}`,
        )
        .then(response => {
            res.ok = true;
            res.text = 'تم حذف المستفيد';
        })
        .catch(error => {
            res.ok = false;
            res.text = 'حدث خطأ ما';
        });
    }

    else{
        await axios2.delete(
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
            res.text = 'تم حذف المستفيد';
        })
        .catch(error => {
            console.log(error);
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

export async function acceptBeneficiary(id , value){
    const res = {
        ok: true,
        text: '',
    }

    if(Switch){
        res.ok = true;
        res.text = (value === 'مقبول' ? 'تم مقبول المستفيد' : 'تم رفض المستفيد');
    }

    else{
        await axios2.post(
            `/beneficiary/${id}`,
            {'application_status' : value},
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
            res.text = (value === 'مقبول' ? 'تم مقبول المستفيد' : 'تم رفض المستفيد');
        })
        .catch(error => {
            console.log(error);
            res.ok = false;
            res.text = 'حدث خطأ ما';
        });
    }

    return res;
}