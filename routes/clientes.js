import express from 'express';
var router = express.Router();
import clientesController from '../controllers/clientesController.js';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let response = await clientesController.getAllClientes(req.get("Authorization"));
  res.status(response.code).json(response.payload);
});

router.post('/', async function(req, res, next) {
  let response = await clientesController.addCliente(req.body, req.get("Authorization"));
  res.status(response.code).json(response.payload);
});

export default router;
