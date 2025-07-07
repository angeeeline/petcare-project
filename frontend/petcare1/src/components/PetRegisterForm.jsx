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
import { createPet } from '../api/pet'; 
const PetRegisterForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    petname: '',
    type: '',
    weight: '',
    breed: '',
    notes: '',
    ownerId: null,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('petOwner');
    if (!user) {
      setIsAuthenticated(false);
      return;
    }

    const parsedUser = JSON.parse(user);
    setFormData((prev) => ({
      ...prev,
      ownerId: parsedUser.id,
    }));
  }, []);

  const handleSubmit = async () => {
  try {
    if (!formData.ownerId) {
      alert('Owner ID missing. Please log in again.');
      return;
    }

    const { petname, type, weight, breed } = formData;

    if (!petname || !type || !weight || !breed) {
      alert('All fields are required.');
      return;
    }

    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum < 0) {
      alert('Please enter a valid non-negative weight.');
      return;
    }

    await createPet({
      petname,
      type,
      weight: weightNum,
      breed,
      notes: formData.notes,
      petOwner: { id: formData.ownerId },
    });

    alert('Pet registered successfully!');
    onSuccess?.();
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert('Failed to register pet.');
  }
};

  return (
    <Paper elevation={4} className="appointment-container">
      <Box className="appointment-header">
        <Typography variant="h6">
          {isAuthenticated ? 'Add Pet' : 'Access Denied'}
        </Typography>
        <Button sx={{ color: 'white' }} onClick={onClose}>
          Close ✕
        </Button>
      </Box>

      {!isAuthenticated ? (
        <Box className="appointment-body" sx={{ textAlign: 'center', padding: '2rem' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You need to <strong>Sign Up or Log In</strong> to register a pet.
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
                value={formData.petname}
                onChange={(e) => setFormData({ ...formData, petname: e.target.value })}
                placeholder="e.g. Buddy"
              />

              <Box mt={3}>
                <InputLabel className="input-label">Type</InputLabel>
                <Select
                  fullWidth
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <MenuItem value="Dog">Dog</MenuItem>
                  <MenuItem value="Cat">Cat</MenuItem>
                  <MenuItem value="Bird">Bird</MenuItem>
                  <MenuItem value="Reptile">Reptile</MenuItem>
                </Select>
              </Box>

              <Box mt={3}>
                <InputLabel className="input-label">Weight (kg)</InputLabel>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.weight}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
                      setFormData({ ...formData, weight: value });
                    }
                  }}
                  placeholder="eg. 1.5"
                  slotProps={{
                    input: {
                      min: 0,
                      step: '0.01',
                    },
                  }}
                />
              </Box>


            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel className="input-label">Breed</InputLabel>
              <TextField
                fullWidth
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                placeholder="e.g. Labrador"
              />

              
            </Grid>
          </Grid>

          <Box className="appointment-footer">
            <Button className="custom-button outlined" onClick={onClose}>Cancel</Button>
            <Button className="custom-button contained" onClick={handleSubmit}>Confirm</Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default PetRegisterForm;
