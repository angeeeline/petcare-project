import React, { useState } from 'react';

const Appointment = () => {
    const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const goToAppointment = () => {
    navigate('/appointment');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToShop = () => {
    navigate('/shop'); 

  };

  const handleClose = () => {
    setOpen(false);
  };

    return(<div className="app">
      
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

      

      <footer className="footer">
        <div className="footer-brand">
          <h2><span className="brand-bold">Fetch</span>&<span className="brand-light">Fur</span></h2>
          <p>by FazCo</p>
        </div>
        <div className="footer-info">
          <p>Nuable St. Bonafide, Kal City, 4000 Cebu</p>
          <p>📞 1234-456-7890 | 📱 123-456-7890</p>
          <div className="social-icons">🌐 📘 🐦 📸</div>
        </div>
        <div className="footer-links">
          <a href="#">ABOUT US</a>
          <a href="#">CONTACT US</a>
          <a href="#">HELP</a>
          <a href="#">PRIVACY POLICY</a>
          <a href="#">FAQS</a>
        </div>
        <p className="copyright">
          Copyright © 2025 Fetch & Fur
        </p>
      </footer>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>)
};

export default AboutUs;