import React from 'react';
import { Container, Typography, Box, Stack, Card, CardContent } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';    

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ mt: 8, direction: 'rtl', textAlign: 'center' }}>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h3" fontWeight="900" gutterBottom color="primary">
                    שלום, {user?.name} 👋
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    תפקיד: {user?.role === 'admin' ? 'מנהל מערכת' : user?.role === 'agent' ? 'סוכן שירות' : 'לקוח'}
                </Typography>
            </Box>

            <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={4} 
                justifyContent="center"
                alignItems="stretch"
            >
                <Card 
                    sx={{ 
                        flex: 1,
                        borderRadius: '24px', 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                        cursor: 'pointer', 
                        transition: '0.3s',
                        '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 15px 40px rgba(0,0,0,0.15)' } 
                    }} 
                    onClick={() => navigate("/tickets")}
                >
                    <CardContent sx={{ p: 5 }}>
                        <ListAltIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h5" fontWeight="bold">צפייה בקריאות</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            ניהול ומעקב אחר כל הטיקטים המשויכים אליך
                        </Typography>
                    </CardContent>
                </Card>

                {user?.role === 'customer' && (
                    <Card 
                        sx={{ 
                            flex: 1,
                            borderRadius: '24px', 
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                            cursor: 'pointer', 
                            transition: '0.3s',
                            '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 15px 40px rgba(0,0,0,0.15)' } 
                        }} 
                        onClick={() => navigate("/tickets/new")}
                    >
                        <CardContent sx={{ p: 5 }}>
                            <AddCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                            <Typography variant="h5" fontWeight="bold">פתיחת קריאה</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                יש לך תקלה? אנחנו כאן כדי לעזור במהירות
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Stack>
        </Container>
    );
};

export default Dashboard;