import React, { useState, useEffect, useContext } from "react";
import useObtenerGastosDelMes from "../hooks/useObtenerGastosdDelMes";

const TotalGastadoContext = React.createContext();

const useTotalDelMes = () => useContext(TotalGastadoContext);

const TotalGastadoProvider = ({ children }) => {
  const [total, cambiarTotal] = useState(0);
  const gastos=useObtenerGastosDelMes();  
  useEffect(()=>{
      //console.log(gastos)
    let acumulado=0;
     gastos.forEach((gasto) => {         
         acumulado+=parseInt(gasto.valor);
    }) 
    cambiarTotal(acumulado);
     console.log(acumulado);
    },[gastos]);

  return (
    <TotalGastadoContext.Provider value={{ total: total }}>
      {children}
    </TotalGastadoContext.Provider>
  );
};

export { TotalGastadoProvider ,useTotalDelMes };
