import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const AboutUs = () => {
    
    return(
    <div className="app">
      <Header />
      

      <section className="hero">
        <div className="hero-content">
          <h1>Compassionate Care for Your<br />Furry Family</h1>
          <p>
            From grooming and wellness to boarding <br />
            and adoptions we offer everything your pet needs <br />
            under one roof.
          </p>
          <button className="book-now" onClick={goToAppointment}>Book Now</button>
        </div>
        <div className="hero-image" />
      </section>

      

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    <Footer />
    </div>
    )
};

export default AboutUs;