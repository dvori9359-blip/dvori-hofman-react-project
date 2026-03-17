import { AppBar, Toolbar, Typography, Button, Box, IconButton, Container, Avatar, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Logout, Home, Assignment, SupervisorAccount, Person } from '@mui/icons-material';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return null; 

    return (
        <AppBar 
            position="sticky" 
            sx={{ 
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)'
            }}
        >
            <Container maxWidth="lg">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 0, py: 1 }}>
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.05)' }
                        }} 
                        onClick={() => navigate("/dashboard")}
                    >
                        <Avatar 
                            sx={{ 
                                bgcolor: 'white', 
                                color: 'primary.main',
                                mr: 1.5,
                                width: 40,
                                height: 40,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                            }}
                        >
                            <Assignment />
                        </Avatar>
                        <Typography 
                            variant="h6" 
                            fontWeight="900" 
                            sx={{ 
                                letterSpacing: 1, 
                                color: 'white',
                                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            SUPPORT.IT
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                            startIcon={<Home />}
                            onClick={() => navigate("/dashboard")} 
                            sx={{ 
                                color: 'white',
                                fontWeight: 600,
                                px: 2,
                                '&:hover': { 
                                    bgcolor: 'rgba(255,255,255,0.15)',
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.2s'
                            }}
                        >
                            דף הבית
                        </Button>
                        <Button 
                            startIcon={<Assignment />}
                            onClick={() => navigate("/tickets")} 
                            sx={{ 
                                color: 'white',
                                fontWeight: 600,
                                px: 2,
                                '&:hover': { 
                                    bgcolor: 'rgba(255,255,255,0.15)',
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.2s'
                            }}
                        >
                            קריאות שירות
                        </Button>
                        {user.role === 'admin' && (
                            <Button 
                                startIcon={<SupervisorAccount />}
                                onClick={() => navigate("/admin/users")} 
                                sx={{ 
                                    color: 'white',
                                    fontWeight: 600,
                                    px: 2,
                                    '&:hover': { 
                                        bgcolor: 'rgba(255,255,255,0.15)',
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.2s'
                                }}
                            >
                                ניהול משתמשים
                            </Button>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip
                            avatar={
                                <Avatar sx={{ bgcolor: 'white', color: 'primary.main' }}>
                                    <Person fontSize="small" />
                                </Avatar>
                            }
                            label={`שלום, ${user.name}`}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                fontWeight: 'bold',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                display: { xs: 'none', sm: 'flex' }
                            }}
                        />
                        <IconButton 
                            onClick={logout} 
                            title="התנתק"
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                '&:hover': { 
                                    bgcolor: 'rgba(255,255,255,0.3)',
                                    transform: 'rotate(10deg)'
                                },
                                transition: 'all 0.2s'
                            }}
                        >
                            <Logout />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;