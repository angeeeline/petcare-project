import React, { useEffect, useState } from "react";
import { getAdoptions } from "../api/adoption";
import "./Adoption.css";

const Adoption = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdoptions().then(data => {
      setAdoptions(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading adoption list...</div>;

  return (
    <div className="adoption-list">
      <h2>Adoptable Pets</h2>
      <ul>
        {adoptions.map(pet => (
          <li key={pet.id}>
            <h3>{pet.name}</h3>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age}</p>
            <p>Description: {pet.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Adoption; 