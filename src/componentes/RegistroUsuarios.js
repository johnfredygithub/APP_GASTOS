import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {  Header,  Titulo,  ContenedorHeader,  ContenedorBotones} from "./../elementos/Header";
import Boton from "./../elementos/Boton";
import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from "./../elementos/ElementosDeFormulario";
import { ReactComponent as SvgLogin } from "./../imagenes/registro.svg";
import styled from "styled-components";
import { auth } from "./../firebase/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import Alerta from "./../elementos/Alerta";


//////stilos
const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.5rem; /*100px*/
  margin-bottom: 0.25rem; /*20px*/
`;

const RegistroUsuarios = () => {
  //////////estados
  const history = useHistory();
  const [correo, establecerCorreo] = useState("");
  const [password, establecerpassword] = useState("");
  const [password2, establecerpassword2] = useState("");
  const [estadoAlerta, cambiarEstadoAlerta]=useState(false);
  const [alerta ,cambiarAlerta]=useState({})
  ///////FUNCION accediendo a los input
  const handleChange = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "email":
        establecerCorreo(e.target.value);
        break;
      case "password":
        establecerpassword(e.target.value);
        break;
      case "password2":
        establecerpassword2(e.target.value);
        break;
      default:
        break;
    }
  };
  /////enviar submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({})

    const expresionRegular = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
    if (!expresionRegular.test(correo)) {
      cambiarEstadoAlerta(true)
      cambiarAlerta({
        tipo:"error",
        mensaje:"INGRESE UN CORREO VALIDO"
      });
      return;
    }
    if (correo === "" || password === "" || password2 === "") {
      cambiarEstadoAlerta(true)
      cambiarAlerta({
        tipo:"error",
        mensaje:"por favor rellena todos los datos"  
      })
        return;
    }
    if (password !== password2) {
      cambiarEstadoAlerta(true)
      cambiarAlerta({
        tipo:"error",
        mensaje:"LAS CONTRASEÑAS NO COINCIDEN"
      });
      return;
    }
    ///////creamos usuario
    await createUserWithEmailAndPassword(auth, correo, password)
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
        case 'auth/weak-password':
          mensaje = 'LA CONTRASEÑA DEBE TENER MAS DE 6 CARACTERES';
          break;
        case 'auth/email-already-in-use':
          mensaje = 'YA EXISTE UNA CUENTA CON ESE EMAIL';
          break;
        case 'auth/invalid-email':
          mensaje = 'El correo electrónico no es válido.';
          break;
        default:
          mensaje = 'Hubo un error al intentar crear la cuenta.';
          break;          
      }
      cambiarEstadoAlerta(true)
      cambiarAlerta({tipo:"error", mensaje:mensaje});
      /////onsole.log(errorCode , error.code);
      // ..
    });   
  };
  return (
    <>
      <Helmet>
        <title>CREAR CUENTA</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>CREAR CUENTA</Titulo>
          <div>
            <Boton to="/iniciar-session">INICIAR SESSION </Boton>
          </div>
        </ContenedorHeader>
      </Header>
      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input
          type="Email"
          name="email"
          placeholder="EMAIL"
          value={correo}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="contraseña"
          value={password}
          onChange={handleChange}
        />

        <Input
          type="password"
          name="password2"
          placeholder="Repetir la contraseña"
          value={password2}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            CREAR CUENTA
          </Boton>
        </ContenedorBoton>
      </Formulario>
      <Alerta 
        tipo={alerta.tipo}
        mensaje = {alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta} 
      />
    </>
  );
};

export default RegistroUsuarios;
