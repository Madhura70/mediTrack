import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import Onboarding from './components/features/auth/Onboarding';
import Login from './components/features/auth/Login';
import Signup from './components/features/auth/Signup';
import AddMedicineForm from './components/features/medicines/AddMedicineForm';
import AddAppointmentForm from './components/features/appointments/AddAppointmentForm';
import NotificationManager from './components/features/dashboard/NotificationManager';
import AchievementModal from './components/features/dashboard/AchievementModal';
import AppLayout from './components/layout/AppLayout';

import Home from './pages/Home';
import Medicines from './pages/Medicines';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Health from './pages/Health';
import Records from './pages/Records';
import HealthReport from './pages/HealthReport';
import Help from './pages/Help';
import Privacy from './pages/Privacy';
import MedicalID from './pages/MedicalID';
import Calendar from './pages/Calendar';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    // For demo/prototype, we might default to not auth until login
    // user object check handles it.
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
}

function PublicRoute({ children }) {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) return <Navigate to="/dashboard" replace />;
    return children;
}

function AppContent() {
    return (
        <Routes>
            <Route path="/" element={<PublicRoute><Onboarding /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/medicines" element={<Medicines />} />
                <Route path="/medicines/add" element={<AddMedicineForm />} />
                <Route path="/health" element={<Health />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/appointments/add" element={<AddAppointmentForm />} />
                <Route path="/records" element={<Records />} />
                <Route path="/report" element={<HealthReport />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/help" element={<Help />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/medical-id" element={<MedicalID />} />
                <Route path="/calendar" element={<Calendar />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <DataProvider>
                    <div className="antialiased text-gray-900">
                        <AppContent />
                        <NotificationManager />
                        <AchievementModal />
                    </div>
                </DataProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
