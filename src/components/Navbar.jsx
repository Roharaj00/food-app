import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for token in localStorage
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);

        if(location.hash) {
            const element = document.querySelector(location.hash);
            if(element){
                element.scrollIntoView({ behavior:'smooth' });
            }
        }
    }, [location]);

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        // Redirect to home or login page
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/" className="logo">
                    <span className="logo-text">World</span>
                    <span className="logo-accent">Flavors</span>
                </Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/#landing-page" className="nav-link">Home</Link></li>
                <li><Link to="/recipes" className="nav-link">Recipes</Link></li>
                <li><Link to="/#about-section" className="nav-link">About</Link></li>
                
                {/* Conditional rendering based on authentication */}
                {isAuthenticated ? (
                    <>
                        <li><Link to="/liked-recipes" className="nav-link">Liked Recipes</Link></li>
                        <li>
                            <Link onClick={handleLogout} className="nav-link">Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login" className="nav-link">Login</Link></li>
                        <li><Link to="/register" className="nav-link">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;