const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

router.put('/mail', mailController.mail)
router.get('/', (req, res) => {
	res.send('working...')
})

module.exports = router;