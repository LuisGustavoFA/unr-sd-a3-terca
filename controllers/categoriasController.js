import firestoreServices from '../services/firestore.js';
import responsesService from '../services/responses.js';
import firebaseAuthService from '../services/fireauth.js';

const dbname = "categorias";

const categoriasController = {
    async getAllCategorias(authJWT) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            let categorias = await firestoreServices.getAllFromDB(dbname);
            return responsesService.createOkResponse(categorias);
        })
        .catch((error) => console.log(error))
    },

    async addCategoria(body, authJWT) {
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

export default categoriasController;