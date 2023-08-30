import { axios2 , axios1 , Switch} from  '../../../tools/request';
import Employee from '../../../modules/employee';

export async function getEmployee(id){
    const res = {
        ok: true,
        data : null,
    }

    if(Switch){
        await axios1.get(
            `/employees/${id}`,
        ).then(response => {
            res.ok = true;
            res.data = new Employee (
                response.data.id , response.data.name , response.data.idNumber , response.data.email,
                response.data.phoneNumber , response.data.image , response.data.birthdate ,
                response.data.gender , response.data.category , response.data.jobState ,
                response.data.state , response.data.region , response.data.location ,
                response.data.status , response.data.employeeDetails
            );
        }).catch(error => {
            res.ok = false;
        });
    }

    else{
        await axios2.get(
            `/employee/${id}`,
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
            res.data = new Employee (
                response.data.id , response.data.full_name , response.data.ID_number , response.data.email,
                response.data.phone_number , `${axios2.defaults.baseURL.toString().slice(0 , -5)}${response.data.image}` , response.data.birth_date ,
                response.data.gender , response.data.type , response.data.Role.username ,
                response.data.province , response.data.area , response.data.address ,
                response.data.status , response.data.description
            );
        }).catch(error => {
            console.log(error);
            res.ok = false;
        });
    }

    return res;
}

export async function deleteEmployee(id){
    const res = {
        ok: true,
        text: '',
    }

    if(Switch){
        await axios1.delete(
            `/employees/${id}`,
        )
        .then(response => {
            res.ok = true;
            res.text = 'تم حذف الموظف';
        })
        .catch(error => {
            res.ok = false;
            res.text = 'حدث خطأ ما';
        });
    }

    else{
        await axios2.delete(
            `/employee/${id}`,
            {
                headers: {
                    headers: {"Content-type": "application/json"} ,
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response => {
            console.log(response);
            res.ok = true;
            res.text = 'تم حذف الموظف';
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

export async function acceptEmployee(id , value){
    const res = {
        ok: true,
        text: '',
    }

    if(Switch){
        res.ok = true;
        res.text = (value === 'مقبول' ? 'تم قبول الموظف' : 'تم رفض الموظف');
    }

    else{
        await axios2.post(
            `/employee/${id}`,
            {'status' : value},
            {
                headers: {
                    headers: {"Content-type": "application/json"} ,
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response => {
            res.ok = true;
            res.text = (value === 'مقبول' ? 'تم قبول الموظف' : 'تم رفض الموظف');
        })
        .catch(error => {
            res.ok = false;
            res.text = 'حدث خطأ ما';
        });
    }

    return res;
}