const express = require('express');
const router = express.Router();
const { createShortUrl, redirectToOriginalUrl, getAnalytics } = require('../controllers/urlController');

router.post('/shorten', createShortUrl);
router.get('/:code', redirectToOriginalUrl);
router.get('/analytics/:code', getAnalytics);

module.exports = router;
