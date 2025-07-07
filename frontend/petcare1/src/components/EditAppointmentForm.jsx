// src/components/EditAppointmentForm.jsx
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
  Paper,
} from '@mui/material';
import './AppointmentForm.css';
import { updateAppointment } from '../api/appointment'; // make sure this function exists

const EditAppointmentForm = ({ appointment, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    id: '',
    petName: '',
    date: '',
    time: '',
    serviceType: '',
    notes: '',
    owner: { id: null },
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        id: appointment.id,
        petName: appointment.petName,
        date: appointment.date,
        time: appointment.time,
        serviceType: appointment.serviceType,
        notes: appointment.notes || '',
        owner: { id: appointment.owner.id },
      });
    }
  }, [appointment]);

  const handleSubmit = async () => {
    try {
      await updateAppointment(formData.id, formData);
      alert('Appointment updated successfully!');
      onSuccess?.(); // callback to refresh appointments
      
    } catch (err) {
      console.error(err);
      alert('Failed to update appointment.');
    }
  };

  return (
    <Paper elevation={4} className="appointment-container">
      <Box className="appointment-header">
        <Typography variant="h6">Edit Appointment</Typography>
        <Button sx={{ color: 'white' }} onClick={onClose}>
          Close ✕
        </Button>
      </Box>

      <Box className="appointment-body">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <InputLabel className="input-label">Pet Name</InputLabel>
            <TextField
              fullWidth
              value={formData.petName}
              onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
            />

            <Box mt={3}>
              <InputLabel className="input-label">Date</InputLabel>
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
          <Button className="custom-button outlined" onClick={onClose}>Cancel</Button>
          <Button className="custom-button contained" onClick={handleSubmit}>Save Changes</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EditAppointmentForm;
