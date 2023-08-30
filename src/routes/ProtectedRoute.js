// import react
import React from  'react';
import { Outlet , Navigate } from 'react-router-dom';

function ProtectedRoute (props) {
    const access = props.check();

    return access ? <Outlet /> : <Navigate replace to={props.to} />;
}

export default ProtectedRoute;