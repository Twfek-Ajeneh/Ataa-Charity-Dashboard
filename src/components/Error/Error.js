// import react
import React from 'react';

// import components
import FatalErrorIcon from '../../Icons/FatalErrorIcon';

// import style sheet
import './Error.css';

function Error(){
    return (
        <div className='error'>
            <FatalErrorIcon />
            <span>حدث خطأ ما ,الرجاء إعادة المحاولة</span>
        </div>
    );
}

export default Error;