import React, { useEffect, useState } from 'react';
import './VeterinarianDashboard.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VetAppointmentList from '../components/VetAppointmentList';
import logo from '/src/assets/fetch_and_fur_logo1.png';

const VeterinarianDashboard = () => {
  const navigate = useNavigate();
  const [vetName, setVetName] = useState({});

  useEffect(() => {
  const storedVet = localStorage.getItem('veterinarian');
  console.log('Stored vet:', storedVet); // ✅ Debug log
  if (storedVet) {
    setVetName(JSON.parse(storedVet));
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
          <div className="vet-name">{vetName.lastname}</div>
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
        <h1>Welcome, To your Dashboard!</h1>
        <p>This is your dashboard. View and manage your appointments below.</p>

        <VetAppointmentList />

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
