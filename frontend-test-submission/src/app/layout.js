import React from 'react';
import { CssBaseline } from '@mui/material';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
