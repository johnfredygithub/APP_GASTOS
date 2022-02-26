import React,{useState} from "react";
import { Helmet } from "react-helmet";
import {
  Header,
  Titulo,
  ContenedorHeader,
  ContenedorBotones,
} from "./../elementos/Header";
import Boton from "./../elementos/Boton";
import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from "./../elementos/ElementosDeFormulario";
import { ReactComponent as SvgLogin } from "./../imagenes/login.svg";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { auth } from "./../firebase/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.5rem; /*200px*/
  margin-bottom: 1.25rem; /*20px*/
`;

const InicioSession = () => {
//////////estados
const history = useHistory();
const [correo, establecerCorreo] = useState("");
const [password, establecerpassword] = useState("");
const [estadoAlerta, cambiarEstadoAlerta]=useState(false);
const [alerta ,cambiarAlerta]=useState({})

/////acceder al valor del input
const handleChange = (e) => {
  if (e.target.name==='email') {
    establecerCorreo(e.target.value)
  }else if(e.target.name==="password"){
    establecerpassword(e.target.value)
  }
}
  /////enviar submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({})
    //////verifica q sea un email
    const expresionRegular = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
    if (!expresionRegular.test(correo)) {
      cambiarEstadoAlerta(true)
      cambiarAlerta({
        tipo:"error",
        mensaje:"INGRESE UN CORREO VALIDO"
      });
      return;
    }

    if (correo === "" || password === "" ) {
      cambiarEstadoAlerta(true)
      cambiarAlerta({
        tipo:"error",
        mensaje:"por favor rellena todos los datos"  
      })
        return;
    }
    
    ///////Signin usuario
    await signInWithEmailAndPassword(auth, correo, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      history.push("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      let mensaje;
      switch (errorCode) {
        case 'auth/wrong-password':
          mensaje = 'ERROR PASSWORD INCORRECTO';
          break;
         case 'auth/user-not-found':
          mensaje = 'El correo electrónico es incorrecto';
          break;
        default:
          mensaje = 'Hubo un error al intentar crear la cuenta.';
          break;          
      }
      cambiarEstadoAlerta(true)
      cambiarAlerta({tipo:"error", mensaje:mensaje});
      console.log(errorCode , error.code);
      // ..
    });   
  };






return (
    <>
      <Helmet>
        <title>INICIAR SESION </title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>INICIAR SESION </Titulo>
          <div>
            <Boton to="/crear-cuenta">REGISTRARSE </Boton>
          </div>
        </ContenedorHeader>
      </Header>
      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input type="email" name="email" placeholder="EMAIL" value={correo} onChange={handleChange} />
        <Input type="password" name="password" placeholder="contraseña" value={password}  onChange={handleChange}/>
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            INICIAR SESION
          </Boton>
        </ContenedorBoton>
      </Formulario>
    </>
  );
};

export default InicioSession;
