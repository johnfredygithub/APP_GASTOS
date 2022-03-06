import React from 'react'
import { useAuth } from './../contextos/AuthContext';
import { Route,Redirect } from 'react-router-dom';



const RutaProtegida = ({children,...restoPropiedades}) => {
    const {usuario} =useAuth();
    if (usuario){//////si exite la session 
        return <Route {...restoPropiedades}>{children}</Route>
    }else{
        return <Redirect to="/iniciar-session" />
    }


    return (<div></div>);

}
 
export default RutaProtegida;