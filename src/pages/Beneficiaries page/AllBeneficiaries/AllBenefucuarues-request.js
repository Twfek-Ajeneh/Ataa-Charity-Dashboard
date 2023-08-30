import { axios2 , axios1 , Switch} from "../../../tools/request";
import Beneficiary from "../../../modules/beneficiary";

export async function getAllBeneficiaris(){
    const res = {
        ok : true,
        data: [],
    }

    if(Switch){
        await axios1.get(
            '/beneficiaries',
        )
        .then(response => {
            res.ok = true;
            response.data.forEach((item) => {
                res.data.push(
                    new Beneficiary(
                        item.id , item.name , item.idNumber
                        , item.birthdate , item.phoneNumber , item.image , item.gender
                        , item.socialStatus , item.numberOfChildren , item.currentJob
                        , item.salary , item.state , item.region , item.location
                        , item.categories , item.email , item.healthStatus , item.residentialStatus
                        , item.generalStatus , item.status , item.projects
                    )
                );
            });
        })
        .catch(error => {
            res.ok = false;
        });
    }

    else{
        await axios2.get(
            '/beneficiaries/all',
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
            response.data.forEach((item) => {
                res.data.push(
                    new Beneficiary(
                        item.id , item.full_name , null
                        , item.birth_date , null , null , item.gender
                        , null , null , null
                        , null , item.province , null , null
                        , null, null , null , null
                        , null , item.application_status , null
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