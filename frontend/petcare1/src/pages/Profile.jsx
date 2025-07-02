import React, { useState, useEffect } from 'react';
import './Profile.css';
import { TextField, Button, MenuItem, Modal, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import PetRegisterForm from '../components/PetRegisterForm';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [petOwnerId, setPetOwnerId] = useState(null);
  const [registerOpen, setPetRegisterOpen] = useState(false);
  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const [pets, setPets] = useState([]); // ✅ Now empty, fetched from backend
  const [history, setHistory] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem('petOwner'));
  const email = storedUser?.email;

  useEffect(() => {
    if (!email) {
      alert('You must be logged in to view this page.');
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:8080/api/petowners/email/${email}`)
      .then((res) => {
        const data = res.data;
        setProfile({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
        });
        setPetOwnerId(data.id);

        // ✅ Fetch appointments
        axios.get(`http://localhost:8080/api/appointments/owner/${data.id}`)
          .then((res) => setHistory(res.data));

        // ✅ Fetch pets
        axios.get(`http://localhost:8080/api/pets/owner/${data.id}`)
          .then((res) => setPets(res.data))
          .catch(() => console.error('Could not load pets.'));
      })
      .catch(() => {
        alert('PetOwner not found or appointments could not be loaded!');
      });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put(`http://localhost:8080/api/petowners/${petOwnerId}`, profile)
      .then(() => {
        alert('Profile updated!');
        setIsEditing(false);
      })
      .catch(() => alert('Failed to update profile'));
  };

  const handleUpdate = (id, oldData) => {
    const newDate = prompt('Enter new date (YYYY-MM-DD):', oldData.date);
    if (newDate) {
      axios.put(`http://localhost:8080/api/appointments/${id}`, { ...oldData, date: newDate })
        .then(() => {
          alert('Appointment updated');
          axios.get(`http://localhost:8080/api/appointments/owner/${petOwnerId}`)
            .then((res) => setHistory(res.data));
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      axios.delete(`http://localhost:8080/api/appointments/${id}`)
        .then(() => {
          alert('Appointment cancelled');
          setHistory((prev) => prev.filter((item) => item.id !== id));
        });
    }
  };

  return (
    <>
      <Header />

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="/Pictures/1.png" alt="avatar" />
          </div>
          <div>
            <h3>{profile.firstname} {profile.lastname}</h3>
            <p>{profile.email}</p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Button variant="contained" onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}>
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </div>
        </div>

        <div className="profile-details">
          <div className="left-fields">
            <TextField
              fullWidth
              label="First Name"
              name="firstname"
              value={profile.firstname}
              onChange={handleChange}
              disabled={!isEditing}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastname"
              value={profile.lastname}
              onChange={handleChange}
              disabled={!isEditing}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              margin="normal"
            />

            <div className="pets-box">
              <h4>My Pets</h4>
              {pets.length === 0 ? (
                <p>No pets registered.</p>
              ) : (
                pets.map(pet => (
                  <div key={pet.id} className="pet-card">
                    <h3>{pet.name}</h3>
                    <p>Breed: {pet.breed}</p>
                    <p>Age: {pet.age}</p>
                    {/* Add more pet details as needed */}
                  </div>
                ))
              )}

              <Button onClick={() => setPetRegisterOpen(true)} className="add-pet-btn" variant="outlined">+ Add/Register Your Pet</Button>
            </div>
          </div>

          <div className="right-fields">
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!isEditing}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={true}
              margin="normal"
            />

            <div className="history-box">
              <h4>Appointment History</h4>
              {history.length === 0 ? (
                <p>No appointments found.</p>
              ) : (
                history.map((log, i) => (
                  <div key={i} className="history-entry">
                    <div><strong>{log.petName}</strong> - {log.serviceType}</div>
                    <div>{log.date} at {log.time}</div>
                    <div>Status: {log.status}</div>
                    <Button size="small" onClick={() => handleUpdate(log.id, log)} variant="outlined">
                      Edit
                    </Button>
                    <Button size="small" color="error" onClick={() => handleDelete(log.id)} variant="outlined">
                      Cancel
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pet Modal */}
      <Modal open={registerOpen} onClose={() => setPetRegisterOpen(false)}>
        <Box className="appointment-wrapper">
          <PetRegisterForm
            petOwnerId={petOwnerId}
            onClose={() => setPetRegisterOpen(false)}
            onSuccess={() => {
              setPetRegisterOpen(false);
              axios.get(`http://localhost:8080/api/pets/owner/${petOwnerId}`)
                .then((res) => setPets(res.data))
                .catch(() => console.error('Could not refresh pets list.'));
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
