import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseAuthService = {
    criarUsuarioComEmailSenha(email, password) {
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    resolve(userCredential);
                })
                .catch((error) => {
                    reject(error);
        });
        });
    },

    loginUsuarioComEmailSenha(email, password) {
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    resolve(userCredential);
                })
                .catch((error) => {
                    reject(error);
        });
        });
    },
}

export default firebaseAuthService;