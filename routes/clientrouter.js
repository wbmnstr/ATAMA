const express = require('express');
const router = express.Router();
const clientController = require('../actions/clientController');

router.get('/', clientController.home);
router.post('/', clientController.sorgusonucu);


module.exports = router;