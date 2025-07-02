import React from 'react';
import './TreatmentList.css';

const treatments = [
  { id: 1, name: 'Vaccination', description: 'Protects against diseases', price: '₱500' },
  { id: 2, name: 'Deworming', description: 'Removes intestinal worms', price: '₱300' },
  { id: 3, name: 'Spay/Neuter', description: 'Prevents unwanted litters', price: '₱2000' },
];

const TreatmentList = () => (
  <div className="treatment-list-container">
    <h1>Treatment List</h1>
    <table className="treatment-table">
      <thead>
        <tr>
          <th>Treatment</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {treatments.map(treatment => (
          <tr key={treatment.id}>
            <td>{treatment.name}</td>
            <td>{treatment.description}</td>
            <td>{treatment.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TreatmentList; 