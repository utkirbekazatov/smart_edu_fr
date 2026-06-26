import { useState } from 'react';
import axios from 'axios';

function ChangePasswordForm() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [status, setStatus] = useState(false);

    const handleChange = async (e) => {
        e.preventDefault();
        setMsg('');
        const token = localStorage.getItem('token');
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user/change-password', 
            { old_password: oldPassword, new_password: newPassword },
            { headers: { Authorization: `Bearer ${token}` } });

            setStatus(true);
            setMsg(response.data.message);
            setOldPassword('');
            setNewPassword('');
            setMsg(response.data.message);
            alert("Parol o'zgardi, iltimos qaytadan kiring!");
            localStorage.clear();
            window.location.href = '/';
        } catch (error) {
            setStatus(false);
            setMsg(error.response?.data?.message || 'Xatolik yuz berdi!');
        }
    };

    return (
        <div style={{ maxWidth: '300px', padding: '15px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff', marginTop: '20px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Xavfsizlik: Parolni o‘zgartirish</h4>
            {msg && <p style={{ fontSize: '13px', color: status ? 'green' : 'red', fontWeight: 'bold' }}>{msg}</p>}
            <form onSubmit={handleChange} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="password" placeholder="Eski parol" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <input type="password" placeholder="Yangi parol" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <button type="submit" style={{ padding: '8px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Yangilash</button>
            </form>
        </div>
    );
}

export default ChangePasswordForm;