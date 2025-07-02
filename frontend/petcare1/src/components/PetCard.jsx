import React from 'react';
import './PetCard.css';

const PetCard = ({ pet }) => {
  return (
    <div className="pet-card">
      <img src={pet.image} alt={pet.name} className="pet-image" />
      <h2>{pet.name}</h2>
      <p><strong>Age:</strong> {pet.age} years</p>
      <p><strong>Breed:</strong> {pet.breed}</p>
      <p>{pet.description}</p>
      <button className="adopt-btn">Adopt</button>
    </div>
  );
};

export default PetCard; 