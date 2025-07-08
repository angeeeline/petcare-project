import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AboutUs.css';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  const goToAppointment = () => {
    navigate('/appointment');
  };

  return (
    <div className="about-page">
      <Header />

      <section className="about-hero">
        <div className="about-hero-text">
          <h1>Compassionate Care for Your Furry Family</h1>
          <p>
            From grooming and wellness to boarding and adoptions,<br />
            we offer everything your pet needs under one roof.
          </p>
          <button className="book-now" onClick={goToAppointment}>
            Book Now
          </button>
        </div>
        <div className="about-hero-img" />
      </section>

      <section className="about-section light">
        <div className="about-content">
          <img src="./Pictures/7.png" alt="Vet care" />
          <div>
            <h2>We’re More Than a Clinic</h2>
            <p>
              We’re a community of pet lovers. Our mission is to deliver expert, personalized care
              for pets of all shapes and sizes. Whether it’s a routine check-up, a grooming session,
              or emergency care, we’re here with compassionate service.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-content reverse">
          <div>
            <h2>Why Choose Us?</h2>
            <ul>
              <li>✓ Trusted by thousands of pet parents</li>
              <li>✓ Expert veterinarians and groomers</li>
              <li>✓ Convenient booking and digital records</li>
              <li>✓ Safe, clean, and welcoming environment</li>
            </ul>
          </div>
          <img src="./Pictures/5.png" alt="Happy pet" />
        </div>
      </section>

      <section className="about-section light">
        <div className="about-content">
          <img src="./Pictures/6.png" alt="Pet adoption" />
          <div>
            <h2>Adopt. Love. Repeat.</h2>
            <p>
              Our adoption programs help furry friends find forever homes. Partnering with local
              shelters, we ensure that every pet gets a loving family and the care they deserve.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
