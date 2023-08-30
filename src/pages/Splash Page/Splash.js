// import react
import React from 'react';

//import components
import LoadingIcon from "../../components/loading icon/loading";
import MainLogo from "../../Icons/MainLogo";

// import style sheet
import './Splash.css';

function SplashScreen () {
    return (
        <div className="splash-screen">
            <MainLogo width={188} height={206}/>
            <LoadingIcon width="40px" height="40px"/>
        </div>
    );
}

export default SplashScreen;