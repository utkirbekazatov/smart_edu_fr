import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LogOut, PlusCircle, Users, BookOpen, Layers, GraduationCap, Clock, UserPlus, Key, Trash2 } from 'lucide-react';

function AdminDashboard() {
    // Holatlar (States)
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [groups, setGroups] = useState([]);
    
    // Yangi ma'lumotlar kiritish holati
    const [newCourse, setNewCourse] = useState({ name: '', price: '', description: '' });
    const [newGroup, setNewGroup] = useState({ name: '', course_id: '', teacher_id: '', days: '', start_time: '' });
    const [newUser, setNewUser] = useState({ name: '', username: '', password: '', role: 'student' });

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        fetchData();
    }, []);

    // Ma'lumotlarni backenddan yuklash
    // Ma'lumotlarni backenddan yuklash
    const fetchData = async () => {
        try {
            const [users, edu, grp] = await Promise.all([
                axios.get('https://smarteduproject.fwh.is/api/admin/users', { headers }),
                axios.get('https://smarteduproject.fwh.is/api/courses', { headers }),
                axios.get('https://smarteduproject.fwh.is/api/groups', { headers })
            ]);
            
            // Agar ma'lumot kelmasa, nima kelayotganini ko'rish uchun alert ishlatamiz
            if (!users.data.teachers && !users.data.students) {
                alert("Backenddan ma'lumot keldi, lekin ichida 'teachers' yoki 'students' topilmadi. Kelgan ma'lumot: " + JSON.stringify(users.data));
            }
            
            setTeachers(users.data?.teachers || []);
            setStudents(users.data?.students || []);
            setCourses(edu.data || []);
            setGroups(grp.data || []);
        } catch (error) {
            // Xatolik bo'lsa, uni to'g'ridan-to'g'ri ekranga chiqaramiz
            alert("Xatolik yuz berdi: " + error.message);
        }
    };

    // 1. Foydalanuvchi yaratish (To'g'rilangan API manzil)
    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://smarteduproject.fwh.is/api/admin/create-user', newUser, { headers });
            alert("Foydalanuvchi muvaffaqiyatli yaratildi!");
            setNewUser({ name: '', username: '', password: '', role: 'student' });
            fetchData(); 
        } catch (error) { 
            alert("Foydalanuvchi yaratishda xatolik!"); 
        }
    };

    // 2. Parolni majburiy yangilash (Reset Password)
    const handleResetPassword = async (id, role, name) => {
        const newPassword = prompt(`"${name}" uchun yangi parolni kiriting (kamida 3 ta belgi):`);
        
        if (newPassword === null) return; 
        if (newPassword.trim().length < 3) {
            alert("Parol kamida 3 ta belgidan iborat bo'lishi kerak!");
            return;
        }

        try {
            await axios.post('https://smarteduproject.fwh.is/api/admin/reset-password', {
                id: id,
                role: role,
                new_password: newPassword
            }, { headers });
            
            alert("Parol muvaffaqiyatli yangilandi!");
        } catch (error) {
            alert("Parolni yangilashda xatolik yuz berdi!");
        }
    };

    // 3. Foydalanuvchini o'chirish (Delete User)
    const handleDeleteUser = async (id, role, name) => {
        if (!confirm(`Rostdan ham "${name}" profilini o'chirmoqchimisiz?`)) return;

        try {
            await axios.delete(`https://smarteduproject.fwh.is/api/admin/users/${role}/${id}`, { headers });
            alert("Foydalanuvchi muvaffaqiyatli o'chirildi!");
            fetchData(); 
        } catch (error) {
            alert("O'chirishda xatolik yuz berdi!");
        }
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://smarteduproject.fwh.is/api/admin/courses', newCourse, { headers });
            alert("Kurs muvaffaqiyatli qo'shildi!");
            setNewCourse({ name: '', price: '', description: '' });
            fetchData();
        } catch (error) { 
            alert("Kurs qo'shishda xatolik!"); 
        }
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://smarteduproject.fwh.is/api/admin/groups', newGroup, { headers });
            alert("Guruh muvaffaqiyatli yaratildi!");
            setNewGroup({ name: '', course_id: '', teacher_id: '', days: '', start_time: '' });
            fetchData();
        } catch (error) { 
            alert("Guruh yaratishda xatolik!"); 
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.replace('/');
    };

    return (
        <div style={{ backgroundColor: '#050B14', color: '#FFFFFF', minHeight: '100vh', padding: '30px 20px', fontFamily: 'sans-serif' }}>
            <style>{`
                .admin-card { background: #09101E; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 25px; margin-bottom: 25px; }
                .admin-input { width: 100%; background: #050B14; border: 1px solid rgba(255,255,255,0.1); color: white; padding: 12px 15px; border-radius: 8px; outline: none; margin-bottom: 15px; box-sizing: border-box; }
                .admin-input:focus { border-color: #00B4D8; }
                .admin-btn { padding: 12px 20px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.3s; width: 100%; justify-content: center; }
                .btn-primary { background: #0076B6; color: white; }
                .btn-primary:hover { background: #00B4D8; }
                .btn-success { background: #10B981; color: white; }
                .btn-success:hover { background: #059669; }
                .admin-table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; }
                .admin-table th { background: rgba(255,255,255,0.03); color: #A3AED0; padding: 15px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .admin-table td { padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #E2E8F0; }
                .grid-layout { display: grid; grid-template-columns: 1fr; gap: 25px; }
                .action-btn { padding: 6px 10px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; font-size: 12px; transition: 0.2s; }
                .btn-edit { background: rgba(234, 179, 8, 0.1); color: #EAB308; border: 1px solid rgba(234, 179, 8, 0.2); margin-right: 8px; }
                .btn-edit:hover { background: #EAB308; color: #000; }
                .btn-delete { background: rgba(239, 68, 68, 0.1); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.2); }
                .btn-delete:hover { background: #EF4444; color: #fff; }
                @media (min-width: 992px) { .grid-layout { grid-template-columns: 1fr 1fr; } }
            `}</style>

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Layers color="#00B4D8" /> Admin Boshqaruv Paneli
                        </h1>
                    </div>
                    <button onClick={handleLogout} style={{ background: 'rgba(220, 53, 69, 0.1)', color: '#ff4d4d', padding: '10px 20px', border: '1px solid rgba(220, 53, 69, 0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <LogOut size={18} /> Tizimdan chiqish
                    </button>
                </div>

                {/* Forms Section */}
                <div className="grid-layout">
                    
                    {/* Foydalanuvchi qo'shish */}
                    <div className="admin-card">
                        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#00B4D8' }}>
                            <UserPlus size={20} /> Login va Parol berish (O'qituvchi/O'quvchi)
                        </h3>
                        <form onSubmit={handleCreateUser}>
                            <input className="admin-input" placeholder="F.I.SH (Ism Familiya)" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} required />
                            
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input className="admin-input" placeholder="Login yarating" value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} required />
                                <input className="admin-input" type="password" placeholder="Parol yarating" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} required />
                            </div>

                            <select className="admin-input" value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} required>
                                <option value="student">O'quvchi sifatida</option>
                                <option value="teacher">O'qituvchi sifatida</option>
                            </select>
                            
                            <button type="submit" className="admin-btn btn-success">
                                <UserPlus size={18} /> Profilni yaratish
                            </button>
                        </form>
                    </div>

                    {/* Yangi Kurs */}
                    <div className="admin-card">
                        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#00B4D8' }}>
                            <BookOpen size={20} /> Yangi Kurs Qo'shish
                        </h3>
                        <form onSubmit={handleCreateCourse}>
                            <input className="admin-input" placeholder="Nomi (masalan: Ingliz tili)" value={newCourse.name} onChange={(e) => setNewCourse({...newCourse, name: e.target.value})} required />
                            <input className="admin-input" type="number" placeholder="Narxi (so'mda)" value={newCourse.price} onChange={(e) => setNewCourse({...newCourse, price: e.target.value})} required />
                            <button type="submit" className="admin-btn btn-primary">
                                <PlusCircle size={18} /> Kursni qo'shish
                            </button>
                        </form>
                    </div>

                    {/* Yangi Guruh */}
                    <div className="admin-card" style={{ gridColumn: '1 / -1' }}>
                        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#00B4D8' }}>
                            <Layers size={20} /> Yangi Guruh Ochish
                        </h3>
                        <form onSubmit={handleCreateGroup}>
                            <div className="grid-layout">
                                <div>
                                    <input className="admin-input" placeholder="Guruh nomi (masalan: EN-1)" value={newGroup.name} onChange={(e) => setNewGroup({...newGroup, name: e.target.value})} required />
                                    <select className="admin-input" value={newGroup.course_id} onChange={(e) => setNewGroup({...newGroup, course_id: e.target.value})} required>
                                        <option value="">Kursni tanlang</option>
                                        {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <select className="admin-input" value={newGroup.teacher_id} onChange={(e) => setNewGroup({...newGroup, teacher_id: e.target.value})} required>
                                        <option value="">O'qituvchini tanlang</option>
                                        {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </select>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input className="admin-input" placeholder="Kunlar (Toq/Juft)" value={newGroup.days} onChange={(e) => setNewGroup({...newGroup, days: e.target.value})} required />
                                        <input className="admin-input" type="time" value={newGroup.start_time} onChange={(e) => setNewGroup({...newGroup, start_time: e.target.value})} required />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="admin-btn btn-primary">
                                <PlusCircle size={18} /> Guruhni yaratish
                            </button>
                        </form>
                    </div>
                </div>

                {/* Mavjud Guruhlar */}
                <div className="admin-card">
                    <h3 style={{ marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Layers size={20} color="#00B4D8"/> Mavjud Guruhlar
                    </h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="admin-table">
                            <thead><tr><th>Guruh</th><th>Kurs</th><th>O'qituvchi</th><th>Vaqt</th></tr></thead>
                            <tbody>
                                {groups.length > 0 ? groups.map(g => (
                                    <tr key={g.id}>
                                        <td style={{ fontWeight: 'bold', color: '#fff' }}>{g.name}</td>
                                        <td>{g.course?.name || '-'}</td>
                                        <td>{g.teacher?.name || '-'}</td>
                                        <td><div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} color="#A3AED0"/> {g.days} • {g.start_time}</div></td>
                                    </tr>
                                )) : <tr><td colSpan="4" style={{ textAlign: 'center' }}>Hozircha guruhlar yo'q</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Ustozlar va O'quvchilar Jadvallari */}
                <div className="grid-layout">
                    
                    {/* O'qituvchilar ro'yxati */}
                    <div className="admin-card">
                        <h3 style={{ marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Users size={20} color="#00B4D8"/> O'qituvchilar ({teachers.length})
                        </h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table className="admin-table">
                                <thead><tr><th>Ism</th><th>Login / Username</th><th style={{ textAlign: 'center' }}>Amallar</th></tr></thead>
                                <tbody>
                                    {teachers.length > 0 ? teachers.map(t => (
                                        <tr key={t.id}>
                                            <td style={{ color: '#fff' }}>{t.name}</td>
                                            <td>{t.username}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className="action-btn btn-edit" onClick={() => handleResetPassword(t.id, 'teacher', t.name)}>
                                                    <Key size={12} /> Kalit
                                                </button>
                                                <button className="action-btn btn-delete" onClick={() => handleDeleteUser(t.id, 'teacher', t.name)}>
                                                    <Trash2 size={12} /> O'chirish
                                                </button>
                                            </td>
                                        </tr>
                                    )) : <tr><td colSpan="3" style={{ textAlign: 'center' }}>Hozircha o'qituvchilar yo'q</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* O'quvchilar ro'yxati */}
                    <div className="admin-card">
                        <h3 style={{ marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <GraduationCap size={20} color="#00B4D8"/> O'quvchilar ({students.length})
                        </h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table className="admin-table">
                                <thead><tr><th>Ism</th><th>Login / Username</th><th style={{ textAlign: 'center' }}>Amallar</th></tr></thead>
                                <tbody>
                                    {students.length > 0 ? students.map(s => (
                                        <tr key={s.id}>
                                            <td style={{ color: '#fff' }}>{s.name}</td>
                                            <td>{s.username}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className="action-btn btn-edit" onClick={() => handleResetPassword(s.id, 'student', s.name)}>
                                                    <Key size={12} /> Kalit
                                                </button>
                                                <button className="action-btn btn-delete" onClick={() => handleDeleteUser(s.id, 'student', s.name)}>
                                                    <Trash2 size={12} /> O'chirish
                                                </button>
                                            </td>
                                        </tr>
                                    )) : <tr><td colSpan="3" style={{ textAlign: 'center' }}>Hozircha o'quvchilar yo'q</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;