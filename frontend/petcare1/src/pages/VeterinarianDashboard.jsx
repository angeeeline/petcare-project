import React, { useEffect, useState } from 'react';
import './VeterinarianDashboard.css';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Paper, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import logo from '/src/assets/fetch_and_fur_logo1.png';

const VeterinarianDashboard = () => {
  const navigate = useNavigate();
  const [vetData, setVetData] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedVet = localStorage.getItem('veterinarian');
    if (storedVet) {
      const parsedVet = JSON.parse(storedVet);
      setVetData(parsedVet);

      // Fetch appointments assigned to this veterinarian
      axios
        .get('http://localhost:8080/api/veterinarians')
        .then((res) => setAppointments(res.data))
        .catch((err) => console.error('Failed to fetch vet appointments:', err));
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div className="vet-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <img src={logo} alt="Fetch and Fur Logo" className="dashboard-logo" />
        </div>

        <div className="profile-section">
          <AccountCircleIcon style={{ fontSize: 48 }} />
          <div className="vet-name">{vetData?.lastname || ''}</div>
        </div>

        <nav>
          <ul>
            <li className="active">Manage Schedule</li>
            <li>Appointments</li>
          </ul>
        </nav>

        <div className="logout">
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              localStorage.removeItem('veterinarian');
              localStorage.removeItem('user');
              window.dispatchEvent(new Event('storageChange'));
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Welcome, Dr. {vetData?.lastname || ''}</h1>
        <p>This is your dashboard. View and manage your appointments below.</p>

        <Box className="appointments-section">
          <Typography variant="h5" gutterBottom>
            Your Appointments
          </Typography>

          {appointments.length === 0 ? (
            <Typography>No appointments assigned to you yet.</Typography>
          ) : (
            appointments.map((appt) => (
              <Paper key={appt.id} elevation={3} className="appointment-card">
                <Typography><strong>Pet:</strong> {appt.pet?.petname}</Typography>
                <Typography><strong>Owner:</strong> {appt.owner?.firstname} {appt.owner?.lastname}</Typography>
                <Typography><strong>Date:</strong> {appt.date} at {appt.time}</Typography>
                <Typography><strong>Service:</strong> {appt.serviceType}</Typography>
                <Typography><strong>Status:</strong> {appt.status}</Typography>
                {appt.notes && (
                  <Typography><strong>Notes:</strong> {appt.notes}</Typography>
                )}
              </Paper>
            ))
          )}
        </Box>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Return Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default VeterinarianDashboard;
