var express = require('express');
var router = express.Router();
const userController = require('../controllers').userController;
router.get('/', userController.list);
module.exports = router;
