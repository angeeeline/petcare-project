// Shop.jsx
import React, { useState } from 'react';
import './Shop.css';
import Header from '../components/Header';
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Container,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import logo from '/src/assets/fetch_and_fur_logo1.png';

const categories = [
  'Antibiotics', 'Vitamins & Supplements', 'Flea & Worm Treatment',
  'Ear & Eye Care', 'Skin & Coat Care', 'Joint & Mobility Support',
  'Dental Care Products', 'Calming Aids',
];

const generateProducts = (category) => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `${category}-${i + 1}`,
    title: `${category} Item ${i + 1}`,
    price: `$${(Math.random() * 30 + 10).toFixed(2)}`,
    description: `Top quality ${category.toLowerCase()} for your pet's needs.`,
    category,
    image: `https://place-puppy.com/30${i % 10}x30${i % 10}`,
  }));
};

const allProducts = categories.flatMap(generateProducts);

const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('Vitamins & Supplements');
  const navigate = useNavigate();

  const filteredProducts = selectedCategory
    ? allProducts.filter((p) => p.category === selectedCategory)
    : allProducts;

  const productChunks = chunkArray(filteredProducts, 6);

  const goTo = (route) => navigate(route);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="shop-wrapper">
      <Header />

      {/* Hero Slider */}
      <Box className="carousel-section" sx={{ mt: 4 }}>
        <Container maxWidth="md">
          <Slider {...sliderSettings}>
            <div>
              <Box
                sx={{
                  height: 300,
                  background: 'url(/Pictures/1.png) center/cover',
                  borderRadius: '16px',
                }}
              />
            </div>
            <div>
              <Box
                sx={{
                  height: 300,
                  background: 'url(https://place-puppy.com/600x300) center/cover',
                  borderRadius: '16px',
                }}
              />
            </div>
          </Slider>
        </Container>
      </Box>

      {/* Categories */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h5" gutterBottom>Browse by Category</Typography>
        <Box className="category-icons">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'contained' : 'outlined'}
              sx={{ m: 1, textTransform: 'none' }}
              onClick={() => setSelectedCategory(cat)}
            >
              🐾 {cat}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Product Carousel (6 per page) */}
      <Container sx={{ py: 6 }}>
        <Slider {...sliderSettings}>
          {productChunks.map((chunk, index) => (
            <Box key={index} sx={{ px: 2 }}>
              <Grid container spacing={4}>
                {chunk.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card sx={{ display: 'flex', height: 160 }}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.title}
                        sx={{ width: 120 }}
                      />
                      <CardContent>
                        <Typography variant="h6">{product.title}</Typography>
                        <Typography variant="body2">{product.description}</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1 }}>
                          {product.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Slider>
      </Container>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-brand">
          <img src={logo} width={250} height={60} alt="Logo"/>
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
    </div>
  );
};

export default Shop;
