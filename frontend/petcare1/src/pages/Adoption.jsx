import React, { useEffect, useState } from "react";
import "./Adoption.css";
import Header from "../components/Header";
import { getAdoptions } from "../api/adoption";

const Adoption = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getAdoptions()
      .then((data) => setPets(data))
      .catch((error) => console.error("Failed to load pets", error));
  }, []);

  return (
    <div>
      <Header />
      <div className="adoption-container">
        <h1 className="adoption-title">Find Your New Best Friend</h1>
        <div className="adoption-grid">
          {pets.map((pet) => (
            <div key={pet.id} className="adoption-card">
              <img src={pet.imageUrl} alt={pet.name} className="adoption-image" />
              <div className="adoption-info">
                <h3>{pet.name}</h3>
                <p>{pet.breed} • {pet.age} years old</p>
                <p>{pet.description}</p>
                <button className="adopt-button">Adopt</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adoption;
