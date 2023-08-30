// import react
import React from 'react';

// import components
import AccessDeniedIcon from '../../Icons/Access Denied Icon/AccessDeniedIcon'

// import style sheet
import './AccessDenied.css';

function AccessDenied (props){
    return (
        <div className="access-denied">
            <AccessDeniedIcon />
            <div className="title">غير مسموح بالدخول الى هذه الصفحة لأنك حريمة</div>
        </div>
    );
}

export default AccessDenied;