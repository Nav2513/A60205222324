const Url = require('../models/Url');
const generateShortCode = require('../utils/generateShortCode');
const BASE_URL = process.env.BASE_URL;

exports.shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'Missing longUrl' });
  }

  try {
    const shortCode = generateShortCode();
    const shortUrl = `${BASE_URL}/${shortCode}`;

    await Url.create({ longUrl, shortCode });
    res.status(201).json({ shortUrl });
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
};

exports.redirect = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(url.longUrl);
  } catch (error) {
    console.error('Redirection error:', error);
    res.status(500).json({ error: 'Redirection failed' });
  }
};
