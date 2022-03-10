import React from 'react';
import {Header, Titulo} from './../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from './../elementos/BtnRegresar';
import BarraTotalGastos from './BarraTotalGastos';
import FormularioGasto from './FormularioGasto';
import { useParams } from 'react-router-dom';
import useObtenerUnGasto from '../hooks/useObtenerUnGasto';


const EditarGasto = () => {
    const {id}=useParams();
    const [gasto]=useObtenerUnGasto(id);
    
     return (         
    <>
        <Helmet>
        <title> EDITAR GASTO</title>
      </Helmet>
      <Header>
          <BtnRegresar  ruta="/lista"></BtnRegresar>
          <Titulo>EDITAR GASTO</Titulo>
        </Header>
        
    <FormularioGasto gasto={gasto}>
</FormularioGasto>
    <BarraTotalGastos/>
    </>

     );
 }
  
 export default EditarGasto;