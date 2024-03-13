import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions } from '@mui/material';
import axios from 'axios';

const LoginModal = ({ open, handleClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const submitLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { email, password });
            if (response.data.status === 200) {
                localStorage.setItem('token', response.data.data.data.access_token);
                onLoginSuccess();
            } else {
                console.error('Login failed:', response.data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={submitLogin}>Login</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginModal;
