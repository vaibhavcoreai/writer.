import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
    const { darkMode, toggleDarkMode, focusMode, toggleFocusMode } = useUI();
    const { user, logout } = useAuth();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const sections = [
        {
            title: 'Appearance',
            items: [
                {
                    label: 'Theme',
                    description: 'Set the mood for your writing day.',
                    action: (
                        <button
                            onClick={toggleDarkMode}
                            className="flex items-center gap-4 px-6 py-2 rounded-full border border-ink-lighter/20 hover:border-ink transition-all group"
                        >
                            <span className="text-xs uppercase tracking-widest font-bold text-ink-light group-hover:text-ink">
                                {darkMode ? 'Sunset' : 'Sunrise'}
                            </span>
                            <div className={`w-4 h-4 rounded-full transition-all duration-700 ${darkMode ? 'bg-indigo-300' : 'bg-amber-300 shadow-[0_0_10px_orange]'}`}></div>
                        </button>
                    )
                },
                {
                    label: 'Typography',
                    description: 'Choose the voice of your interface.',
                    action: <span className="text-xs uppercase tracking-widest font-bold text-ink-lighter italic">Crimson Text</span>
                }
            ]
        },
        {
            title: 'Writing Experience',
            items: [
                {
                    label: 'Focus Mode',
                    description: 'Fade out distractions as you write.',
                    action: (
                        <button
                            onClick={toggleFocusMode}
                            className={`w-12 h-6 rounded-full transition-all flex items-center px-1 
                                ${focusMode ? 'bg-ink' : 'bg-ink-lighter/20'}
                            `}
                        >
                            <div className={`w-4 h-4 rounded-full bg-paper transition-all ${focusMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                    )
                },
                {
                    label: 'Auto-save',
                    description: 'Never lose a single character of your craft.',
                    action: <div className="w-12 h-6 rounded-full bg-ink flex items-center px-1"><div className="w-4 h-4 rounded-full bg-paper translate-x-6"></div></div>
                }
            ]
        },
        {
            title: 'Reading',
            items: [
                {
                    label: 'Deep Recall',
                    description: 'Automatically return to your last-read chapter.',
                    action: <div className="w-12 h-6 rounded-full bg-ink flex items-center px-1"><div className="w-4 h-4 rounded-full bg-paper translate-x-6"></div></div>
                }
            ]
        },
        {
            title: 'Account',
            items: [
                {
                    label: 'Email',
                    description: user?.email || 'guest@writer.paper',
                    action: <button className="text-xs uppercase tracking-widest font-bold text-ink-light hover:text-ink border-b border-ink/10">Edit</button>
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-paper text-ink selection:bg-ink-light selection:text-paper font-sans">
            <NavBar loaded={loaded} />

            <main className="max-w-3xl mx-auto px-6 py-32 md:py-48">

                <header className={`text-center mb-24 ${loaded ? 'animate-ink' : 'opacity-0'}`}>
                    <h1 className="text-5xl font-serif font-bold mb-6 tracking-tight">Settings</h1>
                    <p className="text-ink-light font-serif italic text-xl">Adjust your writing desk to suit your soul.</p>
                </header>

                <div className="space-y-12">
                    {sections.map((section, sIndex) => (
                        <section
                            key={sIndex}
                            className={`space-y-6 ${loaded ? 'animate-reveal' : 'opacity-0'}`}
                            style={{ animationDelay: `${0.8 + sIndex * 0.2}s` }}
                        >
                            <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-ink-lighter ml-4">{section.title}</h2>
                            <div className="bg-paper border border-white/40 rounded-3xl shadow-soft overflow-hidden">
                                {section.items.map((item, iIndex) => (
                                    <div
                                        key={iIndex}
                                        className={`flex items-center justify-between p-8 hover:bg-black/[0.01] transition-colors
                                            ${iIndex !== section.items.length - 1 ? 'border-b border-ink-lighter/5' : ''}
                                        `}
                                    >
                                        <div className="space-y-1">
                                            <h3 className="font-serif font-medium text-lg leading-tight">{item.label}</h3>
                                            <p className="text-sm text-ink-lighter font-serif italic">{item.description}</p>
                                        </div>
                                        <div>{item.action}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <footer className={`mt-32 pt-16 text-center ${loaded ? 'animate-reveal stagger-3' : 'opacity-0'}`}>
                    <button
                        onClick={logout}
                        className="text-xs uppercase tracking-[0.3em] font-bold text-ink-lighter hover:text-red-400 transition-colors"
                    >
                        Sign out
                    </button>
                </footer>
            </main>
        </div>
    );
};

export default SettingsPage;
