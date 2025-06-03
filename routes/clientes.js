import express from 'express';
var router = express.Router();
import clientesController from '../controllers/clientesController.js';
import firebaseAuthService from '../services/fireauth.js';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let token = req.get("Authorization");
  if (token) {
    token = token.slice(7);
  }
  firebaseAuthService.validateJWT(token)
  .then((payload) => console.log(payload))
  .catch((error) => console.log(error))

  //isso seria dentro do then acima, para so ir se for verificado...
  let response = await clientesController.getAllClientes();
  res.status(response.code).json(response.payload);
});

router.post('/', async function(req, res, next) {
  let response = await clientesController.addCliente(req.body);
  res.status(response.code).json(response.payload);
});

export default router;
