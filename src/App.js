import React from 'react';
import { Helmet } from 'react-helmet';
import Contenedor from './elementos/contenedor';
import {Header, Titulo,ContenedorHeader,ContenedorBotones} from './elementos/Header';
///import { Link } from 'react-router-dom';
import Boton from './elementos/Boton';

const App = () => {
  return (
  <>
    <Helmet>
      <title>AGREGAR GASTOS</title>
    </Helmet>
    <Header>
      <ContenedorHeader>
        <Titulo>AGREGAR GASTO</Titulo>
        <ContenedorBotones>
          <Boton to="/categoria">CATEGORIA</Boton>
          <Boton to="/lista">Lista Gastos</Boton>
          <Boton to="/">X </Boton>
        </ContenedorBotones>
      </ContenedorHeader>
      </Header>
  </>
  );

}


 
export default App;