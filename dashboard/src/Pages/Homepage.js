import React, { useState } from 'react';
import './Homepage.css'; 
import Menu from './Menu'
import Navbar from './Navbar';
import AboutImage from './AboutImage';
import { AppBar, Toolbar, IconButton, Typography, Container, Grid, Link, Paper } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const HomePage = () => {
  const slides = [
    { url: "http://localhost:3000/K-INT.jpg", title: "int1" },
    { url: "http://localhost:3000/k-int1.jpg", title: "int2" },
    { url: "http://localhost:3000/int2.png", title: "int3" },
    { url: "http://localhost:3000/int3.png", title: "int4" },
    { url: "http://localhost:3000/int4.png", title: "int5" },
  ];
  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };
  const [activeSection, setActiveSection] = useState('');
  const handleMenuClick = () => {
    window.location.href = "/menu1"; // Redirect to menu page on click
  };

  return (
    <div className="homepage">
      <header className="header">
        <Navbar />
      </header>

      <main className="main">
        <section className="hero">
          <img src="K-BG.jpg" alt="Delicious Japanese Food" className="hero-image" />
          <div className="hero-content">
            <h2>Welcome to Kan-Gei</h2>
            <p>Experience authentic Japanese cuisine in a modern and inviting setting.</p>
            <button onClick={handleMenuClick}>Explore Our Menu</button>
          </div>
        </section>

        <section id="about" className={activeSection === 'about' ? 'active' : ''}>
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      <div style={containerStyles}>
        <AboutImage slides={slides} parentWidth={500} />
      </div>
    </Grid>
    <Grid item xs={12} md={6}>
      <div>
        <h1>About Us</h1>
        <p>
          Welcome to Kangei, where the flavors of Japan come to life in the heart of Nueva Vizcaya. Our commitment is to deliver an authentic Japanese dining experience using only the freshest and highest-quality ingredients.
          <br /><br />
          Our menu boasts a diverse selection of traditional Japanese dishes crafted by our experienced chefs. From savory sushi rolls to comforting bowls of ramen, and crispy tempura to succulent yakitori, each dish is a celebration of Japan's culinary heritage.
          <br /><br />
          Whether you choose to dine-in, pick-up, or have your meal delivered, we are here to serve you. Our operating hours are as follows:
          <br /><br />
          <strong>Sunday:</strong> 11:00 AM – 10:00 PM
          <br />
          <strong>Monday:</strong> Closed
          <br />
          <strong>Tuesday - Saturday:</strong> 11:00 AM – 10:00 PM
        </p>
      </div>
    </Grid>
  </Grid>
</section>


        <section>
          <h1 id="menu" className={activeSection === 'menu' ? 'active' : ''}>Kan-Gei's Best</h1>
          <Menu />
        </section>

        <section id="location" className={activeSection === 'location' ? 'active' : ''}>
          <h2>Location</h2>
          <p>
            We are located at:
            <a href="https://www.google.com/maps/place/Kan+Gei/@16.5196305,121.1803335,18z/data=!4m9!1m2!2m1!1s+Cornwall+Bldg.,+Gen.+Santos+street+corner+Bonifacio+street+along+Community+Center,+Solano,+Philippines!3m5!1s0x339041721aef57fb:0x21e78fa89ef06516!8m2!3d16.5196304!4d121.182228!16s%2Fg%2F11vkd8c3wc?entry=ttu" target="_blank">
            50, Cornwall Bldg, General Santos St, Solano, 3709 Nueva Vizcaya
            </a>
          </p>
          <p>Come visit us and experience the taste of Japan!</p>
          
        </section>

       

      </main>

      <footer>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Container maxWidth="md">
              <Typography variant="body1" color="inherit">
                &copy; {new Date().getFullYear()} Kangei Restaurant
              </Typography>
              <Typography variant="body2" color="inherit">
                Follow us on social media:
              </Typography>
              <IconButton component={Link} href="https://www.facebook.com" target="_blank" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton component={Link} href="https://twitter.com" target="_blank" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton component={Link} href="https://www.instagram.com" target="_blank" color="inherit">
                <Instagram />
              </IconButton>
            </Container>
          </Toolbar>
        </AppBar>
      </footer>
    </div>
  );
};

export default HomePage;