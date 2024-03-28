var express = require('express');
var router = express.Router();
const spacesController = require('../controllers/').spacesController

router.get('/', spacesController.list);
router.get('/:id', spacesController.getById);
router.post('/add', spacesController.add);
router.put('/:id', spacesController.update);
router.delete('/:id', spacesController.delete);

module.exports = router;