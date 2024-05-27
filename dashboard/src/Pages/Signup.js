import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, CssBaseline, Paper, Link, CircularProgress, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import axios from "axios";

const theme = createTheme();

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "", 
  });
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    if (values.confirmPassword !== values.password) {
      setError("Password does not match.");
      return;
    }

    setIsLoading(true); // Show loading indicator
    try {
      const res = await axios.post("http://localhost:1333/adduser", values);

      const result = await res.data;
      if (result.success) {
        alert("User Added Successfully"); 
      }
      
      setValues({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error occurred during signup:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred during signup. Please try again."
      );
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="100vh" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url(https://scontent.fbag2-1.fna.fbcdn.net/v/t39.30808-6/386523797_165035433323429_5218695885814163544_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3awD39ZnHYIQ7kNvgH-WP2v&_nc_ht=scontent.fbag2-1.fna&oh=00_AYAsBj0wCSrROoEluRpPkpDPUEiRtGMf5weAtj0tBpNZ1w&oe=66567A28)', backgroundSize: '100% 100%', backgroundPosition: 'center' }}>
        <CssBaseline />
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleOnChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={values.password}
                onChange={handleOnChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={values.confirmPassword}
                onChange={handleOnChange}
              />
              {error && <Alert severity="error">{error}</Alert>}{" "}
              {/* Display error message if any */}
              {isLoading && <CircularProgress />}{" "}
              {/* Show loading indicator during signup */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Typography variant="body2" align="center">
                Already have an account?{' '}
                <Link component={RouterLink} to="/login" color="primary">
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
