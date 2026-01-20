import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

const PrivacyPage = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div className="min-h-screen bg-paper text-ink selection:bg-ink-light selection:text-paper font-sans">
            <NavBar loaded={loaded} />

            <main className="max-w-3xl mx-auto px-6 py-32 md:py-48">
                <header className={`text-center mb-16 ${loaded ? 'animate-ink' : 'opacity-0'}`}>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight">Privacy Policy</h1>
                    <p className="text-ink-light font-serif italic text-xl">Transparency is the foundation of trust.</p>
                </header>

                <div className={`space-y-12 font-serif text-lg leading-relaxed text-ink/80 ${loaded ? 'animate-reveal' : 'opacity-0'}`}>
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-ink uppercase tracking-widest font-sans">1. Introduction</h2>
                        <p>
                            At Writer, we value your privacy as much as your words. This policy explains how we collect, use, and protect your information when you use our platform.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-ink uppercase tracking-widest font-sans">2. Data Collection</h2>
                        <p>
                            We collect personal information that you provide directly to us, such as your name, email address, and avatar when you create an account. For writers, we store the content you create, including drafts and published stories.
                        </p>
                        <p>
                            We use Google Analytics 4 (GA4) to understand how our users interact with the platform. This involves cookies and anonymous usage data.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-ink uppercase tracking-widest font-sans">3. How We Use Your Data</h2>
                        <p>
                            Your profile data is used to personalize your experience and showcase your work. Your writing content is stored securely via Firebase and is only made public when you explicitly choose to publish it.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-ink uppercase tracking-widest font-sans">4. Security</h2>
                        <p>
                            We use industry-standard security measures provided by Firebase (Google Cloud) to protect your data. However, no method of transmission over the internet or electronic storage is 100% secure.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-ink uppercase tracking-widest font-sans">5. Third-Party Services</h2>
                        <p>
                            We use Firebase for authentication and database services, and Google Analytics for usage tracking. These services have their own privacy policies.
                        </p>
                    </section>

                    <section className="space-y-4 border-t border-ink/10 pt-12">
                        <p className="text-sm font-sans uppercase tracking-[0.2em] text-ink-lighter text-center">
                            Last Updated: January 2026
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPage;
