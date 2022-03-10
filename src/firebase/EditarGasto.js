import {db} from './firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
// Add a new document in collection "cities"
const editarGasto =async ({id,categoria,descripcion,valor,fecha})=>{

    const Ref = doc(db, "gastos", id);
    // Set the "capital" field of the city 'DC'
    return   updateDoc(Ref, {
        id:id,
        categoria:categoria,
        descripcion:descripcion,
        valor:Number(valor),
        fecha:fecha              
    });
      
} 

export default editarGasto;
