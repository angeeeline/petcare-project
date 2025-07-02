import React from 'react';
import './Veterinarians.css';
import Header from '../components/Header';

const vets = [
  {
    name: 'Elaine Grace A. Torio, D.V.M.',
    specialty: 'Public Health',
    experience: '5 years',
    animals: 'Multiple Animals',
    clinic: 'Woodhouse Animal Clinic',
    location: 'Valenzuela City, Metro Manila',
    image: '/pictures/vet1.png',
  },
  {
    name: 'Lovelyn L. Sulit, D.V.M.',
    specialty: 'General Practice',
    experience: '2 years',
    animals: 'Multiple Animals',
    clinic: 'Iolac Animal Clinic and Grooming Center',
    location: 'Dasmariñas, Cavite',
    image: '/pictures/vet2.png',
  },
  {
    name: 'Gian Ato D. Canlas, D.V.M.',
    specialty: 'General Practice',
    experience: '11 years',
    animals: 'Multiple Animals',
    clinic: 'Provincial Government of Tarlac',
    location: 'Tarlac City, Tarlac',
    image: '/pictures/vet3.png',
  },
];

const Veterinarian = () => {
  return (
    <>
    <Header />
    <div className="vet-page">
      <h1>Our Trusted Veterinarians</h1>
      <div className="vet-cards">
        {vets.map((vet, index) => (
          <div className="vet-card" key={index}>
            <img src={vet.image} alt={vet.name} className="vet-img" />
            <h3>{vet.name}</h3>
            <p className="specialty">{vet.specialty}</p>
            <div className="tags">
              <span className="tag blue">{vet.experience}</span>
              <span className="tag yellow">{vet.animals}</span>
            </div>
            <p className="clinic">{vet.clinic}</p>
            <p className="location">{vet.location}</p>
            <p className="consult">➕ Face-to-face consultation</p>
            <button className="profile-btn">View Profile</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Veterinarian;
