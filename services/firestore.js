import firebaseApp from "./firebaseApp.js";
import { collection, query, where, doc, getDocs, setDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const clientesCollection = collection(db, 'clientes');

const firestoreServices = {
    async getAllClientes() {
        const result = [];
        const q = query(clientesCollection);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let d = doc.data();
            d.id = doc.id;
            result.push(d);
        });
        return result;
    },

    async addCliente(body) {
        const docRef = doc(clientesCollection);
        await setDoc(docRef, body);
    }
}

export default firestoreServices;