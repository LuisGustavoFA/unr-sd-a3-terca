import express from 'express';
var router = express.Router();
import livrosController from '../controllers/livrosController.js';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let response = await livrosController.getAllLivros();
  res.status(response.code).json(response.payload);
});

router.post('/', async function(req, res, next) {
  let response = await livrosController.addLivro(req.body, req.get("Authorization"));
  res.status(response.code).json(response.payload);
});

export default router;
