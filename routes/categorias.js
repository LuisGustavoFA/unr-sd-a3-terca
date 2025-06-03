import express from 'express';
var router = express.Router();
import categoriasController from '../controllers/categoriasController.js';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let response = await categoriasController.getAllCategorias();
  res.status(response.code).json(response.payload);
});

router.post('/', async function(req, res, next) {
  let response = await categoriasController.addCategoria(req.body);
  res.status(response.code).json(response.payload);
});

export default router;
