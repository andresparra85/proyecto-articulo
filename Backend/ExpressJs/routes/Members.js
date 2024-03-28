var express = require('express');
var router = express.Router();
const membersController = require('../controllers/').membersController

router.get('/', membersController.list);
router.get('/:id', membersController.getById);
router.post('/add', membersController.add);
router.put('/:id', membersController.update);
router.delete('/:id', membersController.delete);

module.exports = router;