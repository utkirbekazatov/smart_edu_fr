import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; // Sizning login faylingiz qanday nomlangan bo'lsa shunday yozing (AuthForm yoki Login)
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentProfile from './pages/StudentProfile';
import LandingPage from './pages/LandingPage'; // Yangi sahifani chaqiramiz

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        {/* 1. OCHIQ SAYT: Hamma kira oladi */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. LOGIN SAHIFASI: Tizimga kirish uchun */}
        <Route path="/login" element={
          !token ? <Login /> : (
            role === 'admin' ? <Navigate to="/admin/dashboard" /> :
            role === 'teacher' ? <Navigate to="/teacher/dashboard" /> :
            <Navigate to="/student/profile" />
          )
        } />

        {/* YOPIQ SAHIFALAR: Faqat tokeni borlar kira oladi (Oldingi holatidek qoladi) */}
        <Route path="/admin/dashboard" element={token && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/teacher/dashboard" element={token && role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/login" />} />
        <Route path="/student/profile" element={token && role === 'student' ? <StudentProfile /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;