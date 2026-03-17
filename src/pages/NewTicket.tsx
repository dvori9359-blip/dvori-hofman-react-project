import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button, Box, MenuItem, Stack, InputAdornment, Avatar, Card, CardContent } from "@mui/material";
import { Assignment, Description, PriorityHigh, Send, ArrowBack, AddCircleOutline } from '@mui/icons-material';
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

const NewTicket = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({ subject: "", description: "", priority_id: 2 });
    const [errors, setErrors] = useState({ subject: false, description: false });
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const validate = () => {
        const newErrors = {
            subject: formData.subject.trim() === "",
            description: formData.description.trim() === "",
        };
        setErrors(newErrors);
        return !newErrors.subject && !newErrors.description;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validate()) return;
        setLoading(true);

        const ticketData = { 
            subject: formData.subject,
            description: formData.description,
            priority_id: formData.priority_id
        };

        try {
            await api.post("/tickets", ticketData);
            showToast("הפנייה נוצרה בהצלחה!", "success");
            navigate("/tickets");
        } catch (err: any) {
            showToast(err.response?.data?.message || "שגיאה ביצירת הפנייה", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 8, direction: 'rtl' }}>
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate('/tickets')}
                sx={{ mb: 3 }}
            >
                חזרה לרשימה
            </Button>
            
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                        <AddCircleOutline sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h5" fontWeight="bold">
                            פתיחת פנייה חדשה
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            מלא את הפרטים ונחזור אליך בהקדם
                        </Typography>
                    </Box>
                </Box>

                <Card sx={{ mb: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            💡 <strong>טיפ:</strong> פרט כמה שיותר את הבעיה כדי שנוכל לעזור לך בצורה הטובה ביותר
                        </Typography>
                    </CardContent>
                </Card>

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField 
                        label="נושא הפנייה" 
                        fullWidth
                        required 
                        error={errors.subject}
                        helperText={errors.subject ? "שדה חובה" : "תמצית הבעיה במשפט אחד"}
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})} 
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Assignment fontSize="small" color="primary" /></InputAdornment>
                        }}
                    />

                    <TextField 
                        label="תיאור מפורט" 
                        fullWidth
                        multiline 
                        rows={5} 
                        required 
                        error={errors.description}
                        helperText={errors.description ? "אנא פרט את פנייתך" : "כאן כדאי להוסיף את כל הפרטים הרלוונטיים"}
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})} 
                        InputProps={{
                            startAdornment: <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}><Description fontSize="small" color="primary" /></InputAdornment>
                        }}
                    />

                    <TextField 
                        select 
                        fullWidth
                        label="רמת דחיפות" 
                        value={formData.priority_id}
                        onChange={e => setFormData({...formData, priority_id: Number(e.target.value)})}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PriorityHigh fontSize="small" color="primary" /></InputAdornment>
                        }}
                    >
                        <MenuItem value={1}>🟢 נמוכה (טיפול שגרתי)</MenuItem>
                        <MenuItem value={2}>🟡 בינונית (סטנדרט)</MenuItem>
                        <MenuItem value={3}>🔴 גבוהה (דחוף ביותר)</MenuItem>
                    </TextField>

                    <Stack direction="row" spacing={2} mt={3}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            fullWidth 
                            size="large"
                            disabled={loading}
                            startIcon={<Send />}
                            sx={{ 
                                borderRadius: 1.5, 
                                py: 1.5, 
                                fontWeight: 'bold', 
                                fontSize: '1rem',
                                boxShadow: 2,
                                '&:hover': { boxShadow: 4 }
                            }}
                        >
                            {loading ? "שולח..." : "שלח פנייה"}
                        </Button>
                        <Button 
                            variant="outlined" 
                            fullWidth 
                            size="large"
                            onClick={() => navigate("/tickets")}
                            sx={{ borderRadius: 1.5, py: 1.5, fontWeight: 'bold' }}
                        >
                            ביטול
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};

export default NewTicket;