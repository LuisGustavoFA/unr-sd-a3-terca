import firestoreServices from '../services/firestore.js';
import responsesService from '../services/responses.js';
import firebaseAuthService from '../services/fireauth.js';

const dbname = "clientes";

const clientesController = {
    async getAllClientes() {
        const user = await firebaseAuthService.verificarUsuarioLogado();
        if (user) {
            let clientes = await firestoreServices.getAllFromDB(dbname);
            return responsesService.createOkResponse(clientes);
        } else {
            return responsesService.createUnAuthResponse();
        }
    },

    async addCliente(body) {
        const user = await firebaseAuthService.verificarUsuarioLogado();
        if (user) {
            await firestoreServices.addToDB(body, dbname);
            return responsesService.createOkResponse({response: "criado"});
        } else {
            return responsesService.createUnAuthResponse();
        }
    },
}

export default clientesController;