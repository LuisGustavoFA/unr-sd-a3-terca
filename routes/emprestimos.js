import express from 'express';
var router = express.Router();
import emprestimosController from '../controllers/emprestimosController.js';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let response = await emprestimosController.getAllEmprestimos(req.get("Authorization"));
  res.status(response.code).json(response.payload);
});

router.post('/', async function(req, res, next) {
  let response = await emprestimosController.addEmprestimo(req.body, req.get("Authorization"));
  res.status(response.code).json(response.payload);
});

export default router;
