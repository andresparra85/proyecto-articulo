var express = require('express');
var router = express.Router();
const bookingsController = require('../controllers').bookingsController;

router.get('/', bookingsController.list);
router.get('/full', bookingsController.listFull);
router.get('/:id', bookingsController.getById);
router.post('/add', bookingsController.add);
router.put('/:id', bookingsController.update);
router.delete('/:id', bookingsController.delete);

module.exports = router;
