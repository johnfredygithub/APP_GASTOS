import React from "react";
import {Header, Titulo} from './../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from "./../elementos/BtnRegresar";
import { useAuth } from "./../contextos/AuthContext";
import BarraTotalGastos from "./BarraTotalGastos";
import useOptenerGastos from '../hooks/useObtenerGasto'; 
import convertirAMoneda from '../funciones/convertirAMoneda';
import {ReactComponent as IconoEditar} from "../imagenes/editar.svg";
import {ReactComponent as IconoBorrar} from "../imagenes/borrar.svg";
import { Link } from "react-router-dom";

import {
  Lista,
  ElementoLista,
  Categoria,
  Descripcion,
  Valor,
  Fecha,
  ContenedorBotones,
  BotonAccion,
  BotonCargarMas,
  ContenedorBotonCentral,
  ContenedorSubtitulo,
  Subtitulo
} from '../elementos/ElementosDeLista';
import IconoCategoria from '../elementos/IconoCategoria';
import Boton from "../elementos/Boton";
import {format,parseISO} from "date-fns";
import fromUnixTime from 'date-fns/fromUnixTime';
import {es} from 'date-fns/locale';
import borrarGasto from "../firebase/BorrarGasto";

const ListaGastos = () => {
  const [gastos,obtenerMasGastos,hayMasPorCargar]=useOptenerGastos();//////traer gastos
////////fecha
  const formatearFecha= (fecha)=>{
   ///parseInt(fecha);
   const result = fromUnixTime(fecha)
   ///let f=format(result);
   if(!isNaN(result)){
     return (format(result,"dd 'de' MMMM 'de' yyyy", {locale: es}));
    } 
   
      
  }

    
  
const fechaEsIgual =(gastos,index,gasto)=>{
if(index!==0){
     const fechaActual=formatearFecha(gasto.fecha);
     const fechaGastoAnterior=formatearFecha(gastos[index-1].fecha);
     if(fechaActual===fechaGastoAnterior){
       return (true)
     }else{
       return(false)
     }
     console.log('fecha a ante',fechaActual, fechaGastoAnterior);
  }
}


  ///console.log(gastos);
  const {usuario} =useAuth();
  ///console.log(usuario);
  
  return (
    <>
      <Helmet>
        <title> LISTA GASTOS</title>
      </Helmet>
      <Header>
        <BtnRegresar></BtnRegresar>
        <Titulo>LISTA GASTOS</Titulo>
      </Header>
      <Lista>
        {gastos.map((gasto,index) =>{
          //console.table(gastos)
          return (           
            <div key={index}>
              {/* si la fecha NO es igual mostrar fecha  */}
              {!fechaEsIgual(gastos, index, gasto) && <Fecha>{formatearFecha(gasto.fecha)}</Fecha>}
            
            <ElementoLista >
            <Categoria>
             <IconoCategoria id={gasto.categoria}/>
              {gasto.categoria}
              </Categoria>
              <Descripcion>{gasto.descripcion}</Descripcion>          
              <Valor>${convertirAMoneda(gasto.valor)}</Valor>
              
              <ContenedorBotones>
                <BotonAccion  as={Link} to={`/editar/${gasto.id}`}><IconoEditar/></BotonAccion>
                <BotonAccion onClick={()=>borrarGasto(gasto.id)}><IconoBorrar/></BotonAccion>
              </ContenedorBotones>
          </ElementoLista> 
            </div>          
          );
        })} 
          {hayMasPorCargar&&
          <ContenedorBotonCentral>        
          <BotonCargarMas onClick={() =>obtenerMasGastos()}>CARGAR MAS</BotonCargarMas>
          </ContenedorBotonCentral>       
        
          }
          {
            gastos.length===0 &&
            <ContenedorSubtitulo>
              <Subtitulo>NO HAY GASTO POR MOSTRAR</Subtitulo>
              <Boton as={Link} to="/" >AGREGAR GASTO</Boton>

            </ContenedorSubtitulo>
          }
      </Lista>
      <BarraTotalGastos/>
    </>
  );
};

export default ListaGastos;
