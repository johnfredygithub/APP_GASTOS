import {useState,useEffect} from 'react';
import {db} from '../firebase/firebaseConfig';
import { doc, onSnapshot, collection, query, where, limit,orderBy,startAfter } from "firebase/firestore";
import { useAuth } from '../contextos/AuthContext';

const useOptenerGastos = () => {
    ////estado
    const {usuario} = useAuth();
    const [gastos,cambiarGastos] =useState([]);
    const [ultimoGasto,cambiarUltimoGasto] =useState(null);
    const [hayMasPorCargar, cambiarHayMasPorCargar] = useState(false);

    const obtenerMasGastos=()=>{
        const q = query(collection(db, "gastos"),limit(10),where('uidUsuario','==',usuario.uid),orderBy('fecha','desc'),startAfter(ultimoGasto));
        const unsub =onSnapshot(q,(querySnapshot)=>{
            if(querySnapshot.docs.length>0){
                cambiarUltimoGasto(querySnapshot.docs[querySnapshot.docs.length-1]);//////TRAER EL ULTIMO QUE ELEMENTO Q CARGO     
                ///console.log(querySnapshot.docs[querySnapshot.docs.length-1])           
               cambiarGastos(gastos.concat(querySnapshot.docs.map((gasto) => {/////concatenar 10 nuevos gastos
                return {...gasto.data(),id:gasto.id}
            }))) 
            }else{
                cambiarHayMasPorCargar(false);
            }
        });        
    }

    useEffect(() => {
        const q = query(collection(db, "gastos"),limit(10),where('uidUsuario','==',usuario.uid),orderBy('fecha','desc')  );        

        const unsub = onSnapshot(q, (querySnapshot) => {
            console.log((querySnapshot.docs[querySnapshot.docs.length-1].data))
             if(querySnapshot.docs.length>0){
                cambiarUltimoGasto(querySnapshot.docs[querySnapshot.docs.length-1]);//////TRAER EL ULTIMO QUE ELEMENTO Q CARGO
                cambiarHayMasPorCargar(true);
            } else{
                cambiarHayMasPorCargar(false);
            }
            cambiarGastos(querySnapshot.docs.map((gasto)=>{
                 return {...gasto.data(),id:gasto.id}
            }));
        });
        ////desmontar componentes
        return unsub;
      },[usuario]);


    return [gastos,obtenerMasGastos,hayMasPorCargar];
}
 
export default useOptenerGastos;
