import React from 'react';
import {Header, Titulo} from './../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from './../elementos/BtnRegresar';
import BarraTotalGastos from './BarraTotalGastos';
import useObtenerGastosDelMesPorCategoria from '../hooks/useObtenerGastosDelMesPorCategoria';
import  {  ListaDeCategorias,  ElementoListaCategorias,  Categoria,Valor}from '../elementos/ElementosDeLista';
import IconoCategoria from '../elementos/IconoCategoria';
import convertirAMoneda from '../funciones/convertirAMoneda';


const GastosPorCategoria = () => {
  const gastosPorCategoria=useObtenerGastosDelMesPorCategoria();//////hook
  ////console.log(gastosPorCategoria);

    return ( 
        <>
        <Helmet>
          <title> GASTOS POR  CATEGORIA</title>
        </Helmet>
        <Header>
            <BtnRegresar></BtnRegresar>
            <Titulo>GASTOS POR CATEGORIA</Titulo>
          </Header>
          <ListaDeCategorias>
            {gastosPorCategoria.map((elemento,index)=>{////hook
              return (
              <ElementoListaCategorias key={index}>
                
                <Categoria><IconoCategoria nombre={elemento.categoria}></IconoCategoria>{elemento.categoria}</Categoria>
                <Valor>${convertirAMoneda(elemento.valor)}</Valor>
              </ElementoListaCategorias>)
            })}
          </ListaDeCategorias>
      <BarraTotalGastos/>
      </>
    
        );
}
 
export default GastosPorCategoria;