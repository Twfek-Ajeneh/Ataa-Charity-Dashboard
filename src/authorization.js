import {axios2 , Switch} from './tools/request';

export async function checkToken(){
    await new Promise(res => setTimeout(res, 3000))
    
    if(localStorage.length === 0){
        localStorage.clear();
        return {};
    }

    if(Switch){
        //Nothing
    }

    else{
        await axios2.get(
            '/tokencheck',
            {
                headers: {
                    "Content-type": "application/json" ,
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
            localStorage.clear();
        });
    }

    return {};
}