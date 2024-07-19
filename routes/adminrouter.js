const express = require('express');
const router = express.Router();
const adminController = require('../actions/adminController')
const ipController = require('../actions/ipController');


router.get('/', ipController, adminController.get_adminhome);

router.get('/sorguekrani', ipController, adminController.get_sorguekrani);
router.post('/sorguekrani', adminController.post_sorguekrani);

router.get('/sonucekrani', ipController, adminController.get_sonucekrani);

router.get('/logo', ipController, adminController.get_logo);
router.post('/logo', adminController.post_logo);

router.get('/arkaplan', ipController, adminController.get_arkaplan);
router.post('/arkaplan', adminController.post_arkaplan);

router.get('/liste', ipController, adminController.get_liste);
router.post('/liste', adminController.post_liste);


module.exports = router;