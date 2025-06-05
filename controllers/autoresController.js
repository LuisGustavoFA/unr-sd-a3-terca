import firestoreServices from '../services/firestore.js';
import responsesService from '../services/responses.js';
import firebaseAuthService from '../services/fireauth.js';

const dbname = "autores";

const autoresController = {
    async getAllAutores(authJWT) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            let autores = await firestoreServices.getAllFromDB(dbname);
            return responsesService.createOkResponse(autores);
        })
        .catch((error) => console.log(error))
    },

    async addAutor(body, authJWT) {
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

export default autoresController;