var express = require('express');
var router = express.Router();
const paymentsController = require('../controllers/').paymentsController

router.get('/', paymentsController.list);
router.get('/full', paymentsController.listFull);
router.get('/:id', paymentsController.getById);
router.post('/agregar', paymentsController.add);
router.put('/:id', paymentsController.update);
router.delete('/:id', paymentsController.delete);


module.exports = router;