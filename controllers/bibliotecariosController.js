import firestoreServices from '../services/firestore.js';
import responsesService from '../services/responses.js';
import firebaseAuthService from '../services/fireauth.js';

const dbname = "bibliotecarios";

const bibliotecariosController = {
    async getAllBibliotecarios() {
        const user = await firebaseAuthService.verificarUsuarioLogado();
        if (user) {
            let bibliotecarios = await firestoreServices.getAllFromDB(dbname);
            return responsesService.createOkResponse(bibliotecarios);
        } else {
            return responsesService.createUnAuthResponse();
        }
    },

    async addBibliotecario(body) {
        const user = await firebaseAuthService.verificarUsuarioLogado();
        if (user) {
            await firestoreServices.addToDB(body, dbname);
            return responsesService.createOkResponse({response: "criado"});
        } else {
            return responsesService.createUnAuthResponse();
        }
    },
}

export default bibliotecariosController;