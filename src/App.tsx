import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { ToastProvider } from "./components/Toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import TicketDetails from "./pages/TicketDetails";
import NewTicket from "./pages/NewTicket";
import AdminUsersPage from "./pages/AdminUsersPage"; 
import { ReactNode } from "react";
import { Box, CircularProgress } from "@mui/material";
import Navbar from "./components/Navbar";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();
    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    if (!user) return <Navigate to="/login" replace />;
    return <>{children}</>;
};

export default function App() {
    return (
        <ToastProvider>
            <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb' }}> 
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
                    <Route path="/tickets/new" element={<ProtectedRoute><NewTicket /></ProtectedRoute>} />
                    <Route path="/tickets/:id" element={<ProtectedRoute><TicketDetails /></ProtectedRoute>} />
                    <Route path="/admin/users" element={<ProtectedRoute><AdminUsersPage /></ProtectedRoute>} />

                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Box>
        </ToastProvider>
    );
}