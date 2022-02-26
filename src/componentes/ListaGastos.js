import React from "react";
import {Header, Titulo} from './../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from "./../elementos/BtnRegresar";

const ListaGastos = () => {
  return (
    <>
      <Helmet>
        <title> LISTA GASTOS</title>
      </Helmet>
      <Header>
        <BtnRegresar></BtnRegresar>
        <Titulo>LISTA GASTOS</Titulo>
      </Header>
    </>
  );
};

export default ListaGastos;
