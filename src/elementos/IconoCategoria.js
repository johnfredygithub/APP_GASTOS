import React from "react";
import {ReactComponent as IconoComida} from './../imagenes/cat_comida.svg';
import {ReactComponent as IconoCompras} from './../imagenes/cat_compras.svg';
import {ReactComponent as IconoCuentasYPagos} from './../imagenes/cat_cuentas-y-pagos.svg';
import {ReactComponent as IconoDiversion} from './../imagenes/cat_diversion.svg';
import {ReactComponent as IconoHogar} from './../imagenes/cat_hogar.svg';
import {ReactComponent as IconoRopa} from './../imagenes/cat_ropa.svg';
import {ReactComponent as IconoSaludEHigiene} from './../imagenes/cat_salud-e-higiene.svg';
import {ReactComponent as IconoTransporte} from './../imagenes/cat_transporte.svg';


const IconoCategoria = ({nombre}) => {
  switch (nombre) {
    case "COMIDA":
      return <IconoComida/>;
    case "COMPRAS":
      return <IconoCompras/>;
    case "CUENTAS Y PAGOS":
      return <IconoCuentasYPagos/>;
    case "DIVERSION":
      return <IconoDiversion/>;
    case "HOGAR":
      return <IconoHogar/>;
    case "ROPA":
      return <IconoRopa/>;
    case "SALUD E HIGIENE":
      return <IconoSaludEHigiene/>;
    case "TRANSPORTE":
      return <IconoTransporte/>;
    default:
        return <IconoComida/>;
      break;
  }
};

export default IconoCategoria;
