import firebaseAuthService from "../services/fireauth.js";

const usersController = {
    criarUsuarioFirebase(email, password) {
        return new Promise((resolve, reject) => {
            firebaseAuthService.criarUsuarioComEmailSenha(email, password)
                .then(
                    (credencial) => {
                        resolve(credencial);
                    }
                )
                .catch(
                    (erro) => {
                        reject(erro);
                    }
                )
        })
    },
    
    fazerLoginFirebase(email, password) {
        return new Promise((resolve, reject) => {
            firebaseAuthService.loginUsuarioComEmailSenha(email, password)
                .then(
                    (credencial) => {
                        resolve(credencial);
                    }
                )
                .catch(
                    (erro) => {
                        reject(erro);
                    }
                )
        })
    },

    fazerLogoutFirebase() {
        return new Promise((resolve, reject) => {
            firebaseAuthService.logOutUsuarioLogado()
                .then(() => {
                    resolve({ message: "Logout realizado com sucesso" });
                })
                .catch((erro) => {
                    reject(erro);
                })
        })
    },
}

export default usersController