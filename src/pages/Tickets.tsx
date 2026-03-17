import { useState, useEffect, useCallback } from "react";
import {
  Container, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Chip, Button, Box,
  CircularProgress, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel, Card, CardContent, Grid, Avatar
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Add, Visibility, FilterList, Assignment } from "@mui/icons-material";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Tickets = () => {
  const [allTickets, setAllTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 

  const loadTickets = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await api.get("/tickets");
      const allData = res.data || [];

      const currentUserId = user.id;
      let filteredByRole = allData;

      if (user.role === "customer") {
        filteredByRole = allData.filter((t: any) => t.created_by === currentUserId);
      } else if (user.role === "agent") {
        filteredByRole = allData.filter((t: any) => t.assigned_to === currentUserId);
      }

      setAllTickets(filteredByRole);
    } catch (err) {
      console.error("שגיאה בטעינת כרטיסים:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets, location.key]); 

  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatusFilter(e.target.value);
  };

  const displayTickets = statusFilter === "all" 
    ? allTickets 
    : allTickets.filter(t => t.status_id === Number(statusFilter));

  if (loading) return <Box sx={{ textAlign: "center", mt: 10 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, direction: "rtl", mb: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <Assignment sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              מרכז הפניות
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ניהול ומעקב קריאות שירות
            </Typography>
          </Box>
        </Box>
        {user?.role === "customer" && (
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            onClick={() => navigate("/tickets/new")}
            sx={{ 
              borderRadius: 2,
              px: 3,
              boxShadow: 2,
              '&:hover': { boxShadow: 4 }
            }}
          >
            פנייה חדשה
          </Button>
        )}
      </Box>

      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FilterList color="primary" />
            <FormControl fullWidth size="small">
              <InputLabel>סינון לפי סטטוס</InputLabel>
              <Select 
                value={statusFilter} 
                label="סינון לפי סטטוס"
                onChange={handleStatusChange}
              >
                <MenuItem value="all">כל הסטטוסים</MenuItem>
                <MenuItem value="1">פתוח</MenuItem>
                <MenuItem value="2">סגור</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>נושא</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>סטטוס</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>עדיפות</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>נוצר ע"י</TableCell>
              {user?.role !== "customer" && <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>מוקצה ל</TableCell>}
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>תאריך</TableCell>
              <TableCell align="left" sx={{ color: 'white', fontWeight: 'bold' }}>פעולה</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayTickets.length > 0 ? (
              displayTickets.map(t => (
                <TableRow 
                  key={t.id} 
                  hover
                  sx={{ 
                    '&:hover': { 
                      bgcolor: 'action.hover',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <TableCell align="right" sx={{ fontWeight: 500 }}>{t.subject}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={t.status_name || "לא ידוע"} 
                      color={
                        t.status_id === 3 ? "success" : 
                        t.status_id === 2 ? "warning" : "error"
                      } 
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {t.priority_name || "לא ידוע"}
                  </TableCell>
                  <TableCell align="right">{t.created_by_name || "לקוח"}</TableCell>
                  {user?.role !== "customer" && (
                    <TableCell align="right">{t.assigned_to_name || "לא הוקצה"}</TableCell>
                  )}
                  <TableCell align="center">
                    {t.created_at ? new Date(t.created_at).toLocaleDateString("he-IL") : "—"}
                  </TableCell>
                  <TableCell align="left">
                    <Button 
                      variant="contained" 
                      size="small"
                      onClick={() => navigate(`/tickets/${t.id}`)}
                      sx={{ 
                        borderRadius: 1.5,
                        textDecoration: 'underline'
                      }}
                    >
                      פרטים
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                  <Typography color="textSecondary">אין נתונים להצגה בסטטוס זה</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Tickets;