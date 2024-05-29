import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import "./Menu2.css";

function Menu2() {
  const navigate = useNavigate();
  const [allImage, setAllImage] = useState([]);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminID");
    const currentPath = window.location.pathname;

    // If there's an adminID and not on the admin page, redirect to admin
    if (storedAdmin && window.location.pathname !== "/admin") {
      navigate("/admin");
    }
    getImage();
  }, [navigate]);

  const getImage = async () => {
    try {
      const response = await fetch("http://localhost:1333/get-image");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllImage(data.data);
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  return (
    <div className="main">
      <h3>Kan Gei's Special Offer</h3>
      <Grid container spacing={2}>
        {allImage.map((data, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${data.image}`}
                alt={`Image ${index}`}
                style={{ height: 200 }}
              />
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  <b>{data.Name}</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ₱{data.Price}
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant="body2" gutterBottom>
                    Description: {data.Description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Menu2;
