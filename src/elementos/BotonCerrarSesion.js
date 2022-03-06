import React from 'react';
import { auth } from '../firebase/firebaseConfig';
import { ReactComponent as IconoCerrarSesion } from './../imagenes/log-out.svg';
import Boton from './Boton';
import {useHistory} from 'react-router-dom';

const BotonCerrarSesion = () => {
    const history = useHistory();
    const cerrarSession= async ()=>{
        try {
            await auth.signOut();
            history.push('/iniciar-session');
        }catch(error){
            console.log(error)
        }
    }


    return (
        <Boton iconoGrande as="button" onClick={cerrarSession}>
            <IconoCerrarSesion></IconoCerrarSesion>
        </Boton>
      );
}
 
export default BotonCerrarSesion;