var express = require('express');
var router = express.Router();
const servicesController = require('../controllers/').servicesController


router.get('/', servicesController.list);
router.get('/:id', servicesController.getById);
router.post('/add', servicesController.add);
router.put('/:id', servicesController.update);
router.delete('/:id', servicesController.delete);

module.exports = router;