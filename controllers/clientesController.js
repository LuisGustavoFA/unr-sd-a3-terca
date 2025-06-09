import responsesService from '../services/responses.js';
import firebaseAuthService from '../services/fireauth.js';
import oracledb from '../services/oracledb.js';

const dbname = "clientes_cliente";

const clientesController = {
    async getAllClientes(authJWT) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            let clientes = await oracledb.getAllFromTable(dbname);
            return responsesService.createOkResponse(clientes);
        })
        .catch((error) => {
            console.log(error)
            return responsesService.createUnProcessableResponse("ERRO " + error);
        })
    },
    
    async getClienteByEmail(authJWT, email) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            let clientes = await oracledb.getFromTableWhereEmail(dbname, email);
            return responsesService.createOkResponse(clientes);
        })
        .catch((error) => {
            console.log(error)
            return responsesService.createUnProcessableResponse("ERRO " + error);
        })
    },

    async addCliente(body, authJWT) {
        let token = authJWT;
        if (token) token = token.slice(7);
        else return responsesService.createUnAuthResponse();

        return firebaseAuthService.validateJWT(token)
        .then(async (payload) => {
            console.log(payload)
            await oracledb.addToTable(dbname, body);
            return responsesService.createOkResponse({response: "criado"});
        })
        .catch((error) => {
            console.log(error)
            return responsesService.createUnProcessableResponse("ERRO " + error);
        })
    },
}

export default clientesController;