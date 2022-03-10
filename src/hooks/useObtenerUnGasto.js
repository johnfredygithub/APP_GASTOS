import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const useObtenerUnGasto = (id) => {
  const history =useHistory();  
  const [gasto, establecerGasto] = useState();
  useEffect(async () => {
    const docRef = doc(db, "gastos", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      establecerGasto(docSnap)
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      history.push('/lista');
      console.log("No such document!");
    }

  }, [history,id]);

  return [gasto];
};

export default useObtenerUnGasto;
