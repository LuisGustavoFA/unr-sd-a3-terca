import Response from "../models/Response.js";

const responsesService = {
    createOkResponse(payload) {
        return new Response(200, payload, "OK");
    },

    createUnAuthResponse() {
        return new Response(403, undefined, "Não Autorizado");
    },

    createCreatedResponse() {
        return new Response(201, undefined, "Criado");

    },

    createUnProcessableResponse(msg) {
        return new Response(422, undefined, msg); 
    }
}
export default responsesService;