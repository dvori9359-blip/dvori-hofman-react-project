import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button, Box, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import { Person, Email, Lock, Visibility, VisibilityOff, PersonAdd } from "@mui/icons-material";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "customer" });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const { showToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post("/auth/register", formData);
            const { token, user } = response.data;
            login(user, token);
            showToast("החשבון נוצר בהצלחה! שלום " + user.name, "success");
            navigate("/");
        } catch (err: any) {
            showToast(err.response?.data?.message || "ההרשמה נכשלה, ייתכן שהאימייל כבר קיים במערכת", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
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
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(240, 147, 251, 0.4)'
                        }}>
                            <PersonAdd sx={{ fontSize: 40, color: 'white' }} />
                        </Box>
                        <Typography variant="h4" fontWeight="800" sx={{ 
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 1
                        }}>
                            הרשמה
                        </Typography>
                        <Typography variant="body2" color="text.secondary">צור חשבון לקוח חדש</Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <TextField 
                            label="שם מלא" 
                            required 
                            fullWidth 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})} 
                            disabled={isLoading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={{ color: '#1976d2' }} />
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
                            label="אימייל" 
                            type="email" 
                            required 
                            fullWidth 
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})} 
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
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})} 
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
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 15px rgba(240, 147, 251, 0.4)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
                                    boxShadow: '0 6px 20px rgba(240, 147, 251, 0.6)',
                                    transform: 'translateY(-2px)'
                                },
                                '&:disabled': {
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    opacity: 0.7
                                }
                            }}
                        >
                            {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "צור חשבון"}
                        </Button>

                        <Button 
                            variant="text" 
                            fullWidth 
                            onClick={() => navigate("/login")}
                            disabled={isLoading}
                            sx={{ 
                                mt: 1,
                                color: '#f093fb',
                                fontWeight: 'bold',
                                '&:hover': {
                                    background: 'rgba(240, 147, 251, 0.1)'
                                }
                            }}
                        >
                            חזרה להתחברות
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register;