import React from 'react';
import { Alert, Button, Typography, Box, Paper } from '@mui/material';
import './AppointmentForm.css'; // Reuse the same styles

const Alerts = ({ open, severity, message, onClose }) => {
  if (!open) return null;

  return (
    <Box className="appointment-wrapper">
      <Paper elevation={4} className="appointment-container">
        <Box className="appointment-header">
          <Typography variant="h6">{severity === 'success' ? 'Success' : 'Notification'}</Typography>
          <Button sx={{ color: 'white' }} onClick={onClose}>Close ✕</Button>
        </Box>

        <Box className="appointment-body">
          <Alert severity={severity} variant="filled" sx={{ width: '100%', fontSize: '1rem' }}>
            {message}
          </Alert>
        </Box>
      </Paper>
    </Box>
  );
};

export default Alerts;
