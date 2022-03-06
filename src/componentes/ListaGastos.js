import React from "react";
import {Header, Titulo} from './../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from "./../elementos/BtnRegresar";
import { useAuth } from "./../contextos/AuthContext";
import BarraTotalGastos from "./BarraTotalGastos";


const ListaGastos = () => {
  const {usuario} =useAuth();
  console.log(usuario);
  
  return (
    <>
      <Helmet>
        <title> LISTA GASTOS</title>
      </Helmet>
      <Header>
        <BtnRegresar></BtnRegresar>
        <Titulo>LISTA GASTOS</Titulo>
      </Header>
      <BarraTotalGastos/>
    </>
  );
};

export default ListaGastos;
