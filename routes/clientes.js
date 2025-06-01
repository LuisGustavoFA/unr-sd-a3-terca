import express from 'express';
var router = express.Router();
import clientesController from '../controllers/clientesController.js';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let response = await clientesController.getAllClientes();
  res.status(response.code).json(response.payload);
});

router.post('/', async function(req, res, next) {
  await clientesController.addCliente(req.body);
  res.json({"response": "criado com sucesso..."})
});

export default router;
