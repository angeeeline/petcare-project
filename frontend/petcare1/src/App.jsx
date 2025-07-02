import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import {
  Button,
  Backdrop,
  CircularProgress,
  Modal
} from '@mui/material';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Shop from './pages/Shop';
import AppointmentList from './pages/AppointmentList';
import Veterinarian from './pages/Veterinarians';
import VetDashboard from './pages/VeterinarianDashboard';

import Header from './components/Header';
import AppointmentForm from './components/AppointmentForm';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';

import logo from '/src/assets/fetch_and_fur_logo1.png';



function Home({ setAppointmentOpen }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="app">
      <Header setAppointmentOpen={setAppointmentOpen} />

      <div className="container">
        {/* HERO */}
        <section style={{ backgroundColor: '#FFF3E0', padding: '4rem 2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '700' }}>
            100% Committed to Your Pet’s Health
          </h1>
          <p style={{ fontSize: '1.2rem', margin: '1rem auto', maxWidth: '600px' }}>
            With vet-backed products, guidance, and rewards—we’re here to support your pet’s health in every way we can.
          </p>
          <Button variant="contained" onClick={() => setAppointmentOpen(true)} sx={{ mr: 2 }}>
            Book an Appointment
          </Button>
          <Button variant="outlined" onClick={() => navigate('/shop')}>Shop now</Button>
        </section>

        {/* FEATURES + LIBRELA */}
        <section style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '3rem 1rem',
          gap: '2rem',
          background: '#E3F2FD'
        }}>
          {/* Card 1 */}
          <div
            className="hover-card"
            style={{
              backgroundImage: 'url("public/pictures/gettoknowyourvet.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '10px',
              width: '400px',
              height: '300px',
              position: 'relative',
              cursor: 'pointer'
            }}
          >
             

            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '200px',
              color: 'black',
              padding: '1rem',
              borderRadius: '10px'
            }}>
              <h3>Meet the Protectors</h3>
              <p>Get to know your furry babies' Veterinarians!</p>
              
               <Button variant="contained" onClick={() => navigate('/veterinarians')}>Veterinarian</Button>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="hover-card"
            style={{
              backgroundImage: 'url("public/pictures/knowyourpet.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '10px',
              width: '300px',
              height: '300px',
              position: 'relative',
              cursor: 'pointer'
            }}
          >
            <div style={{
              position: 'absolute',
              bottom: '200px',
              left: '20px',
              color: 'black',
              padding: '1rem',
              borderRadius: '10px'
            }}>
              <h4>Learn more about your pet's Health & Treatments!</h4>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <h2>Services We Offer!</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            marginTop: '2rem'
          }}>
            {[
              {
                title: 'Pet Grooming',
                img: 'public/Pictures/service1.png',
                desc: 'Reveal expert insights.',
                link: '/health-quizzes'
              },
              {
                title: 'Adoption',
                img: 'public/Pictures/service2.png',
                desc: 'Download trusted resources.',
                link: '/vet-resources'
              },
              {
                title: 'Medical Services',
                img: 'public/Pictures/service3.png',
                desc: 'Explore pet care articles.',
                link: '/blog'
              }
            ].map((card, i) => (
              <div
                key={i}
                onClick={() => navigate(card.link)}
                className="hover-card"
                style={{
                  width: 300,
                  height: 250,
                  backgroundImage: `url(${card.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '12px',
                  padding: '1rem',
                  color: 'Black',
                  position: 'relative',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                <div style={{ padding: '0.5rem 1rem' }}>
                  <h4 style={{ margin: 0 }}>{card.title}</h4>
                  <p style={{ margin: '0.3rem 0' }}>{card.desc}</p>
                  <p style={{ fontWeight: 600 }}>Learn More →</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section style={{
          background: '#FFF3E0',
          padding: '4rem 2rem',
          textAlign: 'center',
          borderRadius: '12px',
          margin: '3rem auto',
          maxWidth: '1000px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#6A4E42', marginBottom: '1rem' }}>
            Interested in Saving People’s Fur Babies?
          </h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem', color: '#5C4033' }}>
            Join our growing network of compassionate veterinarians and make a difference every day.
          </p>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FF6F00',
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#fff',
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#e65c00' }
            }}
            onClick={() => navigate('/signup')}
          >
            Register as Vet
          </Button>
        </section>

        {/* RECOMMENDED */}
        <section style={{ padding: '3rem 2rem', background: '#ffffff' }}>
          <h2 style={{ textAlign: 'center' }}>Recommended for You</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginTop: '2rem'
          }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                onClick={() => navigate(`/tip/${i}`)}
                className="hover-card"
                style={{
                  width: 220,
                  textAlign: 'center',
                  background: '#fff',
                  borderRadius: '10px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: '0.3s'
                }}
              >
                <img src={`/img/reco${i}.png`} alt={`Reco ${i}`} style={{ width: '100%', borderRadius: '8px' }} />
                <p>Recommended Tip {i}</p>
                <p style={{ color: '#1976d2', fontWeight: 500 }}>Read More →</p>
              </div>
            ))}
          </div>
          
        </section>
        <Footer />
        
      </div>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

function App() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <Router>
      <Modal open={appointmentOpen} onClose={() => setAppointmentOpen(false)}>
        <div style={{ outline: 'none' }}>
          <AppointmentForm
            onClose={() => setAppointmentOpen(false)}
            onSuccess={() => {
              setAppointmentOpen(false);
              window.location.href = '/profile';
            }}
          />
        </div>
      </Modal>

      <Routes>
        <Route path="/" element={<Home setAppointmentOpen={setAppointmentOpen} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/veterinarians" element={<Veterinarian />} />
        <Route path="/vet-dashboard" element={<VetDashboard />} />


        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointments-list"
          element={
            <PrivateRoute>
              <AppointmentList />
            </PrivateRoute>
          }
        />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;
