import React from 'react';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container, Paper, Typography, Box, Select, MenuItem,
  Button, TextField, Stack, CircularProgress, Divider, FormControl, InputLabel, Card, CardContent, Avatar, Chip as MuiChip, SelectChangeEvent
} from "@mui/material";
import { Send, Update, ArrowBack, Description, Person, Schedule } from "@mui/icons-material";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

const TicketDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const role = (user?.role || "").toString().toLowerCase();
  const isAdmin = role === "admin";
  const isAgent = role === "agent";

  const [ticket, setTicket] = useState<any>(null);
  const [newComment, setNewComment] = useState("");
  const [statusId, setStatusId] = useState<number>(1);
  const [agents, setAgents] = useState<any[]>([]);
  const [assignedTo, setAssignedTo] = useState<string>("");
  const [assigning, setAssigning] = useState(false);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const tRes = await api.get(`/tickets/${id}`);
        const ticketData = tRes.data;
        setTicket(ticketData);
        const currentStatusId = ticketData.status_id || 1;
        setStatusId(currentStatusId);
        setAssignedTo(ticketData.assigned_to == null ? "" : String(ticketData.assigned_to));
      } catch (err) {
        showToast("שגיאה בטעינת הנתונים", "error");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  useEffect(() => {
    const loadAgents = async () => {
      if (!isAdmin) return;
      try {
        const res = await api.get("/users");
        const allUsers = res.data || [];
        const onlyAgents = allUsers.filter((u: any) => u.role === "agent");
        setAgents(onlyAgents);
      } catch (_err) {
        showToast("שגיאה בטעינת רשימת הסוכנים", "error");
      }
    };
    loadAgents();
  }, [isAdmin]);

  const handleUpdateStatus = async () => {
    try {
      await api.patch(`/tickets/${id}`, { status_id: statusId });
      const tRes = await api.get(`/tickets/${id}`);
      setTicket(tRes.data);
      setStatusId(tRes.data.status_id || 1);
      setAssignedTo(tRes.data.assigned_to == null ? "" : String(tRes.data.assigned_to));
      showToast("הסטטוס עודכן בהצלחה!", "success");
    } catch (err: any) {
      showToast("שגיאה בעדכון הסטטוס", "error");
    }
  };

  const handleAssignAgent = async () => {
    if (!isAdmin) return;
    if (!id) return;

    try {
      setAssigning(true);
      await api.patch(`/tickets/${id}`, { assigned_to: assignedTo === "" ? null : Number(assignedTo) });
      const tRes = await api.get(`/tickets/${id}`);
      setTicket(tRes.data);
      setAssignedTo(tRes.data.assigned_to == null ? "" : String(tRes.data.assigned_to));
      showToast("הטיקט הוקצה בהצלחה!", "success");
    } catch (_err) {
      showToast("שגיאה בהקצאת הטיקט לסוכן", "error");
    } finally {
      setAssigning(false);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      await api.post(`/tickets/${id}/comments`, { content: newComment });
      setNewComment("");
      const tRes = await api.get(`/tickets/${id}`);
      setTicket(tRes.data);
      showToast("התגובה נוספה בהצלחה!", "success");
    } catch (err) {
      showToast("שגיאה בשליחת תגובה", "error");
    }
  };

  if (loading) return <Box sx={{ textAlign: "center", mt: 10 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, direction: "rtl", mb: 5 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/tickets')}
        sx={{ mb: 3 }}
      >
        חזרה לרשימה
      </Button>
      
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <Description sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {ticket?.subject}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              פנייה #{id}
            </Typography>
          </Box>
        </Box>

        <Card sx={{ mb: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
          <CardContent>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" fontWeight="bold">סטטוס:</Typography>
                <MuiChip 
                  label={ticket?.status_name || "לא ידוע"}
                  color={ticket?.status_id === 3 ? "success" : ticket?.status_id === 2 ? "warning" : "error"}
                  size="small"
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" fontWeight="bold">עדיפות:</Typography>
                <Typography variant="body2">{ticket?.priority_name || "לא ידוע"}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person fontSize="small" color="action" />
                <Typography variant="body2">{ticket?.created_by_name || "לא ידוע"}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {(isAdmin || isAgent) && (
          <Card sx={{ mb: 4, borderRadius: 2, border: '2px solid', borderColor: 'primary.light' }}>
            <CardContent>
              <Typography variant="h6" mb={2} fontWeight="bold" color="primary">
                ניהול כרטיס
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel>סטטוס</InputLabel>
                  <Select 
                    value={String(statusId)} 
                    label="סטטוס"
                    onChange={(e: SelectChangeEvent) => setStatusId(Number(e.target.value))}
                  >
                    <MenuItem value={1}>פתוח</MenuItem>
                    <MenuItem value={2}>סגור</MenuItem>

                  </Select>
                </FormControl>
                <Button 
                  variant="contained" 
                  startIcon={<Update />}
                  onClick={handleUpdateStatus}
                  sx={{ borderRadius: 1.5 }}
                >
                  עדכן סטטוס
                </Button>
              </Stack>

              {isAdmin && (
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }} sx={{ mt: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 260 }}>
                    <InputLabel>הקצה לסוכן</InputLabel>
                    <Select
                      value={assignedTo}
                      label="הקצה לסוכן"
                      onChange={(e: SelectChangeEvent) => setAssignedTo(e.target.value)}
                    >
                      <MenuItem value={""}>לא הוקצה</MenuItem>
                      {agents.map((a: any) => (
                        <MenuItem key={a.id} value={String(a.id)}>{a.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="outlined"
                    onClick={handleAssignAgent}
                    disabled={assigning}
                    sx={{ borderRadius: 1.5, minWidth: 140 }}
                  >
                    {assigning ? "מעדכן..." : "הקצה"}
                  </Button>
                </Stack>
              )}
            </CardContent>
          </Card>
        )}

        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" mb={2} fontWeight="bold">
          תיאור הפנייה
        </Typography>
        <Card sx={{ mb: 4, bgcolor: 'grey.50', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {ticket?.description}
            </Typography>
          </CardContent>
        </Card>

        <Typography variant="h6" mb={2} fontWeight="bold">
          תגובות
        </Typography>
        <Stack spacing={2} mb={3}>
          {ticket?.comments && ticket.comments.length > 0 ? (
            ticket.comments.map((c: any) => (
              <Card key={c.id} sx={{ borderRadius: 2 }} variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      <Person fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {c.author_name || "משתמש"}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Schedule fontSize="small" sx={{ fontSize: 14 }} color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {c.created_at ? new Date(c.created_at).toLocaleString("he-IL") : ""}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body2">{c.content}</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">אין תגובות עדיין</Typography>
          )}
        </Stack>

        <Card sx={{ borderRadius: 2, border: '2px dashed', borderColor: 'grey.300' }}>
          <CardContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="הוסף תגובה..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              variant="outlined"
            />
            <Button 
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Send />}
              onClick={addComment}
              sx={{ mt: 2, borderRadius: 1.5 }}
            >
              שלח תגובה
            </Button>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default TicketDetails;