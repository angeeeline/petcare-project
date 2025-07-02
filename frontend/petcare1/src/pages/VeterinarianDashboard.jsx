import React from 'react';
import './VeterinarianDashboard.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Header from '../components/Header';
import VetAppointmentList from '../components/VetAppointmentList'; // ✅ Make sure this path is correct
 
const VeterinarianDashboard = () => {
  const navigate = useNavigate();
 
  return (
 
    <div className="vet-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">VetCare</div>
        <nav>
          <ul>
            <li className="active">Profile</li>
            <li>Availability</li>
            <li>Appointments</li>
          </ul>
        </nav>
        <div className="logout">
          <Button variant="outlined" color="error" onClick={() => navigate('/')}>
            Logout
          </Button>
        </div>
      </aside>
 
      {/* Main Content */}
      <main className="main-content">
        <h1>Welcome, Veterinarian!</h1>
        <p>This is your dashboard. View and manage your appointments below.</p>
 
        {/* Appointment List */}
        <VetAppointmentList />
 
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button variant="contained" onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </main>
    </div>
   
  );
};
 
export default VeterinarianDashboard;