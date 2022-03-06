import React from 'react';
import { Helmet } from 'react-helmet';
import Contenedor from './elementos/contenedor';
import {Header, Titulo,ContenedorHeader,ContenedorBotones} from './elementos/Header';
///import { Link } from 'react-router-dom';
import Boton from './elementos/Boton';
import BotonCerrarSesion from './elementos/BotonCerrarSesion'
import FormularioGasto from './componentes/FormularioGasto';
import BarraTotalGastos from './componentes/BarraTotalGastos';


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
          <BotonCerrarSesion to="/"></BotonCerrarSesion>
        </ContenedorBotones>
      </ContenedorHeader>
      </Header>
      <FormularioGasto></FormularioGasto>
      <BarraTotalGastos></BarraTotalGastos>
  </>
  );
}
export default App;