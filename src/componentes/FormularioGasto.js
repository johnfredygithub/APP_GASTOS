import React, { useState, useEffect } from "react";
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
import getUnixTime from "date-fns/getUnixTime";
import fromUnixTime from "date-fns/fromUnixTime";
import { useAuth } from "../contextos/AuthContext";
import Alerta from "../elementos/Alerta";
import { useHistory } from "react-router-dom";
import editarGasto from "../firebase/EditarGasto";
const FormularioGasto = ({ gasto }) => {
  //////estados
  const [inputDescripcion, cambiarInputDescripcion] = useState("");
  const [inputValor, cambiarInputValor] = useState("");
  const [categoria, cambiarCategoria] = useState("HOGAR");
  const [fecha, cambiarFecha] = useState(new Date());
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState(false);
  /////auth
  const { usuario } = useAuth();
  const history = useHistory();

  ////////traer gasto a los inputs --------->EDITAR
  useEffect(() => {
    ////COMPROBAMOS SI HAY LAGIN GASTO DE SER ASI ESTABLECEMOS  TODO EL ESTATE
    if (gasto) {
      //////comprobar que el gasto sea del usuario actual
      if (gasto.data().uidUsuario === usuario.uid) {
        cambiarCategoria(gasto.data().categoria);
        cambiarFecha(fromUnixTime(gasto.data().fecha));
        cambiarInputDescripcion(gasto.data().descripcion);
        cambiarInputValor(gasto.data().valor);
      } else {
        history.push("/lista");
      }
    }
  }, [gasto, usuario, history]);

  const handleChange = (e) => {
    if (e.target.name === "descripcion") {
      cambiarInputDescripcion(e.target.value);
    } else if (e.target.name === "valor") {
      cambiarInputValor(e.target.value.replace(/[^0-9.]/g, ""));
    }
  };
  ///console.log(getUnixTime(fecha) )
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputDescripcion !== "" && inputValor !== "") {
      if (gasto) {
        editarGasto({
          id: gasto.id,
          categoria: categoria,
          descripcion: inputDescripcion,
          valor: inputValor,
          fecha: getUnixTime(fecha),
        })
          .then(() => {
            history.push("/lista");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        //let cantidad = parseFloat(inputValor).toFixed(2);
        agregarGasto({
          categoria: categoria,
          descripcion: inputDescripcion,
          valor: inputValor,
          fecha: getUnixTime(fecha),
          uidUsuario: usuario.uid,
        })
          .then(() => {
            cambiarCategoria("HOGAR");
            cambiarInputDescripcion("");
            cambiarInputValor("");
            cambiarFecha(new Date());

            cambiarEstadoAlerta(true);
            cambiarAlerta({
              tipo: "exito",
              mensaje: "EL GASTO FUE CARGADO CORRECTAMENTE",
            });
          })
          .catch((error) => {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
              tipo: "error",
              mensaje:
                "HAY UN PROBLEMA AL GUARDAR GASTO,CONTACTA AL ADMINISTRADOR",
            });
          });
      }
    } else {
      cambiarEstadoAlerta(true);
      cambiarAlerta({ tipo: "error", mensaje: "LLENA TODOS LOS CAMPOS" });
    }
  };
  return (
    <div>
      <Formulario onSubmit={handleSubmit}>
        <ContenedorFiltros>
          <SelectCategorias
            categoria={categoria}
            cambiarCategoria={cambiarCategoria}
          />
          <DatePicker fecha={fecha} cambiarFecha={cambiarFecha} />
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
            {gasto?'Editar Gasto':'Agregar Gasto'}
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
