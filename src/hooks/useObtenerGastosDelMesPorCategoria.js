import {useEffect,useState} from 'react';
import useObtenerGastosdDelMes from './useObtenerGastosdDelMes';


const useOptenerGastosDelMesPorCategoria = () => {
    const [gastosPorCategoria,cambiarGastosPorCategoria] = useState([]);
    const gastos=useObtenerGastosdDelMes();
    useEffect(()=>{
        ///////devolver objeto con suma de cada categoria
    const sumaDeGastos=gastos.reduce((objetoResultante,objetoActual)=>{
        const categoriaActual=objetoActual.categoria;
        const cantidadActual=objetoActual.valor;
        console.log(objetoActual.categoria,objetoActual.valor)
        objetoResultante[categoriaActual]+=cantidadActual;
        return objetoResultante;
    },{
        'COMIDA': 0,
        'CUENTAS Y PAGOS': 0,
        'HOGAR': 0,
        'TRANSPORTE': 0,
        'ROPA': 0,
        'SALUD E HIGIENE': 0,
        'COMPRAS': 0,
        'DIVERSION': 0,
        'EDUCACION': 0,
    });

    cambiarGastosPorCategoria(Object.keys(sumaDeGastos).map((elemento)=>{
        return{categoria:elemento, valor:sumaDeGastos[elemento]}
    }))
    },[gastos,cambiarGastosPorCategoria])


    
    return gastosPorCategoria;
}
 
export default useOptenerGastosDelMesPorCategoria;