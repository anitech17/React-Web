import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedHooks';
import { loginUser } from '../features/auth/authThunks';
import type { RootState } from '../app/store';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { loading, error } = useAppSelector((state: RootState) => state.auth);

    const handleLogin = () => {
        dispatch(loginUser({ email, password }))
            .unwrap()
            .then((response) => {
                console.log("response", response);
                const { user, token } = response;
                localStorage.setItem('token', token);
                // Role-based navigation
                console.log('User from API:', user);
                switch (user.role) {
                    case 'admin':
                        navigate('/admin/dashboard');
                        break;
                    case 'educator':
                        navigate('/educator/dashboard');
                        break;
                    case 'student':
                        navigate('/student/dashboard');
                        break;
                    default:
                        navigate('/'); // fallback or 404
                }
            })
            .catch(() => {
                // error already handled in state
            });
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            gap={2}
        >
            <Typography variant="h4">Login</Typography>

            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />

            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />

            {error && <Typography color="error">{error}</Typography>}

            <Button variant="contained" onClick={handleLogin} disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
            </Button>
        </Box>
    );
};
