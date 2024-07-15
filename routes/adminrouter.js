const express = require('express');
const router = express.Router();
const adminController = require('../actions/adminController')

router.get('/', adminController.get_adminhome);

router.get('/sorguekrani', adminController.get_sorguekrani);
router.post('/sorguekrani', adminController.post_sorguekrani);

router.get('/sonucekrani', adminController.get_sonucekrani);

router.get('/logo', adminController.get_logo);
router.post('/logo', adminController.post_logo);

router.get('/arkaplan', adminController.get_arkaplan);
router.post('/arkaplan', adminController.post_arkaplan);

router.get('/liste', adminController.get_liste);
router.post('/liste', adminController.post_liste);


module.exports = router;