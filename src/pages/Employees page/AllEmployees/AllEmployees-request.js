import { axios2 , axios1 , Switch} from "../../../tools/request";
import Employee from "../../../modules/employee";

export async function getAllEmployees(){
    const res = {
        ok: true, 
        data: [],
    }

    if(Switch){
        await axios1.get(
            '/employees',
        )
        .then(response => {
            res.ok = true;
            response.data.forEach((item) => {
                res.data.push(
                    new Employee(
                        item.id , item.name , item.idNumber , item.email,
                        item.phoneNumber, item.image , item.birthdate , item.gender
                        ,item.category , item.jobState , item.state , item.region
                        ,item.location , item.status , item.employeeDetails
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
            '/employee',
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
                    new Employee(
                        item.id , item.full_name , null , null,
                        null , null , item.birth_date , item.gender
                        ,null , item.username, null , null
                        ,null , item.status , null
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