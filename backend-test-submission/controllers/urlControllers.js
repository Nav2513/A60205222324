const Url = require('../models/Url');
const generateShortCode = require('../utils/generateShortCode');

exports.createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortCode = generateShortCode();

  try {
    const newUrl = new Url({ originalUrl, shortCode });
    await newUrl.save();
    res.status(201).json({ shortUrl: `${req.protocol}://${req.get('host')}/api/url/${shortCode}` });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.redirectToOriginalUrl = async (req, res) => {
  const { code } = req.params;

  try {
    const url = await Url.findOne({ shortCode: code });

    if (!url) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    url.clickCount += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAnalytics = async (req, res) => {
  const { code } = req.params;

  try {
    const url = await Url.findOne({ shortCode: code });

    if (!url) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      clicks: url.clickCount,
      createdAt: url.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
