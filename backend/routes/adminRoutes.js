const express = require('express');
const { loginAdmin, createAdmin } = require('../controllers/adminControllers/adminControllers');
const router = express.Router();

router.post('/ng-login', loginAdmin)
router.post('/ng-create', createAdmin)


module.exports = router