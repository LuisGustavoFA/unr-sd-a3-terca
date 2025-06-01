import firestoreServices from '../services/firestore.js';
import responsesService from '../services/responses.js';

const clientesController = {
    async getAllClientes() {
        let clientes = await firestoreServices.getAllClientes();
        return responsesService.createOkResponse(clientes);
    },

    async addCliente(body) {
        await firestoreServices.addCliente(body);
    },
}

export default clientesController;