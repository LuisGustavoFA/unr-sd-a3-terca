import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { SignJWT, jwtVerify } from "jose";
import { jwtSecret } from "./secrets.js"

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
    },

    createJWT(payload) {
        return new Promise((resolve, reject) => {
            new SignJWT(payload)
            .setIssuedAt()
            .setSubject("User API Login")
            .setProtectedHeader({alg: "HS256"})
            .setExpirationTime("3600s")
            .sign(jwtSecret)
            .then((jwt) => resolve(jwt))
            .catch((error) => reject(error))
        });
    },

    validateJWT(jwt) {
        return new Promise((resolve, reject) => {
            jwtVerify(jwt, jwtSecret, {algorithms:["HS256"]})
            .then((payload)=> {resolve(payload)})
            .catch((error)=> {reject(error)})
        })
    },
}

export default firebaseAuthService;