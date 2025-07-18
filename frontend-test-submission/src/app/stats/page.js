'use client';
import React, { useEffect, useState } from 'react';
import StatsTable from '../../components/StatsTable';
import { Container, Typography } from '@mui/material';

export default function StatsPage() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to load stats:', err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        URL Statistics
      </Typography>
      <StatsTable stats={stats} />
    </Container>
  );
}
