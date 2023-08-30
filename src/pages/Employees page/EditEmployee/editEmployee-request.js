import { axios2 , axios1 , Switch} from  '../../../tools/request';
import Employee from '../../../modules/employee';
import { dataURLtoFile , isDataURL} from '../../../tools/strings';

export async function getEmployee(id){
    const res = {
        ok: true,
        data : null,
    }

    if(Switch){
        await axios1.get(
            `/employees/${id}`,
        )
        .then(response => {
            res.ok = true;
            res.data = new Employee (
                response.data.id , response.data.name , response.data.idNumber , response.data.email,
                response.data.phoneNumber , response.data.image , response.data.birthdate ,
                response.data.gender , response.data.category , response.data.jobState ,
                response.data.state , response.data.region , response.data.location ,
                response.data.status , response.data.employeeDetails
            );
        })
        .catch(error => {
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
        })
        .catch(error => {
            console.log(error);
            res.ok = false;
        });
    }

    return res;
}

export async function editEmployee (id , name , idNumber , email , birthdate 
                        , phoneNumber , image , gender , category 
                        , jobState , state , region , location , employeeDetails)
    {
    const res = {
        ok: false,
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
            location:{
                is: false,
                text: ''
            },
            employeeDetails:{
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
            `/employees/${id}`,
            {
                name,
                idNumber,
                email,
                birthdate,
                phoneNumber,
                image, 
                gender,
                category,
                jobState,
                state, 
                region,
                location,
                employeeDetails
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
                location:{
                    is: false,
                    text: ''
                },
                employeeDetails:{
                    is: false,
                    text: ''
                },
                server: {
                    is: true,
                    text: 'حدث خطأ ما',
                }
            }
        });
    }

    else{
        const fileImage = (isDataURL(image) ? dataURLtoFile(image , 'employeeImage') : null);
        const formData = new FormData();
        formData.append('full_name' , name);
        formData.append('image', fileImage);
        formData.append('ID_number' , idNumber);
        formData.append('email' , email);
        formData.append('phone_number' , phoneNumber);
        formData.append('birth_date' , birthdate);
        formData.append('gender' , gender);
        formData.append('province' , state);
        formData.append('area' , region);
        formData.append('address' , location);
        formData.append('description' , employeeDetails);
        formData.append('type' , category);
        formData.append('jobState' , jobState);
    
        await axios2.post(
            `/employee/${id}`,
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
                idNumber : {
                    is: (error.response.data.msg && error.response.data.msg[0].path === 'ID_number' ? true : false),
                    text: 'رقم البطاقة الشخصية موجود مسبقاٌ'
                },
                phoneNumber: {
                    is: false,
                    text: ''
                },
                image: {
                    is: false,
                    text: ''
                },
                location:{
                    is: false,
                    text: ''
                },
                employeeDetails:{
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
                location:{
                    is: false,
                    text: ''
                },
                employeeDetails:{
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