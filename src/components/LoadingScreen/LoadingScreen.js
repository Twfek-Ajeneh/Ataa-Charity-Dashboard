// import react
import React from "react";

// import components
import LoadingIcon from "../loading icon/loading";

// import style sheet
import './LoadingScreen.css';

function LoadingScreen (){
    return(
        <div className='loading-screen'>
            <LoadingIcon />
        </div>
    );
}

export default LoadingScreen;