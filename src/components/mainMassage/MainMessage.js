// import react
import React from 'react';
import { useState , useEffect} from 'react';

// component
import Snackbar from '@mui/material/Snackbar';
import InfoIcon from '../../Icons/Main-Message/InfoIcon';
import ErrorIcon from '../../Icons/Main-Message/ErrorIcon';
import SuccessIcon from '../../Icons/Main-Message/SuccessIcon';
import MuiAlert from '@mui/material/Alert';


function MainMessage (props) {
    const [info , setInfo] = useState({
        open : true,
        type : 'success',
        logo : <SuccessIcon />,
        color : '#3EB489',
        content : "تمت العملية بنجاح"
    });    

    useEffect(() => {
        if(props.type === 'error'){
            setInfo({
                ...info, 
                type: 'error',
                open : true, 
                logo : <ErrorIcon />, 
                content : props.content, 
                color : '#F32424'
            });
        }
        else if(props.type === 'success'){
            setInfo({
                ...info, 
                type: 'success', 
                open : true, 
                logo : <SuccessIcon />, 
                content : props.content, 
                color : '#3EB489'
            });
        }
        else{
            setInfo({
                ...info, 
                type: 'info', 
                open : true, 
                logo : <InfoIcon />, 
                content : props.content, 
                color : '#B3B3B3'
            });
        }
    }, [props]);

    const handleClose = (event , reason) => {
        if(reason === 'clickaway') return;
        setInfo({...info , open : false});
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} dir="rtl" ref={ref} variant="filled" {...props}  />;
    });

    return (
        <div>
            <Snackbar 
                open={info.open} 
                autoHideDuration={5000} 
                onClose={handleClose}
            >
                <Alert dir="rtl" onClose={handleClose} icon={info.logo} severity={info.type} sx={{backgroundColor: info.color , display: 'flex' , alignItems: 'center' , minWidth: '300px' , width: '100%' , "& .MuiAlert-icon": {padding: '0' , margin: '0' , height: '40px' , width: '30px' , display: 'flex' , alignItems: 'center' , marginLeft: '12px'} , '& .MuiAlert-action' : {marginLeft: '0px' , padding: '0' , marginRight: '5px'} , '& .MuiAlert-message' : {flexGrow: '1'}}}>
                    <div style={{fontSize: '14px' , fontFamily: 'Noto Sans Arabic'}}>{info.content}</div>
                </Alert>
            </Snackbar>
        </div>
    );
}

export default MainMessage;