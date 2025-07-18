"use client";
import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleShorten = async () => {
    try {
      const res = await fetch('http://localhost:3001/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl }),
      });

      const data = await res.json();

      if (res.ok) {
        setShortUrl(data.shortUrl);
        setError('');
      } else {
        setError(data.error || 'Something went wrong');
        setShortUrl('');
      }
    } catch (err) {
      setError('Server error');
      setShortUrl('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom align="center">
        🔗 URL Shortener
      </Typography>

      <TextField
        label="Enter Long URL"
        variant="outlined"
        fullWidth
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" fullWidth onClick={handleShorten}>
        Shorten URL
      </Button>

      {shortUrl && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">✅ Shortened URL:</Typography>
          <Link href={shortUrl} target="_blank" rel="noopener" underline="hover">
            {shortUrl}
          </Link>
          <Button
            onClick={handleCopy}
            variant="outlined"
            size="small"
            sx={{ ml: 2 }}
          >
            Copy
          </Button>
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          ❌ {error}
        </Typography>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Short URL copied to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
}
