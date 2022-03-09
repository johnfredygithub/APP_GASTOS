import {db} from './firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

// Add a new document in collection "cities"
const agregarGasto =async ({categoria,descripcion,valor,fecha,uidUsuario})=>{
  return  await addDoc(collection(db, "gastos"), {
        categoria:categoria,
        descripcion:descripcion,
        valor:Number(valor),
        fecha:fecha,
        uidUsuario:uidUsuario
        })
      
} 

export default agregarGasto;
