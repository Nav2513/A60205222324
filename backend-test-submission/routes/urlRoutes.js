const express = require('express');
const router = express.Router();
const { shortenUrl, redirect } = require('../controllers/urlController');

router.post('/shorten', shortenUrl);
router.get('/:shortCode', redirect);

module.exports = router;
