import { axios1 , axios2 , Switch} from '../../tools/request';

async function loginRequest (username , password){
    const res = {   
        ok: false,
        data : {},
        error: {
            username: {
                is: false,
            },
            password: {
                is: false,
                text: ""
            },
            server: {
                is: false,
                text: ""
            }
        }
    };


    if(Switch){
        await axios1.post(
            '/login', 
            {username , password},
            {headers: {"Content-type": "application/json"}}
        )
        .then(response => {
            res.ok = true;
            res.data = {
                token: 'gasdgsg',
                username: 'مدير'
            };
            res.error = {};
        })
        .catch(error => {
            res.ok = false;
            res.data = {};
            res.error = {
                ...res.error ,
                username: {
                    is : (error.response.status === 401 && error.response.data.username ? true : false),
                    text: 'اسم المستخدم المدخل غير صالح'
                },
                password: {
                    is : (error.response.status === 401 && error.response.data.password ? true : false),
                    text: 'كلمة المرور المدخلة غير صالحة'
                },
                server: {
                    is: (error.response.status !== 401 ? true : false),
                    text: 'حدث خطأ ما',
                }
            }
        });
    }

    else{
        await axios2.post(
            '/login', 
            {username , password},
            {headers: {"Content-type": "application/json"}}
        )
        .then(response => {
            console.log(response.data);
            res.ok = true;
            res.data = response.data;
            res.error = {};
        })
        .catch(error => {
            console.log(error);
            res.ok = false;
            res.data = {};
            res.error = {
                ...res.error ,
                username: {
                    is : (error.response.status === 401 && error.response.data.username ? true : false),
                    text: 'اسم المستخدم المدخل غير صالح'
                },
                password: {
                    is : (error.response.status === 401 && error.response.data.password ? true : false),
                    text: 'كلمة المرور المدخلة غير صالحة'
                },
                server: {
                    is: (error.response.status !== 401 ? true : false),
                    text: 'حدث خطأ ما',
                }
            }
        })
        .catch(error => {
            res.ok = false;
            res.data = {};
            res.error = {
                ...res.error ,
                username: {
                    is : false,
                    text: '',
                },
                password: {
                    is : false,
                    text: ''
                },
                server: {
                    is: true,
                    text: 'حدث خطأ ما',
                }
            }
        });
    }
    return res;
}

export default loginRequest;

