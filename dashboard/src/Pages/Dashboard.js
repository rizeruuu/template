import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Dashboard.css";

function Dashboard() {
  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");
  const [adminName, setAdminName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [modalLoginOpen, setModalLoginOpen] = useState(true);
  const [modalSignUpOpen, setModalSignUpOpen] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminID');
    const currentPath = window.location.pathname;

    
    // If there's an adminID and not on the admin page, redirect to admin
    if (storedAdmin && window.location.pathname !== '/admin') {
      navigate('/admin');
  }
  }, [navigate]);

  function handleClose() {
    setModalLoginOpen(false);
    setModalSignUpOpen(false);
    window.location.href = "/menu"
  }

  function handleLogin() {
    if (!admin || !password) {
      setAdminNameError(!admin);
      setPasswordError(!password);
      return;
    }
    axios
      .get('http://localhost:1333/viewAdmin')
      .then(response => {
        const admins = response.data;
        const foundAdmin = admins.find(ad => ad.AdminID === admin);
        if (foundAdmin) {
          if (foundAdmin.Password === password) {
            console.log("Login successful");
            localStorage.setItem("adminID", foundAdmin.AdminID);
            navigate("/admin");
          } else {
            console.log("Incorrect password");
            setPasswordError(true);
          }
        } else {
          console.log("Admin not found");
          setAdminNameError(true);
        }
      })
      .catch(error => {
        console.error("Error fetching admin data:", error);
      });
  }

  function handleSignUp() {
    setModalLoginOpen(false);
    setModalSignUpOpen(true);
  }

  function handleAddAdmin() {
    if (!adminName || !editPassword) {
      setAdminNameError(!adminName);
      setPasswordError(!editPassword);
      return;
    }

    const userData = {
      AdminID: adminName,
      Password: editPassword,
    };

    axios.post("http://localhost:1333/addAdmin", userData)
      .then(response => {
        console.log("Admin added successfully:", response.data);
        setAdminName("");
        setEditPassword("");
        handleClose();
        navigate("/admin");
      })
      .catch(error => {
        console.error("Error adding admin:", error);
      });
  }

  return (
    <div className="loginBody">
      <Modal
        open={modalLoginOpen}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description" 
        className="custom-modal"
        //onClose={handleClose}
      >
        <Box className="login-container">
          <h2 id="login-modal-title">Login</h2>
          <TextField
            label="Admin ID"
            variant="outlined"
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
            fullWidth
            margin="normal"
            error={adminNameError}
            helperText={adminNameError && "Admin ID is Wrong"}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            error={passwordError}
            helperText={passwordError && "Password is required"}
          />
          <div className="button-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button variant="contained" onClick={handleLogin}>Login</Button>
            <br />
            <Link onClick={handleSignUp}>No Account? Signup</Link>
          </div>
        </Box>
      </Modal>

      <Modal
        open={modalSignUpOpen}
        aria-labelledby="signup-modal-title"
        aria-describedby="signup-modal-description"
        className="custom-modal"
        //onClose={handleClose}
      >
        <Box className="login-container">
          <Typography variant="h6" component="h2" fontWeight="bold" align="center">Sign up</Typography>
          <TextField
            label="Admin ID"
            variant="outlined"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            fullWidth
            margin="normal"
            error={adminNameError}
            helperText={adminNameError && "Admin ID is required"}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
            fullWidth
            margin="normal"
            error={passwordError}
            helperText={passwordError && "Password is required"}
          />
          <div style={{ marginBottom: '16px' }} />
          <Button variant="contained" onClick={handleAddAdmin}>Sign Up</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Dashboard;
