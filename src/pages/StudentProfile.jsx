import ChangePasswordForm from './ChangePasswordForm';

function StudentProfile() {
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>O'quvchi Profili</h1>
            <p>Xush kelibsiz!</p>
            
            {/* Parol o'zgartirish formasi */}
            <ChangePasswordForm />

            <br />
            <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} style={{ padding: '8px 15px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Chiqish</button>
        </div>
    );
}
export default StudentProfile;