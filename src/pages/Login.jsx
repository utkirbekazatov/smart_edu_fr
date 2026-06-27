import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // api.js faylingizdan import qilamiz
import { GraduationCap, User, Lock, ArrowLeft, ShieldCheck, UserCheck, Briefcase, Loader2 } from 'lucide-react';

function Login() {
    const navigate = useNavigate();
    
    // State-lar
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);
        setMessage('Tekshirilmoqda...');

        try {
            // 1. CSRF Cookie olish
            await api.get('sanctum/csrf-cookie');

            // 2. Login so'rovi (api.js orqali)
            const response = await api.post('api/login', {
                username,
                password,
                role
            });
            
            setIsSuccess(true);
            setMessage("Muvaffaqiyatli kirdingiz!");
            
            // Token va Rolni saqlash
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            
            setTimeout(() => {
                if (role === 'admin') window.location.replace('/admin/dashboard');
                else if (role === 'teacher') window.location.replace('/teacher/dashboard');
                else window.location.replace('/student/profile');
            }, 1200);
            
        } catch (error) {
            setIsSuccess(false);
            // Xatolikni aniq ko'rsatish
            setMessage(error.response?.data?.message || 'Server bilan aloqa uzildi!');
            console.error("Login xatosi:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#050B14', color: '#FFFFFF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <style>{`
                .role-btn { flex: 1; padding: 12px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); color: #A3AED0; transition: all 0.3s; }
                .role-btn.active { background: #0076B6; color: #fff; border-color: #00B4D8; box-shadow: 0 0 15px rgba(0,118,182,0.4); }
                .input-field { width: 100%; background: #050B14; border: 1px solid rgba(255,255,255,0.1); color: white; padding: 14px 16px 14px 45px; border-radius: 8px; outline: none; box-sizing: border-box; }
                .input-field:focus { border-color: #00B4D8; }
            `}</style>

            <div style={{ background: '#09101E', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '420px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#8B95A5', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px' }}>
                    <ArrowLeft size={14} /> Asosiyga qaytish
                </div>

                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ background: 'rgba(0,180,216,0.1)', display: 'inline-block', padding: '10px', borderRadius: '12px', color: '#00B4D8', marginBottom: '15px' }}>
                        <GraduationCap size={30} />
                    </div>
                    <h2 style={{ fontSize: '24px', margin: 0 }}>Tizimga kirish</h2>
                </div>

                {message && (
                    <div style={{ padding: '10px', marginBottom: '20px', borderRadius: '8px', fontSize: '13px', textAlign: 'center', background: isSuccess ? 'rgba(40, 167, 69, 0.2)' : 'rgba(220, 53, 69, 0.2)', color: isSuccess ? '#28a745' : '#dc3545' }}>
                        {message}
                    </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    {['student', 'teacher', 'admin'].map((r) => (
                        <button key={r} type="button" className={`role-btn ${role === r ? 'active' : ''}`} onClick={() => setRole(r)}>
                            {r === 'student' && <UserCheck size={16}/>}
                            {r === 'teacher' && <Briefcase size={16}/>}
                            {r === 'admin' && <ShieldCheck size={16}/>}
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ position: 'relative', marginBottom: '15px' }}>
                        <User size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: '#4B5563' }} />
                        <input className="input-field" placeholder="Login" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div style={{ position: 'relative', marginBottom: '25px' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: '#4B5563' }} />
                        <input className="input-field" type="password" placeholder="Parol" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '14px', background: '#0076B6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer' }}>
                        {isLoading ? <Loader2 className="animate-spin" /> : "Kirish"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;