import React, { useState ,useContext,useEffect } from 'react';
import {auth} from './../firebase/firebaseConfig';

////CREAMOS EL CONTEXTO
const AuthContext =React.createContext();

////HOOK PARA ACCEDER AL CONTEXTO
const useAuth = ()=>{
    return useContext(AuthContext);    
}

const AuthProvider = ({children}) => {
    const [usuario,cambiarUsuario] = useState();
    ///crear state para cargar la comprobacion una sola vez
    const [cargando,cambiarCargando]=useState(true);
  
    ////EFECT PARA EJECUTAR COMPROBACION UNA  SOLA VEZ
    useEffect(()=>{
        ////comprobar si hay un usuario
    const cancelarSuscripcion=auth.onAuthStateChanged((usuario)=>{
            cambiarUsuario(usuario);  
            cambiarCargando(false);
        });
        return cancelarSuscripcion;/////desmontar componete
    },[]);////,[] =comprobar una sola vez

    return ( 
        <AuthContext.Provider value={{usuario:usuario}}>
            {/*solo se retornan los elementos  cuando no este cargado la aplicacion */}
            {!cargando && children}
        </AuthContext.Provider>  
     );
}
 
export {AuthProvider,AuthContext,useAuth};