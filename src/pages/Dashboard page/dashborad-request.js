import { axios2 } from '../../tools/request';


export async function logout(){
    const res = {
        ok : true,
        text: ''
    }

    await axios2.get(
        '/logout',
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
        res.text = 'تم تسجيل الخروج'
    })
    .catch(error => {
        console.log(error);
        res.ok = false;
        res.text = 'حدث خطأ ما, الرجاء إعادة المحاولة'
    });

    return res;
}