import React from 'react';
import {Header, Titulo} from './../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from './../elementos/BtnRegresar';
import BarraTotalGastos from './BarraTotalGastos';

const GastosPorCategoria = () => {
    return ( 
        <>
        <Helmet>
          <title> GASTOS POR  CATEGORIA</title>
        </Helmet>
        <Header>
            <BtnRegresar></BtnRegresar>
            <Titulo>GASTOS POR CATEGORIA</Titulo>
          </Header>
      <BarraTotalGastos/>
      </>
    
        );
}
 
export default GastosPorCategoria;