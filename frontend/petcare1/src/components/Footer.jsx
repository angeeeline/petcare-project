// components/Footer.jsx
import React from 'react';
import logo from '/src/assets/fetch_and_fur_logo1.png';

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        background: '#d47636',
        color: 'white',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <img src={logo} width={250} height={60} alt="Logo" />
      <p>by FazCo</p>
      <p>Nuable St. Bonafide, Kal City, 4000 Cebu</p>
      <p>📞 1234-456-7890 | 📱 123-456-7890</p>
      <div>🌐 📘 🐦 📸</div>
      <div style={{ marginTop: '1rem' }}>
        <a href="#">ABOUT US</a> | <a href="#">CONTACT US</a> |{' '}
        <a href="#">HELP</a> | <a href="#">PRIVACY POLICY</a> |{' '}
        <a href="#">FAQS</a>
      </div>
      <p style={{ marginTop: '1rem' }}>© 2025 Fetch & Fur</p>
    </footer>
  );
};

export default Footer;
