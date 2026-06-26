import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Users, BookOpen, Trophy, Star, ArrowRight, PlayCircle, Book, GraduationCap, 
    Phone, Mail, MapPin, Send 
} from 'lucide-react';

function LandingPage() {
    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const yOffset = -90; 
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div style={{backgroundColor: '#050B14', color: '#FFFFFF', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            
            <style>
                {`
                .nav-link { color: #A3AED0; font-size: 14px; font-weight: 500; cursor: pointer; position: relative; padding-bottom: 6px; transition: color 0.3s ease; white-space: nowrap; }
                .nav-link::after { content: ''; position: absolute; width: 100%; height: 2px; bottom: 0; left: 0; background-color: #00B4D8; transform: scaleX(0); transform-origin: bottom left; transition: transform 0.3s ease-out; }
                .nav-link:hover::after { transform: scaleX(1); }
                .nav-link:hover { color: #00B4D8; }
                .logo-text { white-space: nowrap; }
                
                .btn-blue { background: #0076B6; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 10px; white-space: nowrap; transition: all 0.3s ease; }
                .btn-blue:hover { background: #0088CC; box-shadow: 0 0 20px rgba(0, 136, 204, 0.4); transform: translateY(-2px); }
                .btn-gold { background: #CA9E2C; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 10px; white-space: nowrap; transition: all 0.3s ease; }
                .btn-gold:hover { background: #D4A336; box-shadow: 0 4px 15px rgba(202, 158, 44, 0.3); transform: translateY(-2px); }
                .btn-outline { background: #111A24; color: white; border: 1px solid #1F2E40; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.3s ease; }
                .btn-outline:hover { background: #182433; border-color: #304761; }

                .contact-input { width: 100%; background: #050B14; border: 1px solid rgba(255, 255, 255, 0.1); color: #FFFFFF; padding: 15px 20px; border-radius: 8px; font-size: 15px; outline: none; transition: all 0.3s ease; box-sizing: border-box; margin-bottom: 20px; }
                .contact-input:focus { border-color: #00B4D8; box-shadow: 0 0 10px rgba(0, 180, 216, 0.2); }
                .contact-input::placeholder { color: #4B5563; }

                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                .hero-image-container {
                    animation: float 6s ease-in-out infinite;
                    position: relative;
                    z-index: 2;
                }
                .hero-glow {
                    position: absolute;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(0,180,216,0.15) 0%, rgba(0,0,0,0) 70%);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1;
                    pointer-events: none;
                }
                `}
            </style>

            {/* NAVBAR (Endi qat'iy fixed qilingan, pastga tushganda ham turaveradi) */}
            <header style={{ 
                position: 'fixed', top: 0, left: 0, width: '100%', boxSizing: 'border-box',
                zIndex: 1000, backgroundColor: 'rgba(5, 12, 22, 0.9)',
                backdropFilter: 'blur(12px)', display: 'flex', justifyContent: 'space-between', 
                alignItems: 'center', padding: '15px 4%', borderBottom: '1px solid rgba(255,255,255,0.03)', gap: '20px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    <div style={{ background: 'rgba(0, 180, 216, 0.1)', padding: '8px', borderRadius: '8px', color: '#00B4D8' }}>
                        <GraduationCap size={24} />
                    </div>
                    <div className="logo-text" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                        <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#8B95A5', fontWeight: 'bold' }}>ZAMONAVIY</span>
                        <span style={{ fontSize: '20px', fontWeight: '900', color: '#FFFFFF', letterSpacing: '0.5px' }}>
                            SmartEdu<span style={{ color: '#00B4D8' }}>.</span>
                        </span>
                    </div>
                </div>

                <nav style={{ display: 'flex', gap: '22px', alignItems: 'center', overflowX: 'auto' }}>
                    <span className="nav-link" onClick={() => scrollToSection('about')}>Biz haqimizda</span>
                    <span className="nav-link" onClick={() => scrollToSection('instructors')}>Instruktorlar</span>
                    <span className="nav-link" onClick={() => scrollToSection('success-stories')}>Success Stories</span>
                    <span className="nav-link" onClick={() => scrollToSection('courses')}>Kurslar</span>
                    <span className="nav-link" onClick={() => scrollToSection('topics')}>Kurs Mavzulari</span>
                    <span className="nav-link" onClick={() => scrollToSection('video-courses')}>Video Kurs</span>
                    <span className="nav-link" onClick={() => scrollToSection('contact')}>Aloqa</span>
                </nav>

                <div style={{ flexShrink: 0 }}>
                    <button onClick={() => navigate('/login')} className="btn-outline">
                        Kabinetga kirish
                    </button>
                </div>
            </header>

            {/* HERO SECTION */}
            {/* Header fixed bo'lgani uchun, bu blok tepaga kirib ketmasligi uchun paddingTop qo'shildi */}
            <div id="about" style={{position: 'relative', paddingTop: '100px' }}>
                <main style={{ 
                    padding: '40px 5% 80px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    flexWrap: 'wrap', 
                    gap: '50px' 
                }}>
                    
                    <div style={{ flex: '1', minWidth: '350px', position: 'relative', zIndex: 2 }}>
                        <p style={{ color: '#00B4D8', fontWeight: 'bold', letterSpacing: '1px', fontSize: '12px', textTransform: 'uppercase', marginBottom: '20px' }}>
                            • Kelajak kasblari akademiyasi
                        </p>
                        
                        {/* Sarlavha hajmi kichraytirildi */}
                        <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', lineHeight: '1.2', margin: '0 0 24px 0' }}>
                            Kelajak kasblarini <br/> <span style={{ color: '#00B4D8' }}>Biz bilan o'rganing!</span>
                        </h1>
                        
                        <p style={{ color: '#8B95A5', fontSize: '16px', maxWidth: '550px', lineHeight: '1.6', marginBottom: '40px' }}>
                            Bizning o'quv markazimizda zamonaviy dasturlash, sun'iy intellekt va eng so'nggi texnologiyalar xalqaro metodika asosida amaliy darslar orqali o'rgatiladi.
                        </p>
                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                            <button className="btn-blue" onClick={() => scrollToSection('courses')}>Kursni boshlash <ArrowRight size={18} /></button>
                            <button className="btn-gold" onClick={() => scrollToSection('topics')}><Book size={18} /> Kurs Mavzulari</button>
                        </div>
                    </div>

                    <div style={{ flex: '1', minWidth: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                        <div className="hero-glow"></div>
                        <div className="hero-image-container" style={{ width: '100%', maxWidth: '550px' }}>
                            <img 
                                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop" 
                                alt="Dasturlash muhiti" 
                                style={{ 
                                    width: '100%', 
                                    height: 'auto', 
                                    borderRadius: '20px', 
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }} 
                            />
                            {/* Rasm ostidagi 99% yozuvli kartocha butunlay olib tashlandi */}
                        </div>
                    </div>

                </main>
            </div>

            {/* BOSHQA BO'LIMLAR */}
            <div id="instructors" style={{ padding: '80px 5%', minHeight: '30vh', borderTop: '1px solid rgba(255,255,255,0.02)' }}><h2 style={{ fontSize: '32px' }}>Tajribali Instruktorlar</h2></div>
            <div id="success-stories" style={{ padding: '80px 5%', minHeight: '30vh', background: '#09101E' }}><h2 style={{ fontSize: '32px' }}>Success Stories</h2></div>
            <div id="courses" style={{ padding: '80px 5%', minHeight: '30vh' }}><h2 style={{ fontSize: '32px' }}>Mavjud Kurslar</h2></div>
            <div id="topics" style={{ padding: '80px 5%', minHeight: '30vh', background: '#09101E' }}><h2 style={{ fontSize: '32px' }}>Kurs Mavzulari</h2></div>
            <div id="video-courses" style={{ padding: '80px 5%', minHeight: '30vh' }}><h2 style={{ fontSize: '32px' }}>Masofaviy Video Kurslar</h2></div>

            {/* ALOQA BO'LIMI */}
            <div id="contact" style={{ padding: '100px 5%', background: '#09101E', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <p style={{ color: '#00B4D8', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase', marginBottom: '10px' }}>
                        Bog'lanish
                    </p>
                    <h2 style={{ fontSize: '40px', fontWeight: '800', margin: '0 0 15px 0' }}>Savollaringiz bormi?</h2>
                    <p style={{ color: '#8B95A5', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
                        Kurslarimiz haqida batafsil ma'lumot olish uchun quyidagi forma orqali bizga xabar qoldiring.
                    </p>
                </div>
                
                <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <div style={{ background: '#050B14', padding: '40px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
                            <h3 style={{ fontSize: '24px', marginBottom: '30px', marginTop: 0 }}>Kontakt ma'lumotlari</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                                <div style={{ background: 'rgba(0, 180, 216, 0.1)', padding: '15px', borderRadius: '12px', color: '#00B4D8' }}><Phone size={24} /></div>
                                <div>
                                    <p style={{ color: '#8B95A5', fontSize: '14px', margin: '0 0 5px 0' }}>Telefon raqam</p>
                                    <p style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>+998 90 123 45 67</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                                <div style={{ background: 'rgba(0, 180, 216, 0.1)', padding: '15px', borderRadius: '12px', color: '#00B4D8' }}><Mail size={24} /></div>
                                <div>
                                    <p style={{ color: '#8B95A5', fontSize: '14px', margin: '0 0 5px 0' }}>Elektron pochta</p>
                                    <p style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>info@smartedu.uz</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ background: 'rgba(0, 180, 216, 0.1)', padding: '15px', borderRadius: '12px', color: '#00B4D8' }}><MapPin size={24} /></div>
                                <div>
                                    <p style={{ color: '#8B95A5', fontSize: '14px', margin: '0 0 5px 0' }}>Manzil</p>
                                    <p style={{ fontSize: '16px', fontWeight: '600', margin: 0, lineHeight: '1.4' }}>Toshkent shahar, Yunusobod tumani, 4-mavze</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: '1.5', minWidth: '300px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.01)', padding: '40px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                    <div style={{ flex: '1', minWidth: '200px' }}><input type="text" placeholder="Ismingiz" className="contact-input" required /></div>
                                    <div style={{ flex: '1', minWidth: '200px' }}><input type="tel" placeholder="Telefon raqamingiz" className="contact-input" required /></div>
                                </div>
                                <input type="text" placeholder="Mavzu" className="contact-input" />
                                <textarea placeholder="Xabaringizni yozing..." className="contact-input" style={{ minHeight: '150px', resize: 'vertical' }} required></textarea>
                                <button type="submit" className="btn-blue" style={{ width: '100%', justifyContent: 'center', padding: '15px' }}><Send size={18} /> Xabarni yuborish</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LandingPage;