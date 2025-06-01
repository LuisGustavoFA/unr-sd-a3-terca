import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

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

    verificarUsuarioLogado() {
        const auth = getAuth();
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(user);
                } else {
                    resolve(null);
                }
            });
        });
    },

    logOutUsuarioLogado() {
        const auth = getAuth();
        return signOut(auth);
    }
}

export default firebaseAuthService;