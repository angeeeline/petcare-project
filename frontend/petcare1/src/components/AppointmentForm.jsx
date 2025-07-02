// src/components/AppointmentForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { createAppointment } from '../api/appointment';
import './AppointmentForm.css';
import { Link } from 'react-router-dom';

const AppointmentForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    petName: '',
    date: '',
    time: '',
    serviceType: '',
    status: 'Pending',
    notes: '',
    ownerId: null // ✅ Add ownerId
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true); // default true to avoid flicker

  useEffect(() => {
    const user = localStorage.getItem('petOwner');
    if (!user) {
      setIsAuthenticated(false);
      return;
    }

    const parsedUser = JSON.parse(user);
    setFormData((prev) => ({
      ...prev,
      ownerId: parsedUser.id, // ✅ set ownerId from localStorage
    }));
  }, []);

  const handleSubmit = async () => {
  try {
    if (!formData.ownerId) {
      alert('Owner ID missing. Please log in again.');
      return;
    }

    await createAppointment({
      ...formData,
      owner: { id: formData.ownerId } // ✅ Wrap ownerId into an object
    });

    alert('Appointment created successfully!');
    if (onSuccess) onSuccess();
  } catch (err) {
    console.error(err);
    alert('Failed to submit appointment.');
  }
};

  return (
    <Paper elevation={4} className="appointment-container">
      <Box className="appointment-header">
        <Typography variant="h6">
          {isAuthenticated ? 'Add Appointment' : 'Access Denied'}
        </Typography>
        <Button sx={{ color: 'white' }} onClick={onClose}>
          Close ✕
        </Button>
      </Box>

      {!isAuthenticated ? (
        <Box className="appointment-body" sx={{ textAlign: 'center', padding: '2rem' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You need to <strong>Sign Up or Log In</strong> to book an appointment.
          </Typography>
          <Button variant="contained" onClick={() => {
            onClose();
            window.location.href = '/signup';
          }}>
            Go to Sign Up
          </Button>
        </Box>
      ) : (
        <Box className="appointment-body">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <InputLabel className="input-label">Pet Name</InputLabel>
              <TextField
                fullWidth
                value={formData.petName}
                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                placeholder="e.g. Max"
              />

              <Box mt={3}>
                <InputLabel className="input-label">For when</InputLabel>
                <TextField
                  type="date"
                  fullWidth
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </Box>

              <Box mt={3}>
                <InputLabel className="input-label">Service</InputLabel>
                <Select
                  fullWidth
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                >
                  <MenuItem value="Grooming">Grooming</MenuItem>
                  <MenuItem value="Vaccination">Vaccination</MenuItem>
                  <MenuItem value="Check-up">Check-up</MenuItem>
                </Select>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel className="input-label">Time</InputLabel>
              <Select
                fullWidth
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              >
                <MenuItem value="10:00">10AM - 12PM</MenuItem>
                <MenuItem value="13:00">1PM - 2PM</MenuItem>
                <MenuItem value="14:00">2PM - 4PM</MenuItem>
                <MenuItem value="16:00">4PM - 6PM</MenuItem>
              </Select>

              <Box mt={3}>
                <InputLabel className="input-label">Notes</InputLabel>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special instructions?"
                />
              </Box>
            </Grid>
          </Grid>

          <Box className="appointment-footer">
            <Button variant="outlined" color="inherit" onClick={onClose}>Cancel</Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>Confirm</Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default AppointmentForm;
