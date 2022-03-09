import {db} from './firebaseConfig';
import { doc,deleteDoc } from "firebase/firestore";
const borrarGasto = (id) => {
    deleteDoc(doc(db, "gastos",id))
     .then(() => {
      console.log("se elimino correctamente")
     }).catch((e)=>{
      console.log(" NO se elimino :"+e)
     })    
}
 
export default borrarGasto;
