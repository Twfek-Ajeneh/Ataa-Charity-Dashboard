//import react
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import components
import UserIcon from '../../Icons/Login-page/UserIcon';
import PasswordIcon from '../../Icons/Login-page/PasswordIcon';
import InputField from '../../components/inputField/InputField';
import LoadingIcon from '../../components/loading icon/loading';
import EyeShowIcon from "../../Icons/Login-page/EyeShowIcon";
import EyeHideIcon from "../../Icons/Login-page/EyeHideIcon";

// import style sheet
import './Login.css';

// import tools and static data
import { isEmpty } from '../../tools/validation';

// login request
import loginRequest from "./Login-requests";

const initError = {
    username : {
        is : false,
        text : ""
    },
    password : {
        is : false,
        text : ""
    },
    server :{
        is : false,
        text : ""
    }
}

const Login = (props) => {
    const nav = useNavigate();
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [showPassword , setShowPassword] = useState(false);
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(initError);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError(initError); 

        //Validation   
        let tempError = initError;
        let ok = true;
        if(isEmpty(username)){
            tempError = {...tempError  , username : {is : true , text : "اسم المستخدم المدخل غير صالح"}};
            ok = false;
        }
        if(isEmpty(password)){
            tempError = {...tempError , password : {is : true , text: "كلمة المرور المدخلة غير صالحة"}};
            ok = false;
        }
        if(ok === false){
            setError(tempError);
            return;
        }

        // request
        setLoading(true);
        const res = await loginRequest(username , password);
        setLoading(false);
        if(res.ok === true){
            localStorage.setItem('token' , res.data.token);
            localStorage.setItem('role' , res.data.username);
            props.showMessage(true , 'success' , 'تم تسجيل الدخول بنجاح');
            nav('/dashboard');
        }
        else if(res.ok === false){
            setError({...initError , ...res.error});
            if(res.error.server.is) props.showMessage(true , 'error' , res.error.server.text);
        }
    }

    return (
        <div className="login-content">
            <div className="login">
                <h1>تسجيل الدخول</h1>
                <p>مرحباً بك معنا مجدداً, قم بتسجيل <br/> الدخول إلى حسابك</p>
                <form onSubmit = {handleSubmit} dir="rtl">
                    <InputField 
                        logo={<UserIcon />} 
                        type="text" 
                        placeholder="اسم المستخدم" 
                        autoFocus={true} 
                        value={username} 
                        onChange={setUsername}
                        Error={error.username}
                    />
                    <InputField 
                        logo={<PasswordIcon />}
                        type={showPassword === false ? 'password' : 'text'}
                        placeholder="كلمة المرور"
                        autoFocus={false}
                        value={password}
                        onChange={setPassword}
                        Error={error.password}
                        icon={showPassword === false  ? <EyeHideIcon /> : <EyeShowIcon />}
                        onClickIcon={() => {setShowPassword(!showPassword)}}
                    />
                    <input className="submit" type="submit" value="تسجيل الدخول" disabled={loading} />
                </form>
                {loading && <LoadingIcon />}
            </div>
        </div>
    );
}

export default Login;