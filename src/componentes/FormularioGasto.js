import React, { useState } from "react";
import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from "../elementos/ElementosDeFormulario";
import Boton from "./../elementos/Boton";
import { ReactComponent as IconoPlus } from "../imagenes/plus.svg";
import SelectCategorias from "./SelectCategorias";
import DatePicker from "./DatePicker";
import agregarGasto from "../firebase/agregarGasto";
import getUnixTime from 'date-fns/getUnixTime';
import fromUnixTime from 'date-fns/fromUnixTime';
import { useAuth } from "../contextos/AuthContext";
import Alerta from "../elementos/Alerta";

const FormularioGasto = () => {
//////estados
  const [inputDescripcion, cambiarInputDescripcion] = useState("");
  const [inputValor, cambiarInputValor] = useState("");
  const [categoria, cambiarCategoria] = useState("HOGAR");
  const [fecha,cambiarFecha] = useState(new Date());
  const {usuario} = useAuth();
  const [estadoAlerta, cambiarEstadoAlerta]=useState(false);
  const [alerta, cambiarAlerta]=useState(false);

  const handleChange = (e) => {
    if (e.target.name === "descripcion") {
      cambiarInputDescripcion(e.target.value);
    } else if (e.target.name === "valor") {
      cambiarInputValor(e.target.value.replace(/[^0-9.]/g,''));
    }
  };
///console.log(getUnixTime(fecha) )
const handleSubmit=(e) => {
    e.preventDefault();
    if(inputDescripcion!=='' && inputValor!==''){
      //let cantidad = parseFloat(inputValor).toFixed(2);
    agregarGasto({
      categoria:categoria,
      descripcion:inputDescripcion,
      valor:inputValor,
      fecha:getUnixTime(fecha),
      uidUsuario:usuario.uid
  })
  .then(()=>{
    cambiarCategoria('HOGAR');
    cambiarInputDescripcion('');
    cambiarInputValor('');
    cambiarFecha(new Date());

    cambiarEstadoAlerta(true);
    cambiarAlerta({tipo:'exito',mensaje:'EL GASTO FUE CARGADO CORRECTAMENTE'});
  }).catch((error)=>{
    cambiarEstadoAlerta(true);
    cambiarAlerta({tipo:'error',mensaje:'HAY UN PROBLEMA AL GUARDAR GASTO,CONTACTA AL ADMINISTRADOR'});
  })
  }else{
    cambiarEstadoAlerta(true);
    cambiarAlerta({tipo:'error',mensaje:'LLENA TODOS LOS CAMPOS'});
  }
}
  return (
    <div>
      <Formulario onSubmit={handleSubmit}>
        <ContenedorFiltros>
          <SelectCategorias
          categoria={categoria}
          cambiarCategoria={cambiarCategoria}
          />
          <DatePicker fecha={fecha} cambiarFecha={cambiarFecha}/>
        </ContenedorFiltros>

        <div>
          <Input
            type="text"
            name="descripcion"
            id="descripcion"
            placeholder="DESCRIPCION"
            value={inputDescripcion}
            onChange={handleChange}
          />
          <InputGrande
            type="number"
            name="valor"
            id="valor"
            placeholder="$VALOR"
            value={inputValor}
            onChange={handleChange}
          />
        </div>
        <ContenedorBoton>
          <Boton as="button" primario conIcono type="submit">
            Agregar Gasto
            <IconoPlus />
          </Boton>
        </ContenedorBoton>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
      </Formulario>
    </div>
  );
};

export default FormularioGasto;
