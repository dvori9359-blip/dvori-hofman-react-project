import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button, Box, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff, Login as LoginIcon } from "@mui/icons-material";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const { showToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await api.post("/auth/login", { email, password });
            const { token, user } = res.data;
            login(user, token);
            showToast("התחברת בהצלחה! ברוך השוב " + user.name, "success");
            navigate("/dashboard");
        } catch (err: any) {
            showToast(err.response?.data?.message || "אימייל או סיסמה שגויים", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decorative circles */}
            <Box sx={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', filter: 'blur(60px)' }} />
            <Box sx={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', filter: 'blur(60px)' }} />
            
            <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
                <Paper 
                    elevation={24} 
                    sx={{ 
                        p: 5, 
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)'
                        }
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Box sx={{ 
                            width: 80, 
                            height: 80, 
                            margin: '0 auto 20px', 
                            borderRadius: '50%', 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)'
                        }}>
                            <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
                        </Box>
                        <Typography variant="h4" fontWeight="800" sx={{ 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 1
                        }}>
                            ברוכים הבאים
                        </Typography>
                        <Typography variant="body2" color="text.secondary">התחבר למערכת ניהול הפניות</Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <TextField 
                            label="אימייל" 
                            type="email" 
                            required 
                            fullWidth 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            disabled={isLoading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email sx={{ color: '#1976d2' }} />
                                    </InputAdornment>
                                )
                            }}
                            sx={{ 
                                '& .MuiOutlinedInput-root': { 
                                    borderRadius: 2,
                                    '&:hover fieldset': { borderColor: '#1976d2' }, 
                                    '&.Mui-focused fieldset': { borderColor: '#1976d2' } 
                                } 
                            }}
                        />
                        
                        <TextField 
                            label="סיסמה" 
                            type={showPassword ? "text" : "password"}
                            required 
                            fullWidth 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            disabled={isLoading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{ color: '#1976d2' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{ 
                                '& .MuiOutlinedInput-root': { 
                                    borderRadius: 2,
                                    '&:hover fieldset': { borderColor: '#1976d2' }, 
                                    '&.Mui-focused fieldset': { borderColor: '#1976d2' } 
                                } 
                            }}
                        />
                        
                        <Button 
                            type="submit" 
                            variant="contained" 
                            size="large" 
                            fullWidth 
                            disabled={isLoading}
                            sx={{ 
                                mt: 2, 
                                height: '56px',
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                                    transform: 'translateY(-2px)'
                                },
                                '&:disabled': {
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    opacity: 0.7
                                }
                            }}
                        >
                            {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "התחבר"}
                        </Button>
                        
                        <Button 
                            variant="text" 
                            fullWidth 
                            onClick={() => navigate("/register")} 
                            disabled={isLoading}
                            sx={{ 
                                mt: 1,
                                color: '#667eea',
                                fontWeight: 'bold',
                                '&:hover': {
                                    background: 'rgba(102, 126, 234, 0.1)'
                                }
                            }}
                        >
                            צור חשבון לקוח חדש
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;