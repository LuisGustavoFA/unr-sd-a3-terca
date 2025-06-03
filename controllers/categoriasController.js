import firestoreServices from '../services/firestore.js';
import responsesService from '../services/responses.js';
import firebaseAuthService from '../services/fireauth.js';

const dbname = "categorias";

const categoriasController = {
    async getAllCategorias() {
        const user = await firebaseAuthService.verificarUsuarioLogado();
        if (user) {
            let categorias = await firestoreServices.getAllFromDB(dbname);
            return responsesService.createOkResponse(categorias);
        } else {
            return responsesService.createUnAuthResponse();
        }
    },

    async addCategoria(body) {
        const user = await firebaseAuthService.verificarUsuarioLogado();
        if (user) {
            await firestoreServices.addToDB(body, dbname);
            return responsesService.createOkResponse({response: "criado"});
        } else {
            return responsesService.createUnAuthResponse();
        }
    },
}

export default categoriasController;