import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import WebFont from "webfontloader";
import Contenedor from "./elementos/contenedor";
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import EditarGasto from './componentes/EditarGasto';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import InicioSession from './componentes/InicioSession';
import ListaGastos from './componentes/ListaGastos';
import RegistroUsuarios from './componentes/RegistroUsuarios';
import favicon from './imagenes/logo.png';
import {Helmet} from 'react-helmet';
import Fondo from './elementos/fondo'

WebFont.load({
  google: {
    families: ["Work Sans:400,500,700", "Droid Serif"],
  },
});

const Index = () => {
  return (
    <>
    <Helmet>
      <link rel="shortcut icon" href={favicon} type="image/x-icon"></link>
    </Helmet>
        <BrowserRouter> 
        <Contenedor>
        <Switch>
          <Route path="/iniciar-session" component={InicioSession}/>
          <Route path="/crear-cuenta" component={RegistroUsuarios}/>
          <Route path="/categoria" component={GastosPorCategoria}/>
          <Route path="/lista" component={ListaGastos}/>
          <Route path="/editar/:id" component={EditarGasto}/>
          <Route path="/" component={App}/>
        </Switch>
        </Contenedor>
        </BrowserRouter>
        <Fondo/>
    </>
  );
};

ReactDOM.render(<Index/>, document.getElementById("root"));
