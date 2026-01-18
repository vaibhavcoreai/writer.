import { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
    const [isAppearing, setIsAppearing] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAppearing(false);
            if (onComplete) {
                setTimeout(onComplete, 1200); // Match slideUp duration
            }
        }, 800);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[10000] bg-ink flex items-center justify-center overflow-hidden
                ${!isAppearing ? 'animate-slide-up' : ''}
            `}
        >
            <div className="paper-grain"></div>
            <div className="relative text-center">
                <div className="font-serif italic text-2xl text-paper/80 tracking-widest animate-reveal opacity-0">
                    Writer.
                </div>
                <div className="mt-4 w-12 h-[1px] bg-paper/10 mx-auto overflow-hidden">
                    <div className="w-full h-full bg-paper/40 -translate-x-full animate-[slideRight_2s_infinite]"></div>
                </div>
            </div>

            <style>{`
                @keyframes slideRight {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
