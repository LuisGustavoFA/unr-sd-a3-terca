import firestoreServices from '../services/firestore.js';
import responsesService from '../services/responses.js';
import firebaseAuthService from '../services/fireauth.js';

const clientesController = {
    async getAllClientes() {
        const user = await firebaseAuthService.verificarUsuarioLogado();
        if (user) {
            let clientes = await firestoreServices.getAllClientes();
            return responsesService.createOkResponse(clientes);
        } else {
            return responsesService.createUnAuthResponse();
        }
    },

    async addCliente(body) {
        await firestoreServices.addCliente(body);
    },
}

export default clientesController;