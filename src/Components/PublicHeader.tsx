// src/components/PublicHeader.tsx
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useTypedHooks';

export const PublicHeader = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const handleProfileClick = () => {
        if (isAuthenticated) {
            switch (user?.role) {
                case 'admin':
                    navigate('/admin/users');
                    break;
                case 'educator':
                    navigate('/educator/profile');
                    break;
                case 'student':
                    navigate('/student/profile');
                    break;
                default:
                    navigate('/unauthorized');
            }
        } else {
            navigate('/login');
        }
    };

    const navButtons = [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about-us' },
        { label: 'Courses', path: '/courses' },
        { label: 'Testimonials', path: '/testimonials' },
        { label: 'Blogs', path: '/blogs' },
        { label: 'Contact Us', path: '/contact-us' },
    ];

    return (
        <header
            style={{
                background: '#ffffff',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                padding: '0.75rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
            }}
        >
            {/* Left - Company Logo */}
            <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                <img
                    src="/logo.png" // update this path with your actual logo asset
                    alt="Company Logo"
                    style={{ height: '40px', objectFit: 'contain' }}
                />
            </div>


            {/* Center - Navigation Buttons */}
            <nav style={{ display: 'flex', gap: '1.25rem' }}>
                {navButtons.map((btn) => (
                    <button
                        key={btn.path}
                        onClick={() => navigate(btn.path)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            color: '#333',
                            fontWeight: 500,
                            position: 'relative',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.color = '#4f46e5')}
                        onMouseOut={(e) => (e.currentTarget.style.color = '#333')}
                    >
                        {btn.label}
                    </button>
                ))}
            </nav>

            {/* Right - Profile Button */}
            <div>
                <button
                    onClick={handleProfileClick}
                    style={{
                        background: '#4f46e5',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        fontWeight: 500,
                    }}
                >
                    Profile
                </button>
            </div>
        </header>
    );
}