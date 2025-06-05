import firestoreServices from '../services/firestore.js';
import responsesService from '../services/responses.js';
import firebaseAuthService from '../services/fireauth.js';

const dbname = "livros";

const livrosController = {
    async getAllLivros(authJWT) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            let livros = await firestoreServices.getAllFromDB(dbname);
            return responsesService.createOkResponse(livros);
        })
        .catch((error) => console.log(error))
    },

    async addLivro(body, authJWT) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            await firestoreServices.addToDB(body, dbname);
            return responsesService.createOkResponse({response: "criado"});
        })
        .catch((error) => console.log(error))
    },
}

export default livrosController;