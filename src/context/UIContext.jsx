import { createContext, useContext, useState, useEffect } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    const [focusMode, setFocusMode] = useState(false);
    const [themeAnimation, setThemeAnimation] = useState(null); // 'sunrise' or 'sunset'

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        const willBeDark = !darkMode;
        setThemeAnimation(willBeDark ? 'sunset' : 'sunrise');

        // Delay the actual class toggle to peak of diagonal wave (approx 1.5s)
        setTimeout(() => {
            setDarkMode(willBeDark);
        }, 1500);

        // Clear animation after it finishes (3s)
        setTimeout(() => {
            setThemeAnimation(null);
        }, 3000);
    };

    const toggleFocusMode = () => setFocusMode(!focusMode);

    return (
        <UIContext.Provider value={{
            darkMode,
            toggleDarkMode,
            focusMode,
            setFocusMode,
            toggleFocusMode,
            themeAnimation
        }}>
            {children}
            {themeAnimation && (
                <div className={`theme-transition-${themeAnimation}`}>
                    <div className="paper-grain"></div>
                </div>
            )}
        </UIContext.Provider>
    );
};

export const useUI = () => useContext(UIContext);
