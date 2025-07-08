// TreatmentList.jsx
import React, { useState } from 'react';
import './TreatmentList.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TreatmentModal from '../components/TreatmentModal';

const treatmentData = [
  {
    title: 'Canine Parvovirus',
    category: 'Infectious Disease',
    pets: 'Dogs (especially puppies)',
    price: '$200 - $500'
  },
  {
    title: 'Feline Leukemia Virus',
    category: 'Viral Infection',
    pets: 'Cats (especially outdoor cats)',
    price: '$100 - $300'
  },
  {
    title: 'Heartworm Treatment Protocol',
    category: 'Parasitic Disease',
    pets: 'Dogs',
    price: '$500 - $1000'
  },
  {
    title: 'Rabies Post-Exposure Management',
    category: 'Emergency Protocol',
    pets: 'Dogs, Cats, Humans',
    price: '$45 - $150'
  },
  {
    title: 'Nutritional Management in Kidney Disease',
    category: 'Chronic Disease',
    pets: 'Cats, Dogs (older age)',
    price: '$50 - $200'
  },
  {
    title: 'Deworming Schedule for Puppies',
    category: 'Preventive Care',
    pets: 'Puppies',
    price: '$20 - $60'
  },
  {
    title: 'Spaying/Neutering Surgery',
    category: 'Surgical Procedure',
    pets: 'Dogs, Cats',
    price: '$100 - $400'
  },
  {
    title: 'Tick and Flea Prevention',
    category: 'Parasite Control',
    pets: 'Dogs, Cats',
    price: '$30 - $90'
  },
  {
    title: 'Vaccination Protocols for Kittens',
    category: 'Preventive Care',
    pets: 'Kittens',
    price: '$50 - $150'
  },
  {
    title: 'Dental Scaling and Cleaning',
    category: 'Dental Care',
    pets: 'Dogs, Cats',
    price: '$100 - $300'
  },
  {
    title: 'Allergy Testing and Management',
    category: 'Allergy',
    pets: 'Dogs',
    price: '$150 - $500'
  },
  {
    title: 'Canine Distemper Treatment',
    category: 'Viral Infection',
    pets: 'Dogs',
    price: '$200 - $600'
  },
  {
    title: 'Giardia Infection Protocol',
    category: 'Protozoal Infection',
    pets: 'Dogs, Cats',
    price: '$60 - $200'
  },
  {
    title: 'Bladder Stone Surgery',
    category: 'Surgical Procedure',
    pets: 'Dogs, Cats',
    price: '$500 - $1500'
  },
  {
    title: 'Ear Mite Treatment',
    category: 'Parasitic Infection',
    pets: 'Cats, Dogs',
    price: '$25 - $70'
  },
  {
    title: 'Pancreatitis Management',
    category: 'Internal Medicine',
    pets: 'Dogs, Cats',
    price: '$300 - $800'
  },
  {
    title: 'Arthritis Management in Senior Dogs',
    category: 'Orthopedic',
    pets: 'Senior Dogs',
    price: '$100 - $400'
  },
  {
    title: 'Feline Asthma Treatment',
    category: 'Respiratory',
    pets: 'Cats',
    price: '$100 - $300'
  },
  {
    title: 'Tumor Removal Surgery',
    category: 'Oncology',
    pets: 'Dogs, Cats',
    price: '$700 - $2000'
  },
  {
    title: 'Cataract Surgery for Dogs',
    category: 'Ophthalmology',
    pets: 'Dogs',
    price: '$1000 - $3000'
  }
];

const TreatmentList = () => {
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  return (
    <div className="treatment-wrapper">
      <Header />

      <div className="treatment-hero">
        <h1>Evidence-Based Veterinary Treatment List</h1>
        <p>
          The following list includes reviewed veterinary treatment protocols curated from
          professional organizations, journals, and global best practices.
        </p>
      </div>

      <div className="treatment-container">
        <div className="treatment-grid">
          {treatmentData.map((item, idx) => (
            <div
              className="treatment-card"
              key={idx}
              onClick={() => setSelectedTreatment(item)}
            >
              <h3>{item.title}</h3>
              <p className="treatment-category">{item.category}</p>
              <span className="read-more">View Details →</span>
            </div>
          ))}
        </div>
      </div>

      <TreatmentModal
        open={!!selectedTreatment}
        treatment={selectedTreatment}
        onClose={() => setSelectedTreatment(null)}
      />

      <Footer />
    </div>
  );
};

export default TreatmentList;