import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';

function NavBar({ loaded = true }) {
    const { user, logout } = useAuth();
    const { darkMode, toggleDarkMode, focusMode, toggleFocusMode } = useUI();
    const navigate = useNavigate();
    const location = useLocation();
    const isWritingPage = location.pathname === '/write';
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        setIsDropdownOpen(false);
        logout();
        navigate('/');
    };

    // Close dropdown component when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 p-6 md:px-12 md:py-8 flex justify-between items-center z-50 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>

            <div className="flex items-center gap-12">
                <Link to="/" className="font-serif italic font-bold text-xl tracking-tight text-ink hover:opacity-80 transition-opacity">
                    Writer.
                </Link>
                <Link to="/read" className="hover:text-ink transition-colors text-sm font-medium tracking-wide">Read</Link>
                <Link to="/choose-type" className="hover:text-ink transition-colors text-sm font-medium tracking-wide">Write</Link>
                {/* Authenticated Links (Desktop) */}
                {user && (
                    <div className="hidden md:flex gap-8 text-sm font-medium text-ink-light tracking-wide">
                        <Link to="/drafts" className="hover:text-ink transition-colors">My Drafts</Link>
                    </div>
                )}
            </div>

            <div className="flex gap-4 md:gap-6 items-center text-sm font-medium text-ink-light tracking-wide">

                {/* Theme Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 text-ink-light"
                    title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {darkMode ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="18.36" x2="5.64" y2="16.93"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    )}
                </button>

                {/* Focus Toggle (Only if logged in and on writing page) */}
                {user && isWritingPage && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFocusMode();
                        }}
                        className={`p-2 rounded-full transition-all duration-300 pointer-events-auto relative z-[60] ${focusMode ? 'bg-ink text-paper shadow-md' : 'hover:bg-black/5 dark:hover:bg-white/5 text-ink-light'}`}
                        title="Focus Mode"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                )}

                <div className="w-[1px] h-4 bg-ink-lighter/20 hidden md:block"></div>

                {!user && <Link to="/about" className="hover:text-ink transition-colors hidden sm:block">About</Link>}

                {user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 group focus:outline-none"
                        >
                            <div className="text-right hidden sm:block">
                                <div className="text-xs text-ink-lighter/70 uppercase tracking-widest font-semibold">Signed in as</div>
                                <div className="text-ink font-serif italic">{user.name}</div>
                            </div>
                            <img
                                src={user.avatarUrl}
                                alt={user.name}
                                className={`w-10 h-10 rounded-full border-2 border-white shadow-soft transition-transform duration-300 ${isDropdownOpen ? 'scale-105 ring-2 ring-ink-light/20' : 'group-hover:scale-105'}`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 top-full mt-3 w-48 bg-paper border border-white/60 shadow-lg rounded-xl overflow-hidden animate-fade-in origin-top-right z-50">
                                <div className="py-1">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-3 text-sm text-ink hover:bg-black/5 transition-colors"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="block px-4 py-3 text-sm text-ink hover:bg-black/5 transition-colors"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Settings
                                    </Link>
                                    <div className="h-[1px] bg-ink-lighter/5 my-1 mx-4"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-3 text-sm text-red-800/80 hover:bg-red-50/50 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="px-5 py-2.5 rounded-full border border-ink-lighter/20 hover:border-ink-lighter/60 text-ink hover:bg-white transition-all duration-300"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
