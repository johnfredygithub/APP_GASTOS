import React from 'react';
import {Header, Titulo} from './../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from './../elementos/BtnRegresar';
import BarraTotalGastos from './BarraTotalGastos';
import FormularioGasto from './FormularioGasto';
import { useParams } from 'react-router-dom';

const EditarGasto = () => {
    const {id}=useParams();
    
     return (         
    <>
        <Helmet>
        <title> EDITAR GASTO</title>
      </Helmet>
      <Header>
          <BtnRegresar></BtnRegresar>
          <Titulo>EDITAR GASTO</Titulo>
        </Header>
        
    <FormularioGasto>

</FormularioGasto>
    <BarraTotalGastos/>
    </>

     );
 }
  
 export default EditarGasto;