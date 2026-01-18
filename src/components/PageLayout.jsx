import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageLayout = ({ children }) => {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState('idle'); // idle, cover, reveal

    useEffect(() => {
        if (location.pathname !== displayLocation.pathname || location.search !== displayLocation.search) {
            setTransitionStage('cover');
        }
    }, [location, displayLocation]);

    const handleTransitionEnd = () => {
        if (transitionStage === 'cover') {
            // Screen is fully covered. Add a deliberate pause for the "breath".
            setTimeout(() => {
                setDisplayLocation(location);
                setTransitionStage('reveal');
                // Scroll to top when switching pages
                window.scrollTo(0, 0);
            }, 600);
        } else if (transitionStage === 'reveal') {
            setTransitionStage('idle');
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* The sliding panel for page transitions */}
            {transitionStage !== 'idle' && (
                <div
                    className={`page-transition-panel ${transitionStage}`}
                    onAnimationEnd={handleTransitionEnd}
                >
                    <div className="paper-grain"></div>
                </div>
            )}

            {/* 
                We keep the content of the PREVIOUS page visible while the panel is sliding to cover it.
                We only show the NEW page content after the displayLocation has updated and we are in reveal/idle.
            */}
            <div className={`transition-all duration-1000 ${transitionStage === 'cover' ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
                {children}
            </div>
        </div>
    );
};

export default PageLayout;
