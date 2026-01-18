import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const writingTypes = [
    {
        id: 'story',
        title: 'Story',
        description: 'Fiction, memoir, or a long-form narrative.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        ),
        path: '/write?type=story'
    },
    {
        id: 'poem',
        title: 'Poem',
        description: 'Verse, rhythm, and the beauty of brevity.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 3.32-3.32a4.42 4.42 0 0 1 6.25 0 4.42 4.42 0 0 1 0 6.25L12 19z"></path><path d="M8.5 15.5 11 18l7-7-2.5-2.5-7 7z"></path><path d="m17.5 4.5.5.5-2 2-.5-.5 2-2z"></path></svg>
        ),
        path: '/write?type=poem'
    },
    {
        id: 'blog',
        title: 'Blog / Article',
        description: 'Thoughts, insights, and structured ideas.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        ),
        path: '/write?type=blog'
    },
    {
        id: 'draft',
        title: 'Draft / Notes',
        description: 'Quick thoughts or an unfinished spark.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5L4.5 5.5c-.3.3-.5.7-.5 1.1V20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6.5L15.5 2z"></path><path d="M15 2v5h5"></path><path d="M9 15h6"></path><path d="M9 11h6"></path></svg>
        ),
        path: '/write?type=draft'
    }
];

const WritingTypePage = () => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const handleSelect = (type) => {
        setSelectedId(type.id);
        // Delay navigation for animation
        setTimeout(() => {
            navigate(type.path);
        }, 600);
    };

    return (
        <div className="min-h-screen bg-paper text-ink selection:bg-ink-light selection:text-paper overflow-hidden relative font-sans">

            {/* Background Texture */}
            <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-0"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            <NavBar loaded={loaded} />

            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">

                <header className={`text-center mb-16 ${loaded ? 'animate-ink stagger-header' : 'opacity-0'}`}>
                    <h2 className="font-serif text-4xl md:text-5xl mb-4 tracking-tight">What are we writing today?</h2>
                    <p className="text-ink-light font-serif italic text-lg">Choose a notebook for your next masterpiece.</p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
                    {writingTypes.map((type, index) => (
                        <button
                            key={type.id}
                            onClick={() => handleSelect(type)}
                            disabled={selectedId !== null}
                            className={`group relative flex flex-col items-start text-left p-8 bg-paper border border-white/40 rounded-2xl shadow-soft transition-all ease-out
                                ${loaded ? 'animate-reveal' : 'opacity-0'}
                                ${selectedId === type.id ? 'scale-110 z-20 shadow-2xl ring-2 ring-ink/5' : 'hover:-translate-y-2 hover:shadow-xl active:scale-95'}
                                ${selectedId !== null && selectedId !== type.id ? 'opacity-40 grayscale-[0.5] scale-95 blur-[1px]' : ''}
                            `}
                            style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                        >
                            {/* Card Content */}
                            <div className="mb-8 text-ink-light group-hover:text-ink transition-colors duration-300">
                                {type.icon}
                            </div>

                            <h3 className="font-serif text-2xl mb-3 text-ink group-hover:tracking-wide transition-all duration-300">
                                {type.title}
                            </h3>

                            <p className="text-sm text-ink-light leading-relaxed font-serif italic">
                                {type.description}
                            </p>

                            {/* Decorative line/book spine detail */}
                            <div className="absolute left-3 top-6 bottom-6 w-[1px] bg-ink-lighter/10 group-hover:bg-ink-lighter/30 transition-colors"></div>
                            <div className="absolute left-4 top-6 bottom-6 w-[2px] bg-ink-lighter/5 group-hover:bg-ink-lighter/10 transition-colors"></div>
                        </button>
                    ))}
                </div>

                <div className={`mt-16 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                        onClick={() => navigate('/drafts')}
                        className="text-xs uppercase tracking-[0.2em] font-bold text-ink-light hover:text-ink transition-colors flex items-center gap-2"
                    >
                        <span>or open a recent draft</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default WritingTypePage;
