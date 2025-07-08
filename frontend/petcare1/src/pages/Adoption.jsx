// Adoption.jsx
import React, { useState } from 'react';
import './Adoption.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';

const petList = [
  { id: 1, name: 'Milo', type: 'Dog', color: 'Brown', image: './Pictures/dog4.png' },
  { id: 2, name: 'Whiskers', type: 'Cat', color: 'White', image: './Pictures/cat1.png' },
  { id: 3, name: 'Ziggy', type: 'Reptile', color: 'Green', image: './Pictures/rep1.png' },
  { id: 4, name: 'Luna', type: 'Cat', color: 'Black', image: './Pictures/cat2.png' },
  { id: 5, name: 'Rocky', type: 'Dog', color: 'Golden', image: './Pictures/dog5.png' },
  { id: 6, name: 'Spike', type: 'Reptile', color: 'Tan', image: './Pictures/rep3.png' },
  { id: 7, name: 'Snowy', type: 'Cat', color: 'Gray', image: './Pictures/cat3.png' },
  { id: 8, name: 'Bruno', type: 'Dog', color: 'Black & Tan', image: './Pictures/dog6.png' },
  { id: 9, name: 'Tango', type: 'Reptile', color: 'Green', image: './Pictures/rep2.png' },
  { id: 10, name: 'Mimi', type: 'Cat', color: 'Calico', image: './Pictures/cat4.png' },
];

const Adoption = () => {
  const [filter, setFilter] = useState('All');

  const filteredPets = filter === 'All' ? petList : petList.filter(p => p.type === filter);

  return (
    <div className="adoption-wrapper">
      <Header />
      <section className="adoption-hero">
        <h1>Adopt Your New Best Friend</h1>
        <p>Browse our collection of lovely pets waiting for a forever home.</p>
        <div className="filters">
          {['All', 'Dog', 'Cat', 'Reptile'].map(type => (
            <Chip
              key={type}
              label={type}
              variant={filter === type ? 'filled' : 'outlined'}
              color="primary"
              onClick={() => setFilter(type)}
              sx={{ m: 1 }}
            />
          ))}
        </div>
      </section>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {filteredPets.map((pet) => (
            <Grid item key={pet.id} xs={12} sm={6} md={4}>
              <Card className="pet-card">
                <CardMedia
                  component="img"
                  height="240"
                  image={pet.image}
                  alt={pet.name}
                />
                <CardContent>
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography variant="body2">Type: {pet.type}</Typography>
                  <Typography variant="body2">Color: {pet.color}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </div>
  );
};

export default Adoption;