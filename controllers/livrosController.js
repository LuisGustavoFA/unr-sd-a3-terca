import responsesService from '../services/responses.js';
import firebaseAuthService from '../services/fireauth.js';
import oracledb from '../services/oracledb.js';

const dbname = "livros_livro";

const livrosController = {
    async getAllLivros() {
        let livros = await oracledb.getAllFromTable(dbname);
        if (livros) {
            return responsesService.createOkResponse(livros);
        } else {
            return responsesService.createUnProcessableResponse("ERRO " + error);
        }
    },
    
    async getAllLivrosByAuthor(id) {
        let livros = await oracledb.getFromTableWhereAuthor(dbname, id);
        if (livros) {
            return responsesService.createOkResponse(livros);
        } else {
            return responsesService.createUnProcessableResponse("ERRO " + error);
        }
    },

    async getCategoriasFromLivro(id) {
        let livros = await oracledb.getCatFromTable("livros_livrocategoria", id);
        if (livros) {
            return responsesService.createOkResponse(livros);
        } else {
            return responsesService.createUnProcessableResponse("ERRO " + error);
        }
    },

    async addLivro(body, authJWT) {
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

export default livrosController;