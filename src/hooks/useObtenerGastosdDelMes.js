import {useState, useEffect} from 'react';
import {db} from '../firebase/firebaseConfig';
import {onSnapshot, collection, query, where,orderBy } from "firebase/firestore";
import { useAuth } from '../contextos/AuthContext';
///const {usuario} = useAuth();
import { startOfMonth,endOfMonth ,getUnixTime} from 'date-fns/esm';

const useObtenerGastosdDelMes = () => {
    const {usuario} = useAuth();
    const [gastos,establecerGastos]=useState([]);

    useEffect(()=>{
        const inicioMes=getUnixTime(startOfMonth(new Date()));
        const finDeMes=getUnixTime(endOfMonth(new Date()));
       if(usuario){
        ///console.log(inicioMes, finDeMes)
        const q = query(collection(db, "gastos")
        ,where('uidUsuario','==',usuario.uid),
        where('fecha','>=',inicioMes),
        where('fecha','<=',finDeMes),
        orderBy('fecha','desc')  );        

        const unsub = onSnapshot(q, (querySnapshot) => {
            //console.log((querySnapshot.docs))           
            establecerGastos(querySnapshot.docs.map((document)=>{
                 return {...document.data(),id:document.id} 
            }));
        });
        return unsub;/////retorna una funcion cuando se desmonta el comonente

       }
       
        
    },[usuario]);
    return gastos;
    
}
 
export default useObtenerGastosdDelMes;