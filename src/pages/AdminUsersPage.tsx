import { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, MenuItem, Alert } from "@mui/material";
import api from "../services/api";

const AdminUsersPage = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "agent" });
    const [msg, setMsg] = useState({ type: "" as "success" | "error" | "", text: "" });

    const loadUsers = async () => {
        try {
            const res = await api.get("/users");
            setUsers(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { loadUsers(); }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/users", formData);
            setMsg({ type: "success", text: "המשתמש נוצר בהצלחה!" });
            setFormData({ name: "", email: "", password: "", role: "agent" });
            loadUsers();
        } catch (err: any) {
            const errorText = err.response?.status === 409 ? "האימייל כבר קיים במערכת" : "יצירת משתמש נכשלה";
            setMsg({ type: "error", text: errorText });
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, direction: 'rtl' }}>
            <Typography variant="h4" fontWeight="bold" mb={3}>ניהול צוות ומשתמשים</Typography>
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" mb={2}>הוסף סוכן או מנהל חדש</Typography>
                {msg.text && <Alert severity={msg.type || "info"} sx={{ mb: 2 }}>{msg.text}</Alert>}
                <Box component="form" onSubmit={handleCreate} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <TextField label="שם" size="small" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    <TextField label="אימייל" size="small" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    <TextField label="סיסמה" size="small" type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    <TextField select label="תפקיד" size="small" sx={{ minWidth: 100 }} value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                        <MenuItem value="agent">סוכן</MenuItem>
                        <MenuItem value="admin">מנהל</MenuItem>
                    </TextField>
                    <Button type="submit" variant="contained">צור משתמש</Button>
                </Box>
            </Paper>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: '#eee' }}>
                        <TableRow>
                            <TableCell align="right">שם</TableCell>
                            <TableCell align="right">אימייל</TableCell>
                            <TableCell align="right">תפקיד</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(u => (
                            <TableRow key={u.id}>
                                <TableCell align="right">{u.name}</TableCell>
                                <TableCell align="right">{u.email}</TableCell>
                                <TableCell align="right">{u.role === 'admin' ? 'מנהל' : u.role === 'agent' ? 'סוכן' : 'לקוח'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};
export default AdminUsersPage;